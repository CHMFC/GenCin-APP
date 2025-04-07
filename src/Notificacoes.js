import React, { useEffect, useState } from 'react'; 
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getMinhasTurmas, buscarAtividadesPorCod } from '../functions/api';

export default function Notificacoes({ sessaoKey, onLogin }) {

  // Armazenamos as atividades a serem exibidas
  const [atividadesNotificacoes, setAtividadesNotificacoes] = useState([]);

  // Função para carregar as atividades de todas as turmas do usuário
  const handleCarregarAtividades = async () => {
    try {
      if (!sessaoKey) {
        console.warn("SessaoKey não encontrada!");
        onLogin(0);
        return;
      }

      // 1) Obtemos as turmas do usuário
      const turmas = await getMinhasTurmas(sessaoKey);

      let todasAtividades = [];

      // 2) Para cada turma, buscamos suas atividades via codAula
      for (let aula of turmas) {
        if (!aula.codAula) continue; // se por acaso estiver vazio

        try {
          const atividades = await buscarAtividadesPorCod(aula.codAula);
          // Supondo que cada atividade tenha { id, nomeAtividade, descricao, ... }
          // Unimos no array principal
          todasAtividades.push(...atividades);
        } catch (error) {
          console.log(`Erro ou não há atividades para ${aula.codAula}`, error);
        }
      }

      // 3) Armazenamos no estado
      setAtividadesNotificacoes(todasAtividades);
    } catch (error) {
      console.error("Erro ao carregar notificações:", error);
    }
  };

  // Ao montar, carregamos as atividades
  useEffect(() => {
    handleCarregarAtividades();
  }, [sessaoKey]);

  const handleEntrarNotificacao = (atividade) => {
    console.log('Entrar na Notificação!', atividade);
    // Se quiser abrir detalhes, chame algo tipo onPag(7) ou algo assim
  };

  return (
    <SafeAreaView style={styles.containerSafe}>
      <Text style={styles.textTitulo}>Notificações</Text>

      <ScrollView contentContainerStyle={styles.containerScroll}>

        {atividadesNotificacoes.length === 0 ? (
          <Text style={{ margin: 16, fontSize: 14, color: '#333' }}>
            Nenhuma atividade no momento.
          </Text>
        ) : (
          atividadesNotificacoes.map((atividade) => (
            <TouchableOpacity 
              key={atividade.id} 
              style={styles.containerNotificacao} 
              onPress={() => handleEntrarNotificacao(atividade)}
            >
              {/* Exemplo: se a Atividade no back tiver 'nomeAtividade', 'descricao', e 'prazo' */}
              <Text style={styles.textAtividade}>
                {atividade.nomeAtividade || "Atividade Sem Nome"}
              </Text>
              <Text style={styles.textPrazo}>
                {atividade.descricao || "Sem descrição"}
              </Text>

              {/* Divider */}
              <View style={styles.lineView} />
            </TouchableOpacity>
          ))
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  containerSafe: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    marginTop: 0,
  },

  textTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#545759',
    marginLeft: 16,
    marginTop: 16,
  },

  containerScroll: {
    width: '100%',
    paddingRight: 16,
    paddingLeft: 16,
  },

  containerNotificacao: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#F2F2F2',
    width: '100%',
    // Ajuste a altura conforme desejar (ou use "minHeight")
    minHeight: 70,
  },

  textAtividade: {
    fontSize: 16,
    fontWeight: '700',
    color: '#312121',
    marginTop: 8,
    marginLeft: 8,
  },

  textPrazo: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1E90FF',
    marginLeft: 8,
  },

  textTempo: {
    fontSize: 12,
    color: '#000000',
    marginBottom: 8,
    marginLeft: 8,
  },

  lineView: {
    alignSelf: "stretch",
    borderStyle: "solid",
    borderColor: "#d3d3d3",
    borderTopWidth: 2,
    width: "100%",
  },
});
