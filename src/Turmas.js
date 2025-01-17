import React from 'react'; 
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Turmas() {

  const handleEntrarNaTurmaClick = () => {
    console.log('Entrou na turma!');
  };

  const handleAdicionarTurmaClick = () => {
    console.log('Botão de adicionar turma clicado!');
  };

  return (
    <SafeAreaView style={styles.containerSafe}>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <Text style={styles.turmas}>Turmas</Text>
        
        <View style={styles.listasFlexBox}>
          <TouchableOpacity style={styles.containerDescricaoTurma} onPress={handleEntrarNaTurmaClick}>
            <Text style={styles.turmasXx}>Turmas XX</Text>
            <Text style={styles.pesquiseTypo}>Breve descrição da turma/área</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chevronButton} onPress={handleEntrarNaTurmaClick}>
            <Ionicons name='chevron-forward' size={24} color='#545759' />
          </TouchableOpacity>
        </View>
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
