import React from 'react'; 
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AdicionarTurmaAluno() {

    const handlePesquisarClick = () => {
        console.log('Pesquisar!');
    };

    const handleEntrarnaTurmaClick = () => {
        console.log('Entrar na Turma!');
    };

    const handlePlusClick = () => {
        console.log('Adicionar nova turma!');
    };

  return (
    <SafeAreaView style={styles.containerSafe}>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <View style={styles.pesquiseParent}>
          <TextInput style={styles.input} placeholder='Pesquise' placeholderTextColor='#545759'/>
          <TouchableOpacity onPress={handlePesquisarClick}>
            <Ionicons name='search' style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.turmas}>Turmas</Text>
        
        <View style={styles.listasFlexBox}>
          <TouchableOpacity 
            style={styles.containerDescricaoTurma} onPress={handleEntrarnaTurmaClick}>
            <Text style={styles.turmasXx}>Turmas XX</Text>
            <Text style={styles.pesquiseTypo}>Breve descrição da turma/área</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePlusClick} style={styles.addButtonContainer} >
            <Ionicons name='add-outline' style={styles.addIcon} />
          </TouchableOpacity>
        </View>
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
  pesquiseTypo: {
    fontSize: 12,
    color: '#545759',
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
  },
  searchIcon: {
    fontSize: 18,
    color: '#545759',
    marginLeft: 8,
  },
  addIcon: {
    fontSize: 24,
    transform: [{ scale: 1.2 }],
    color: '#545759',
  },
  addButtonContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  turmasXx: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
  containerDescricaoTurma: {
    gap: 4,
    justifyContent: 'center',
    flex: 1,
    padding: 4,
    borderRadius: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: 40,
    paddingHorizontal: 10,
  },
});
