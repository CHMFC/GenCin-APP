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

// Pegando as dimensões da tela
const { width, height } = Dimensions.get('window');


export default function CadastroProfessor() {
    const [passwordVisible, setPasswordVisible] = useState(false);
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
                        <Image source={require('../assets/Logo2.png')} style={styles.image} />
                    </View>
            
                    {/* Container do campo Nome */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome</Text>
                        <TextInput
                            style = {styles.input}
                            placeholder= "nome"
                            placeholderTextColor= "#BCBCBC"
                        />
                    </View>
            
                    {/* Container do campo Email */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style = {styles.input}
                            placeholder= "exemplo@gmail.com"
                            placeholderTextColor= "#BCBCBC"
                            keyboardType="email-address"
                        />
                    </View>
            
                    {/* Container do campo Matricula */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Matrícula</Text>
                        <TextInput
                            style = {styles.input}
                            placeholder= "matrícula"
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
            
                    {/* Container do campo Repetir Senha */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Repetir Senha</Text>
                        <TextInput
                            style = {styles.input}
                            placeholder= "repetir senha"
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
            
                    {/* Container do botão Criar conta */}
                    <View style={styles.buttonCriar}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Criar conta</Text>
                        </TouchableOpacity>
                    </View>
            
                    {/* Container do link Já tenho conta */}
                    <View style={styles.linkContainer}>
                        <TouchableOpacity style={styles.link}>
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
        backgroundColor: '#CE1111', // Cor de fundo da tela
    },
    
    // Estilo do contêiner que exibe a imagem de perfil (ou logo)
    imageContainer: {
        width: width * 0.4,
        aspectRatio: 1.5, // Mantém a proporção da imagem
        marginBottom: height * 0.05, 
        marginTop: height * 0.1,
        alignItems: 'center', 
        justifyContent: 'center', 
        
    },

  // Estilo da imagem, para garantir que se ajuste dentro do contêiner
    image: {
        width: '100%', 
        height: '100%',
        resizeMode: 'contain', // Garante que a imagem será redimensionada sem distorções
    },
    
    // Estilo do rótulo (label) do campos de input  
    label: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '400',
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

    // Estilo do contêiner do botão "Criar Conta"
    buttonCriar: {
        alignSelf: 'stretch',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '3%',
    },

    // Estilo do botão "Criar Conta"
    button: {
        alignSelf: 'stretch',
        height: 43,
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
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});