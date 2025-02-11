import * as React from 'react'; 
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function BarraInferior({onPag}) {
  const handleHomePress = () => {
    onPag(0);
  };

  const handleTurmasPress = () => {
    console.log('Turmas Clicado!');
  };

  const handlePerfilPress = () => {
    onPag(2);
  };

  const handleConfiguracoesPress = () => {
    console.log('Configurações Clicado!');
  };

  return (
    <SafeAreaView style={styles.containerSafe}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconeEstilo} onPress={handleHomePress}>
          <Ionicons name='home-outline' size={24} color='#545759' />
          <Text style={styles.estiloTexto}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconeEstilo} onPress={handleTurmasPress}>
          <Ionicons name='book-outline' size={24} color='#545759' />
          <Text style={styles.estiloTexto}>Turmas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconeEstilo} onPress={handlePerfilPress}>
          <FontAwesome name='user-o' size={24} color='#545759' />
          <Text style={styles.estiloTexto}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconeEstilo} onPress={handleConfiguracoesPress}>
          <Ionicons name='settings-outline' size={24} color='#545759' />
          <Text style={styles.estiloTexto}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },

  iconeEstilo: {
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },

  estiloTexto: {
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    color: '#545759',
  },
});
