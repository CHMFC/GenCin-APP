import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

// Pegando as dimensões da tela
const { width, height } = Dimensions.get('window');

export default function CadastroProfessor({onPag}) {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const goToLogin = async () => {
      try {
          onPag(0)
      } catch (error){
          
      }
  }
    
    return( 
        /* KeyboardAvoidingView para evitar que o teclado cubra o conteúdo */
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            {/* ScrollView para permitir rolagem do conteúdo caso o teclado ou outros elementos ocupem muito espaço */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.formContainer}>
                    {/* Container da imagem */}
                    <View style={styles.imageContainer}>
                        <Image source={require('../assets/IconLogoV.png')} style={styles.image} />
                    </View>
            
                    {/* Container do campo Nome */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome</Text>
                        <TextInput
                          style = {styles.input}
                          placeholder= 'nome'
                          placeholderTextColor= '#BCBCBC'
                        />
                    </View>
            
                    {/* Container do campo Email */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                          style = {styles.input}
                          placeholder= 'exemplo@gmail.com'
                          placeholderTextColor= '#BCBCBC'
                        />
                    </View>
            
                    {/* Container do campo Departamento */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Matrícula</Text>
                        <TextInput
                          style = {styles.input}
                          placeholder= 'matrícula'
                          placeholderTextColor= '#BCBCBC'
                        />
                    </View>
            
                    {/* Container do campo Senha */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            style = {styles.input}
                            placeholder= 'senha'
                            placeholderTextColor= '#BCBCBC'
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
            
                    {/* Container do campo Repetir Senha */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Repetir senha</Text>
                        <TextInput
                            style = {styles.input}
                            placeholder= 'repetir senha'
                            placeholderTextColor= '#BCBCBC'
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
            
                    {/* Container do botão Criar conta */}
                    <View style={styles.buttonCriar}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Criar conta</Text>
                        </TouchableOpacity>
                    </View>
            
                    {/* Container do link Já tenho conta */}
                    <View style={styles.linkContainer}>
                        <TouchableOpacity style={styles.link} onPress={goToLogin}>
                            <Text style={styles.linkText}>Já tenho conta! Quero fazer login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    // Estilos do ScrollView, garantindo que o conteúdo tenha um espaçamento adequado
    scrollContainer: {
      flexGrow: 1, 
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: '4%',
      paddingRight: '4%',
      paddingTop: '6%',
      paddingBottom: '6%',
      backgroundColor: '#CE1111', // Cor de fundo do contêiner principal
    },


    formContainer: {
      width: '100%', 
      alignItems: 'center',
    },
    
    // Estilo do contêiner que exibe a imagem de perfil (ou logo)
    imageContainer: {
      width: width * 0.4,
      aspectRatio: 1.5, // Mantém a proporção da imagem
      marginBottom: 5, 
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },

  // Estilo da imagem, para garantir que se ajuste dentro do contêiner
    image: {
      width: '100%', // A imagem ocupa toda a largura do contêiner
      height: '100%', // A imagem ocupa toda a altura do contêiner
      resizeMode: 'contain', // Garante que a imagem será redimensionada sem distorções
    },
    
    // Estilo do rótulo (label) do campos de input  
    label: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Roboto',
      fontWeight: '400',
      marginTop: 6,
    },

    // Estilo do contêiner que envolve os campos de entrada de texto
    inputContainer: {
      alignSelf: 'stretch',
      height: 72, // Altura proporcional à altura da tela(nao ta em % pq a rolagem ficou estranha)
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: '4%', // Distancia do Label para o Input
    },

    // Estilo do campo de entrada de texto (input)
    input: {
      flex: 1,
      alignSelf: 'stretch',
      height: 50,
      borderRadius: 8,
      backgroundColor: '#F2F2F2', // Cor de fundo do campo de entrada
      paddingLeft: 6,
    },
    
    // Estilo do contêiner do botão "Olho" da senha
    buttonOlhoSenha: {
      position: 'absolute', // Utiliza position absolute para posicionar o botão sobre o campo
      right: 10, // Ajusta a distância do botão à direita
      top: 50, // Alinha verticalmente o botão ao centro
      transform: [{ translateY: -12 }], // Ajuste fino para centralizar verticalmente
      justifyContent: "center",
      alignItems: "center",
    },

    imageOlhoSenha: {
      width: 24,
      height: 24,
      tintColor: '#BCBCBC',
    },

    // Estilo do contêiner do botão "Criar Conta"
    buttonCriar: {
      alignSelf: 'stretch',
      height: 72,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '3%',
    },

    // Estilo do botão "Criar Conta"
    button: {
      alignSelf: 'stretch',
      height: 45,
      paddingLeft: '4%',
      paddingRight: '4%',
      paddingTop: '2%',
      paddingBottom: '2%',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1E90FF', // Cor de fundo para o botão
    },

    // Estilo do texto dentro do botão (Criar Conta)
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontFamily: 'Roboto',
      fontWeight: '400',
    },

    linkContainer: {
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '3%', // Adiciona espaçamento entre o botão e o link
    },

    link: {
      alignSelf: 'stretch',
      paddingLeft: '4%',
      paddingRight: '4%',
      paddingTop: '2%',
      paddingBottom: '2%',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },

    linkText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Roboto-Regular',
      fontWeight: '400',
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
});