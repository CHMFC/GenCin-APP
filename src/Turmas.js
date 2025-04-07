import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getInfo, getMinhasTurmas } from '../functions/api';

export default function Turmas({ sessaoKey, onLogin, onPag, onTurmas }) {
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nome,setNome] = useState("");
    const [email,setEmail] = useState("");
    const [tipo,setTipo] = useState("");
    const [extra, setExtra] = useState("");

    const handleGetInfo = async () => {
        try {
          if (!sessaoKey) {
            console.warn("Nenhuma sessaoKey encontrada!");
            onLogin(0);
          }
          const info = await getInfo(sessaoKey); 
          setNome(info[0]);
          setEmail(info[1]);
          setTipo(info[2]);
    
        } catch (error) {
          console.error("Erro ao obter informações Home:", error);
        }
      };

    useEffect(() => {
        handleGetInfo();
    })

  const fetchTurmas = async () => {
    try {
      if (!sessaoKey) {
        console.warn("SessaoKey não encontrada!");
        onLogin(0);
        return;
      }
      const data = await getMinhasTurmas(sessaoKey);
      setTurmas(data);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurmas();
  }, [sessaoKey]);

  const handleEntrarNaTurmaClick = (turma) => {
    if(tipo == "professor"){
      onTurmas(turma);
      onPag(9);
    }else{
    }
  };

  const handleAdicionarTurmaClick = () => {
    if(tipo == "professor"){
      onPag(7);
    }else{
      onPag(8);
    }
  };
  

  // Função para extrair e formatar os dias e horários da aula
  function formatarAula(aula) {
    let dias = [];
    let horarios = [];
    
    if (aula.seg) {
      dias.push("Segunda");
      horarios.push(`Segunda: ${aula.horaInicioSeg || "--"} - ${aula.horaFimSeg || "--"}`);
    }
    if (aula.ter) {
      dias.push("Terça");
      horarios.push(`Terça: ${aula.horaInicioTer || "--"} - ${aula.horaFimTer || "--"}`);
    }
    if (aula.qua) {
      dias.push("Quarta");
      horarios.push(`Quarta: ${aula.horaInicioQua || "--"} - ${aula.horaFimQua || "--"}`);
    }
    if (aula.qui) {
      dias.push("Quinta");
      horarios.push(`Quinta: ${aula.horaInicioQui || "--"} - ${aula.horaFimQui || "--"}`);
    }
    if (aula.sex) {
      dias.push("Sexta");
      horarios.push(`Sexta: ${aula.horaInicioSex || "--"} - ${aula.horaFimSex || "--"}`);
    }
    if (aula.sab) {
      dias.push("Sábado");
      horarios.push(`Sábado: ${aula.horaInicioSab || "--"} - ${aula.horaFimSab || "--"}`);
    }
    
    return {
      dias: dias.join(", "),
      horarios: horarios.join(" | ")
    };
  }

  return (
    <SafeAreaView style={styles.containerSafe}>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <Text style={styles.turmas}>Turmas</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#1E90FF" />
        ) : (
          turmas.length > 0 ? (
            turmas.map((turma) => {
              const { dias, horarios } = formatarAula(turma);
              return (
                <View key={turma.id} style={styles.listasFlexBox}>
                  <TouchableOpacity 
                    style={styles.containerDescricaoTurma} 
                    onPress={() => handleEntrarNaTurmaClick(turma.id)}
                  >
                    <Text style={styles.turmasXx}>{turma.codAula}</Text>
                    <Text style={styles.pesquiseTypo}>{turma.nomeAula}</Text>
                    
                    {/* Exibindo o nome do professor */}
                    <Text style={styles.pesquiseTypo}>Professor: {turma.nomeProfessor}</Text>
                    
                    <Text style={styles.pesquiseTypo}>Dias: {dias}</Text>
                    <Text style={styles.pesquiseTypo}>Horário: {horarios}</Text>
                  </TouchableOpacity>
            
                
                </View>
              );
            })
          ) : (
            <Text style={styles.semTurmas}>Nenhuma turma encontrada.</Text>
          )
        )}
      </ScrollView>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleAdicionarTurmaClick}>
        <Ionicons name='add' size={36} style={styles.plusIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  containerScroll: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 70,
  },
  turmas: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    fontWeight: '700',
    color: '#545759',
    paddingTop: 0,
    paddingBottom: 10,
  },
  listasFlexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    gap: 8,
  },
  containerDescricaoTurma: {
    flex: 1,
    padding: 4,
  },
  turmasXx: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  pesquiseTypo: {
    fontSize: 12,
    color: '#545759',
  },
  chevronButton: {
    padding: 4,
  },
  semTurmas: {
    fontSize: 14,
    color: '#545759',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '9%',
    right: '6%',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    borderRadius: 50,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  plusIcon: {
    color: '#FFFFFF',
  },
});
