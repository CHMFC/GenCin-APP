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
import Perfil from './src/Perfil';
import Agenda from './src/Agenda';
import Configuracoes from './src/Configuracoes';

export default function App() {
  const [pagina, setPagina] =  useState(4);
  const [keySessao, setkeySessao] = useState(0);
  const [login, setLogin] = useState(4);

  const handleLogin = (key) => {
    setkeySessao(key);
    setLogin(4);
    setPagina(0);
  }

  const goToLogin = (page) => {
    setLogin(page);
  }

  const goToPage = (page) => {
    setPagina(page);
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        {login === 0 ? (
          <Login onLogin={handleLogin} onPag={goToLogin}></Login>
        ): login === 1 ?(
          <SeletorCadastro onPag={goToLogin}></SeletorCadastro>
        ): login === 2 ? (
          <CadastroAluno onPag={goToLogin}></CadastroAluno>
        ): login === 3 ? (
          <CadastroProfessor onPag={goToLogin}></CadastroProfessor>
        ): (
          <View>
            <View style={styles.barraSuperior}>
              <BarraSuperior></BarraSuperior>
            </View>

            <View style={styles.conteudoCentral}>
              {pagina === 0 ? (
                <Home sessaoKey={keySessao} onLogin={goToLogin} onPag={goToPage}></Home>
              ): pagina === 2 ? (
                <Perfil sessaoKey={keySessao} onLogin={goToLogin} onPag={goToPage}></Perfil>
              ): pagina === 3 ? (
                <Agenda sessaoKey={keySessao} onLogin={goToLogin} onPag={goToPage}></Agenda>
              ): pagina === 4 ? (
                <Configuracoes sessaoKey={keySessao} onLogin={goToLogin} onPag={goToPage}></Configuracoes>
              ): (
                <View></View>
              )}

            </View>

            <View style={styles.barraInferior}>
              <BarraInferior onPag={goToPage}></BarraInferior>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,255)',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(100,100,100,150)',
  },
  barraSuperior: {
    height: '6%'
  },
  conteudoCentral: {
    height: '89%'
  },
  barraInferior: {
    height: '6%'
  }
});