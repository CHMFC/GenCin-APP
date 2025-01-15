
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// Pegando as dimensões da tela
const { width, height } = Dimensions.get('window');

export default function CadastroProfessor(){

    return( 
    
        <View style={styles.formContainer}>
            {/* Container da imagem */}
            <View style={styles.imageContainer}>
                <View style={styles.image} />
            </View>
    
            {/* Container do campo Nome */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome</Text>
                <TextInput style={styles.input} />
            </View>
    
            {/* Container do campo Email */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} />
            </View>
    
            {/* Container do campo Departamento */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Departamento</Text>
                <TextInput style={styles.input} />
            </View>
    
            {/* Container do campo Senha */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input} secureTextEntry />
            </View>
    
            {/* Container do campo Repetir Senha */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Repetir senha</Text>
                <TextInput style={styles.input} secureTextEntry />
            </View>
    
            {/* Container do botão Criar conta */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Criar conta</Text>
                </TouchableOpacity>
            </View>
    
            {/* Container do link Já tenho conta */}
            <View style={styles.linkContainer}>
                <TouchableOpacity style={styles.link}>
                    <Text style={styles.linkText}>Já tenho conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}
    
const styles = StyleSheet.create({
    formContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '4%',
        paddingRight: '4%',
        paddingTop: '6%',
        paddingBottom: '6%',
        backgroundColor: '#F0F0F0', // Cor de fundo do contêiner principal
      },
      imageContainer: {
        width: width * 0.25,
        height: width * 0.25,
        backgroundColor: '#D9D9D9',
        borderRadius: 9999,
        marginBottom: '4%',
      },
      inputContainer: {
        alignSelf: 'stretch',
        height: height * 0.08,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '4%', // Distancia do Label para o Input
        borderRadius: 8,
        padding: '0%', 
        marginBottom: '4%', // Espaçamento entre os contairs
      },
      label: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '400',
      },
      input: {
        alignSelf: 'stretch',
        height: height * 0.05,
        paddingLeft: '3%',
        paddingRight: '3%',
        paddingTop: '2%',
        paddingBottom: '2%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#FFFFFF', // Fundo branco para o campo de input
      },
      buttonContainer: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
      },
      button: {
        alignSelf: 'stretch',
        height: height * 0.05,
        paddingLeft: '4%',
        paddingRight: '4%',
        paddingTop: '2%',
        paddingBottom: '2%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50', // Cor de fundo para o botão
      },
      buttonText: {
        color: 'white',
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
        color: '#0a0a0a',
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '400',
        textAlign: 'center',
      },
});