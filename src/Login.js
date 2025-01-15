import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

export default function LoginScreen() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    return (
        <View style={styles.container}>
            {/* Logo */}
            <View style = {styles.viewLogo}>
                <Image
                    source = {require('../assets/GenCIn_BigLogo.png')}
                    style = {styles.logo}
                />
            </View>

            {/* Campo do Email */}
            <View style = {styles.viewEmail}>
                <Text style = {styles.textEmail}>
                    Email
                </Text>
                <TextInput
                    style = {styles.inputEmail}
                    placeholder = "email@email.com"
                    placeholderTextColor = "rgba(169, 169, 169, 255)"
                    keyboardType = "email-address"
                />
            </View>

            {/* Campo da Senha */}
            <View style={styles.viewSenha}>
                <Text style={styles.textSenha}>Senha</Text>
                <View style={styles.viewOlhoSenha}>
                    <TextInput
                        style={styles.inputSenha}
                        placeholder="senha"
                        placeholderTextColor="rgba(169, 169, 169, 255)"
                        secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity
                        style={styles.buttonOlhoSenha}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                        <Image
                            source={
                                passwordVisible
                                    ? require("../assets/SenhaRevelada.png")
                                    : require("../assets/SenhaEscondida.png")
                            }
                            style={styles.imageOlhoSenha}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Texto: "Esqueceu a senha?" */}
            <TouchableOpacity style = {styles.viewEsqueciSenha}>
                <Text style = {styles.textEsqueciSenha}>
                    Esqueceu a senha?
                </Text>
            </TouchableOpacity>

            {/* Botão para entrar/login */}
            <TouchableOpacity style = {styles.viewBotaoEntrar}>
                <Text style = {styles.textBotaoEntrar}>
                    Entrar
                </Text>
            </TouchableOpacity>

            {/* Texto: "Ainda não tem conta? Cadastre-se!" */}
            <TouchableOpacity style = {styles.viewCadastreSe}>
                <Text style = {styles.textCadastreSe}>
                    Ainda não tem conta? Cadastre-se!
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: "rgba(206, 17, 17, 255)",
    },

    viewLogo: {
        position: "absolute",
        top: 50,
        width: "100%",
        alignItems: "center",
    },
    logo: {
        width: 256,
        height: 128,
        resizeMode: "contain",
    },

    viewEmail: {
        width: 328,
        marginBottom: 20,
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

    viewSenha: {
        width: 328,
        marginBottom: 20,
    },
    textSenha: {
        color: "rgba(255, 255, 255, 255)",
        fontFamily: "Roboto",
        fontSize: 22,
        fontWeight: "500",
        marginBottom: 5,
    },
    inputSenha: {
        backgroundColor: "rgba(255, 255, 255, 255)",
        color: "rgba(0, 0, 0, 255)",
        flex: 1,
        height: 55,
        fontSize: 20,
    },
    viewOlhoSenha: {
        backgroundColor: "rgba(255, 255, 255, 255)",
        flexDirection: "row",
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    buttonOlhoSenha: {
        width: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    imageOlhoSenha: {
        width: 24,
        height: 24,
        tintColor: "rgba(0, 0, 0, 255)",
    },

    viewEsqueciSenha: {
        width: 328,
        marginBottom: 30,
    },
    textEsqueciSenha: {
        color: "rgba(255, 255, 255, 255)",
        fontFamily: "Roboto",
        fontSize: 16,
        textAlign: "right",
        textDecorationLine: "underline",
    },

    viewBotaoEntrar: {
        backgroundColor: "rgba(0, 123, 255, 255)",
        width: 328,
        alignItems: "center",
        borderRadius: 8,
        paddingVertical: 15,
        marginBottom: 20,
    },
    textBotaoEntrar: {
        color: "rgba(255, 255, 255, 255)",
        fontFamily: "Roboto",
        fontSize: 18,
        fontWeight: "700",
    },

    viewCadastreSe:{
        position: "absolute",
        bottom: 20,
        width: "100%",
        alignItems: "center",
    },
    textCadastreSe: {
        color: "rgba(255, 255, 255, 255)",
        fontFamily: "Roboto",
        textAlign: "center",
        fontSize: 16,
        textDecorationLine: "underline",
    },

});
