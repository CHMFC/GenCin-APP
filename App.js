import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Login from './src/Login';
import SeletorCadastro from './src/SeletorCadastro';
import CadastroAluno from './src/CadastroAluno';
import CadastroProfessor from './src/CadastroProfessor';
import Home from './src/Home';
import BarraSuperior from './src/BarraSuperior';
import BarraInferior from './src/BarraInferior';
import AdicionarTurmaAluno from './src/AdicionarTurmaAluno';
import Turmas from './src/Turmas';

export default function App() {
  const [pagina, setPagina] =  useState(8);
  const [keySessao, setkeySessao] = useState(0);
  const [login, setLogin] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        {login === 0 ? (
          <Login></Login>
        ): login === 1 ?(
          <SeletorCadastro></SeletorCadastro>
        ): login === 2 ? (
          <CadastroAluno></CadastroAluno>
        ): login === 3 ? (
          <CadastroProfessor></CadastroProfessor>
        ): (
          <View/>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,80,80,255)',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mainContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(100,100,100,150)',
  },
});

/** 
{pagina === 0 ? (
  <Login></Login>
    ):  pagina === 1 ? (
      <SeletorCadastro></SeletorCadastro>
    ): pagina === 2 ? (
      <CadastroAluno></CadastroAluno>
    ):pagina === 3 ? (
      <CadastroProfessor></CadastroProfessor>
    ):(
      <View/>
    )}
*/