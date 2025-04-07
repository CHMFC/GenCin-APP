import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getMinhasTurmas } from '../functions/api';

export default function Turmas({ sessaoKey, onLogin, onPag }) {
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);

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
    console.log('Entrou na turma!', turma);
    // Aqui você pode navegar para os detalhes da turma ou outra ação desejada.
    // Exemplo: onPag('detalhesTurma', turma);
  };

  const handleAdicionarTurmaClick = () => {
    console.log('Botão de adicionar turma clicado!');
    // Ação para adicionar nova turma, se aplicável.
  };

  return (
    <SafeAreaView style={styles.containerSafe}>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <Text style={styles.turmas}>Turmas</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#1E90FF" />
        ) : (
          turmas.length > 0 ? (
            turmas.map((turma) => (
              <View key={turma.id} style={styles.listasFlexBox}>
                <TouchableOpacity style={styles.containerDescricaoTurma} onPress={() => handleEntrarNaTurmaClick(turma)}>
                  <Text style={styles.turmasXx}>{turma.codAula}</Text>
                  <Text style={styles.pesquiseTypo}>{turma.nomeAula}</Text>
                  <Text style={styles.pesquiseTypo}>Dias: {turma.diasSemana}</Text>
                  <Text style={styles.pesquiseTypo}>
                    Horário: {turma.horaInicio} - {turma.horaFim}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chevronButton} onPress={() => handleEntrarNaTurmaClick(turma)}>
                  <Ionicons name='chevron-forward' size={24} color='#545759' />
                </TouchableOpacity>
              </View>
            ))
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
