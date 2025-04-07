import React from 'react'; 
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
//import { Ionicons } from '@expo/vector-icons';

export default function Notificacoes() {

    const handleEntrarNotificacao = () => {
        console.log('Entrar nas Notificações!');
    };

  return (
    <SafeAreaView style={styles.containerSafe}>

      <Text style={styles.textTitulo}>Notificações</Text>

      <ScrollView contentContainerStyle={styles.containerScroll}>
          <TouchableOpacity style={styles.containerNotificacao} onPress={handleEntrarNotificacao}>
            <Text style={styles.textAtividade}>Atividade XX</Text>
            <Text style={styles.textPrazo}>Prazo de entrega xx/xx/xx</Text>
            <Text style={styles.textTempo}>há 47 minutos</Text>
          </TouchableOpacity>
          <View style={styles.lineView} />
          <TouchableOpacity style={styles.containerNotificacao} onPress={handleEntrarNotificacao}> 
            <Text style={styles.textAtividade}>Atividade XX</Text>
            <Text style={styles.textPrazo}>Prazo de entrega xx/xx/xx</Text>
            <Text style={styles.textTempo}>há 47 minutos</Text>
          </TouchableOpacity>
          
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
    height: "100%",
    backgroundColor: '#F2F2F2',
    paddingRight: 16,
    paddingLeft: 16,
  },

  containerNotificacao: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'left',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#F2F2F2',
    width: '100%',
    height: "11%",
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
