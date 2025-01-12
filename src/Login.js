import React, { useState } from "react"
import { 
  ScrollView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  KeyboardAvoidingView, 
  Platform, 
  Image } from 'react-native';

// Pegando as dimensões da tela (largura e altura)
const { width, height } = Dimensions.get('window');

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    /* KeyboardAvoidingView para evitar que o teclado cubra o conteúdo */
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Ajusta o comportamento para iOS e Android
      style={styles.container}
    >
      {/* ScrollView para permitir rolagem do conteúdo caso o teclado ou outros elementos ocupem muito espaço */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Container Principal onde o conteúdo do formulário é exibido */}
        <View style={styles.formContainer}>
          {/* Container da Imagem do perfil */}
          <View style={styles.imageContainer}>
            <Image source={require('../assets/Logo.png')} style={styles.image} />
          </View>

          {/* Container do campo Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style = {styles.input}
              placeholder= "exemplo@gmail.com"
              placeholderTextColor= "#BCBCBC"
            />
          </View>

          {/* Container do campo Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style = {styles.input}
              placeholder= "senha"
              placeholderTextColor= "#BCBCBC"
              secureTextEntry={!passwordVisible}
            />

          <TouchableOpacity
            style = {styles.buttonOlhoSenha}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Image
              source={
                passwordVisible
                  ? require("../assets/SenhaRevelada.png")
                  : require("../assets/SenhaEscondida.png")
              }
              style = {styles.imageOlhoSenha}
            />
          </TouchableOpacity>

          </View>

          {/* Container para o link "Esqueceu senha?" */}
          <View style={styles.esqueceuSenhaContainer}>
            <TouchableOpacity>
              <Text style={styles.textEsqueceu}>Esqueceu senha?</Text>
            </TouchableOpacity>
          </View>

          {/* Botão para login (Entrar) */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>

          {/* Texto com link para "Criar conta" */}
          <View style={styles.linkContainer}>
            <TouchableOpacity>
              <Text style={styles.criarConta}>Ainda não tenho conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Estilos do aplicativo
const styles = StyleSheet.create({
  // Estilo principal do container (envolve toda a tela)
  container: {
    flex: 1,
    backgroundColor: '#CE1111', // Cor de fundo da tela
    alignItems: 'stretch',
  },

  // Estilos do ScrollView, garantindo que o conteúdo tenha um espaçamento adequado
  scrollContainer: {
    flexGrow: 1, // Permite o conteúdo rolar enquanto o conteúdo cresce
    justifyContent: 'center', // Alinha o conteúdo verticalmente ao centro
    alignItems: 'center', // Alinha o conteúdo horizontalmente ao centro
    paddingLeft: '4%', // Adiciona espaçamento nas laterais
    paddingRight: '4%',
    paddingTop: '6%', // Espaçamento superior para dar espaço
    paddingBottom: '6%', // Espaçamento inferior
  },

  // Estilo do container que envolve todo o formulário de login
  formContainer: {
    width: '100%', // Faz com que ocupe toda a largura disponível
    alignItems: 'center', // Alinha todos os itens (inputs, botões, etc) ao centro
  },

  // Estilo do contêiner que exibe a imagem de perfil (ou logo)
  imageContainer: {
    width: width * 0.6, // Ajusta a largura para 60% da tela
    aspectRatio: 1.5, // Mantém a proporção da imagem
    marginBottom: height * 0.05, // Espaço inferior baseado na altura da tela
    marginTop: height * 0.1, // Espaço superior baseado na altura da tela
    alignItems: 'center', // Centraliza a imagem dentro do contêiner
    justifyContent: 'center', // Centraliza a imagem dentro do contêiner
  },

  // Estilo da imagem, para garantir que se ajuste dentro do contêiner
  image: {
    width: '100%', // A imagem ocupa toda a largura do contêiner
    height: '100%', // A imagem ocupa toda a altura do contêiner
    resizeMode: 'contain', // Garante que a imagem será redimensionada sem distorções
  },

  // Estilo do contêiner que envolve os campos de entrada de texto
  inputContainer: {
    height: 72,
    alignSelf: 'stretch', // Faz com que o contêiner tenha a largura total
    justifyContent: 'center',
    alignItems: 'flex-start', // Alinha os itens à esquerda (campo de texto e botão)
    gap: '4%', // Espaçamento entre o rótulo e o campo de entrada
    flexDirection: 'column', // Organiza os itens em coluna (campo de texto + botão)
    position: 'relative', // Necessário para posicionar o botão dentro do contêiner
    marginBottom: '2%',
  },

  // Estilo do rótulo (label) de cada campo de input
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '400',
  },

  // Estilo do campo de entrada de texto (input)
  input: {
    flex: 1, // Faz o campo de senha ocupar o espaço restante
    alignSelf: 'stretch',
    height: '100%',
    paddingLeft: '3%',
    borderRadius: 8,
    backgroundColor: '#F2F2F2', // Cor de fundo do campo de entrada
  },

  // Estilos do botão "Olho" da senha
  buttonOlhoSenha: {
    position: 'absolute',
    right: '5%',
    top: '70%',
    transform: [{ translateY: -12 }], // Ajusta o posicionamento vertical para centralizar melhor o botão
  },

// Estilos da imagem do Olho da Senha
  imageOlhoSenha: {
      width: 24,
      height: 24,
      tintColor: '#BCBCBC', // Cor da Imagem
  },

  // Estilo do link "Esqueceu senha?"
  esqueceuSenhaContainer: {
    alignSelf: 'flex-end', // Alinha o link à direita
    marginTop: 8, // Espaçamento superior baseado na altura da tela
  },
  textEsqueceu: {
    fontFamily: 'Roboto-Regular', // Tipo de fonte
    fontSize: 16, // Tamanho da fonte baseado na largura da tela
    color: '#ffffff', // Cor do texto
  },

  // Estilo do contêiner do botão "Entrar"
  buttonContainer: {
    alignSelf: 'stretch', // Faz o botão ocupar toda a largura disponível
    height: height * 0.12, // Altura proporcional à altura da tela
    justifyContent: 'center', // Alinha o botão no centro
    alignItems: 'center', // Alinha os itens ao centro
  },

 // Estilo do botão "Entrar"
  button: {
    alignSelf: 'stretch', // Faz o botão ocupar toda a largura disponível
    height: 43,
    paddingLeft: '4%', // Espaçamento interno à esquerda
    paddingRight: '4%',
    paddingTop: '2%', // Espaçamento superior baseado na altura
    paddingBottom: '2%', // Espaçamento inferior baseado na altura
    borderRadius: 8, // Bordas arredondadas
    borderWidth: 1, // Largura da borda
    borderColor: 'transparent', // A borda é invisível
    backgroundColor: '#1E90FF', // Cor de fundo do botão
    justifyContent: 'center', // Alinha o conteúdo do botão no centro
    alignItems: 'center', // Alinha o texto dentro do botão
  },

  // Estilo do texto dentro do botão
  buttonText: {
    color: '#ffffff', // Cor do texto
    fontSize: 16, // Tamanho da fonte
    fontWeight: '400', // Peso da fonte
  },

  // Estilo do link "Criar conta"
  criarConta: {
    color: '#ffffff', // Cor do link
    textAlign: 'center', // Alinha o texto ao centro
    fontFamily: 'Roboto-Regular', // Fonte utilizada
    fontSize: 16, // Tamanho da fonte baseado na largura da tela
    textDecorationLine: 'underline',
  },
});

//ok