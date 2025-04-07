import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Importe as funções do seu "functions/api.js"
import {
  buscarAula,
  adicionarAulaAgenda
} from '../functions/api';

export default function AdicionarTurmaAluno({ sessaoKey, onLogin }) {
  // Texto digitado no campo de busca
  const [codAula, setCodAula] = useState('');

  // Lista de turmas encontradas após a busca
  const [turmasEncontradas, setTurmasEncontradas] = useState([]);

  // Estado para loading de busca e loading de "adicionar" (por turma)
  const [loadingBuscar, setLoadingBuscar] = useState(false);
  const [loadingAdicionarId, setLoadingAdicionarId] = useState(null);

  // Mensagem de status (erro, sucesso, etc.)
  const [mensagem, setMensagem] = useState('');

  // ========================
  //   Função de PESQUISA
  // ========================
  const handlePesquisarClick = async () => {
    try {
      setMensagem('');
      setTurmasEncontradas([]);
      if (!codAula.trim()) {
        setMensagem('Digite um código de aula para pesquisar.');
        return;
      }

      setLoadingBuscar(true);
      // Usa a função buscarAula(codAula) do seu api.js
      const resultado = await buscarAula(codAula.trim());

      if (Array.isArray(resultado) && resultado.length > 0) {
        setTurmasEncontradas(resultado);
      } else {
        setMensagem('Nenhuma turma encontrada para este código.');
      }
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
      setMensagem('Erro ao buscar turmas: ' + error.message);
    } finally {
      setLoadingBuscar(false);
    }
  };

  // ===========================
  //   Função de ADICIONAR AULA
  // ===========================
  const handleAdicionarTurma = async (aulaId) => {
    setMensagem('');
    if (!sessaoKey) {
      console.warn('SessaoKey não encontrada!');
      if (onLogin) {
        onLogin(0); // Se quiser, manda o usuário de volta ao login
      }
      return;
    }

    try {
      setLoadingAdicionarId(aulaId);
      // Usa a função adicionarAulaAgenda(keySessao, aulaId)
      const respTexto = await adicionarAulaAgenda(sessaoKey, aulaId);
      setMensagem('Turma adicionada com sucesso: ' + respTexto);
    } catch (error) {
      console.error('Erro ao adicionar turma:', error);
      setMensagem('Erro ao adicionar turma: ' + error.message);
    } finally {
      setLoadingAdicionarId(null);
    }
  };

  return (
    <SafeAreaView style={styles.containerSafe}>
      <ScrollView contentContainerStyle={styles.containerScroll}>

        {/* Campo de busca */}
        <View style={styles.pesquiseParent}>
          <TextInput
            style={styles.input}
            placeholder='Pesquise pelo código da turma'
            placeholderTextColor='#545759'
            value={codAula}
            onChangeText={setCodAula}
          />
          <TouchableOpacity onPress={handlePesquisarClick}>
            <Ionicons name='search' style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        {/* Exibir mensagem de status (erro, aviso, etc.) */}
        {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}

        {/* Loading de busca */}
        {loadingBuscar && (
          <ActivityIndicator size='large' color='#0000ff' style={{ marginBottom: 8 }} />
        )}

        <Text style={styles.turmas}>Turmas encontradas:</Text>

        {/* Listagem das turmas retornadas */}
        {turmasEncontradas.map((turma) => (
          <View key={turma.id} style={styles.listasFlexBox}>

            {/* Dados da turma */}
            <View style={styles.containerDescricaoTurma}>
              <Text style={styles.turmasXx}>
                {turma.codAula} - {turma.nomeAula}
              </Text>
              {/* Exibe também o professor, se quiser */}
              <Text style={styles.pesquiseTypo}>
                {turma.nomeProfessor ? `Prof: ${turma.nomeProfessor}` : ''}
              </Text>
            </View>

            {/* Botão de adicionar */}
            <TouchableOpacity
              onPress={() => handleAdicionarTurma(turma.id)}
              style={styles.addButtonContainer}
              disabled={loadingAdicionarId === turma.id}
            >
              {loadingAdicionarId === turma.id ? (
                // Enquanto está adicionando, mostra um spinner ou outro ícone
                <Ionicons name='sync' style={[styles.addIcon, { color: 'blue' }]} />
              ) : (
                <Ionicons name='add-outline' style={styles.addIcon} />
              )}
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
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
    width: '100%',
    marginTop: 70,
    backgroundColor: '#F2F2F2',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
  },
  pesquiseParent: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '100%',
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: 40,
    paddingHorizontal: 10,
    color: '#000',
  },
  searchIcon: {
    fontSize: 18,
    color: '#545759',
    marginLeft: 8,
  },
  mensagem: {
    color: '#545759',
    fontSize: 14,
    marginBottom: 8,
  },
  turmas: {
    fontFamily: 'Roboto-Bold',
    fontWeight: '700',
    fontSize: 16,
    color: '#545759',
    paddingTop: 10,
    paddingBottom: 10,
  },
  listasFlexBox: {
    gap: 8,
    padding: 16,
    borderRadius: 6,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  containerDescricaoTurma: {
    gap: 4,
    justifyContent: 'center',
    flex: 1,
    padding: 4,
    borderRadius: 6,
  },
  turmasXx: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
  pesquiseTypo: {
    fontSize: 12,
    color: '#545759',
  },
  addButtonContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    fontSize: 24,
    transform: [{ scale: 1.2 }],
    color: '#545759',
  },
});
