import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from "react-native";

export default function EsqueceuSenha({ onPag }) {

    const goToLogin = async () => {
        try {
            onPag(0);
        } catch (error){
            console.error(error);
        }
    };

    const handleRecovery = () => {
        console.log("Link de recuperação enviado");
    };

    return (
        <View style={styles.containerPrincipal}>
            {/* Logo */}
            <View style={styles.viewLogo}>
                <Image
                    source={require("../assets/GenCIn_Logo.png")}
                    style={styles.logo}
                />
            </View>

            <View style={styles.containerSecundario}>
                {/* Container do Esqueceu senha */}  
                <View style={styles.viewEsqueceuSenha}>
                    <Text style={styles.textEsqueceuSenha}>Esqueceu senha?</Text>
                    <Text style={styles.informeSeuEmail}>
                        Informe seu email abaixo que enviaremos um link para recuperar sua senha.
                    </Text>
                </View>

                {/* Container do Email */}    
                <View style={styles.viewEmail}>
                    <Text style={styles.textEmail}>Email</Text>
                    <TextInput
                        style={styles.inputEmail}
                        placeholder="email@email.com"
                        placeholderTextColor="rgba(169, 169, 169, 255)"
                    />
                </View>
                    
                {/* Botão "Enviar link de recuperação" */}
                <TouchableOpacity style={styles.viewBotaoRecuperar} onPress={handleRecovery}>
                    <Text style={styles.textBotaoRecuperar}>Enviar link de recuperação</Text>
                </TouchableOpacity>

                <View style={styles.viewJaTenhoConta}>
                    <TouchableOpacity onPress={goToLogin}>
                        <Text style={styles.textJaTenhoConta}>Já tenho conta! Quero fazer login.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    
    containerPrincipal: {
        backgroundColor: "#ce1111",
        width: "100%",
        height: "100%", // Garantir que a altura seja 100%
        justifyContent: "center", // Centraliza todos os itens na vertical
        alignItems: "center", // Centraliza todos os itens na horizontal
        paddingHorizontal: 16,
        paddingVertical: 40,
    },

    // Estilos da logo
    viewLogo: {
        alignItems: "center",
        marginBottom: 15, // Espaço para separar a logo do conteúdo
    },
    logo: {
        width: 128,
        height: 128,
        resizeMode: "contain",
    },

    containerSecundario: {
        paddingBottom: 24,
        gap: 24,
        alignSelf: "stretch",
    },
    
    // Container do Esqueceu senha
    viewEsqueceuSenha: {
        gap: 8,
        alignSelf: "stretch",
    },

    textEsqueceuSenha: {
        fontSize: 24,
        fontWeight: "700",
        fontFamily: "Roboto",
        textAlign: "center",
        color: "#fff",
        alignSelf: "stretch",
    },

    informeSeuEmail: {
        fontFamily: "Roboto",
        fontSize: 16,
        textAlign: "center",
        color: "#fff",
        alignSelf: "stretch",
    },

    // Container do Email
    viewEmail:{
    },

    textEmail: {
        color: "rgba(255, 255, 255, 255)",
        fontFamily: "Roboto",
        fontSize: 22,
        fontWeight: "500",
        marginBottom: 5,
    },

    inputEmail: {
        backgroundColor: "rgba(255, 255, 255, 255)",
        color: "rgba(0, 0, 0, 255)",
        height: 55,
        fontSize: 20,
        borderRadius: 8,
        paddingHorizontal: 10,
    },

    // Estilos do botão "Enviar link de recuperação"
    viewBotaoRecuperar: {
        backgroundColor: "rgba(0, 123, 255, 255)",
        alignItems: "center",
        borderRadius: 8,
        paddingVertical: 15,
    },

    textBotaoRecuperar: {
        color: "rgba(255, 255, 255, 255)",
        fontFamily: "Roboto",
        fontSize: 18,
        fontWeight: "600",
    },

    //Já tenho conta! Quero fazer login.
    viewJaTenhoConta: {
        top: "50%",
        width: "100%",
        alignItems: "center",
    },
    
    textJaTenhoConta: {
        color: "rgba(255, 255, 255, 255)",
        textAlign: "center",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});
