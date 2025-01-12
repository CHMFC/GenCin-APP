import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";

export default function CadastroAluno() {

    const [passwordVisible, setPasswordVisible] = useState(false);

    return (

        <View style = {styles.container}>
            <ScrollView contentContainerStyle = {styles.scrollAreaDeslizante}>

                {/* Logo */}
                <View style = {styles.viewLogo}>
                    <Image
                        source={require("../assets/icon.png")}
                        style = {styles.logo}
                    />
                </View>

                {/* Campo do Nome */}
                <View style = {styles.viewTitulo}>
                    <Text style = {styles.textTitulo}>
                        Nome
                    </Text>
                    <TextInput
                        style = {styles.inputCampoDigitacao}
                        placeholder="nome"
                        placeholderTextColor="rgba(169, 169, 169, 255)"
                    />
                </View>

                {/* Campo do Email */}
                <View style = {styles.viewTitulo}>
                    <Text style = {styles.textTitulo}>
                        Email
                    </Text>
                    <TextInput
                        style = {styles.inputCampoDigitacao}
                        placeholder="email@email.com"
                        placeholderTextColor="rgba(169, 169, 169, 255)"
                        keyboardType="email-address"
                    />
                </View>

                {/* Campo da Matrícula */}
                <View style = {styles.viewTitulo}>
                    <Text style = {styles.textTitulo}>
                        Matrícula
                    </Text>
                    <TextInput
                        style = {styles.inputCampoDigitacao}
                        placeholder="matrícula"
                        placeholderTextColor="rgba(169, 169, 169, 255)"
                    />
                </View>

                {/* Campo da Senha */}
                <View style = {styles.viewTitulo}>
                    <Text style = {styles.textTitulo}>
                        Senha
                    </Text>
                    <View style = {styles.viewSenha}>
                        <TextInput
                            style = {styles.inputSenha}
                            placeholder="senha"
                            placeholderTextColor="rgba(169, 169, 169, 255)"
                            secureTextEntry={!passwordVisible}
                        />
                        <TouchableOpacity
                            style = {styles.buttonOlhoSenha}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            <Image
                                source={
                                    passwordVisible
                                        ? require("../assets/icon.png")
                                        : require("../assets/icon.png")
                                }
                                style = {styles.imageOlhoSenha}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Campo de Repetir Senha */}
                <View style = {styles.viewTitulo}>
                    <Text style = {styles.textTitulo}>
                        Repetir senha
                    </Text>
                    <View style = {styles.viewSenha}>
                        <TextInput
                            style = {styles.inputSenha}
                            placeholder="repetir senha"
                            placeholderTextColor="rgba(169, 169, 169, 255)"
                            secureTextEntry={!passwordVisible}
                        />
                        <TouchableOpacity
                            style = {styles.buttonOlhoSenha}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            <Image
                                source={
                                    passwordVisible
                                        ? require("../assets/icon.png")
                                        : require("../assets/icon.png")
                                }
                                style = {styles.imageOlhoSenha}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style = {{ height: 100 }} />
            </ScrollView>

            {/* Bloco fixo que fica embaixo */}
            <View style = {styles.viewBlocoFixoInferior}>

                {/* Botão de Cadastrar */}
                <TouchableOpacity style = {styles.viewBotaoCadastrar}>
                    <Text style = {styles.textBotaoCadastrar}>
                        Cadastrar
                    </Text>
                </TouchableOpacity>

                {/* Texto: "Já possui uma conta?" */}
                <TouchableOpacity style = {styles.viewJaTenhoConta}>
                    <Text style = {styles.textJaTenhoConta}>
                        Já possui uma conta?
                    </Text>
                </TouchableOpacity>

            </View>
        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "rgba(206, 17, 17, 255)",
    },

    scrollAreaDeslizante: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        alignItems: "center",
    },

    viewLogo: {
        marginTop: 50,
        marginBottom: 50,
        width: "100%",
        alignItems: "center",
    },
    logo: {
        width: 256,
        height: 128,
        resizeMode: "contain",
    },

    viewTitulo: {
        width: 328,
        marginBottom: 20,
    },
    textTitulo: {
        color: "rgba(255, 255, 255, 255)",
        fontFamily: "Roboto",
        fontSize: 22,
        fontWeight: "500",
        marginBottom: 5,
    },
    inputCampoDigitacao: {
        backgroundColor: "rgba(255, 255, 255, 255)",
        color: "rgba(0, 0, 0, 255)",
        height: 55,
        fontSize: 20,
        borderRadius: 8,
        paddingHorizontal: 10,
    },

    viewSenha: {
        backgroundColor: "rgba(255, 255, 255, 255)",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    inputSenha: {
        flex: 1,
        height: 55,
        fontSize: 20,
        color: "rgba(0, 0, 0, 255)",
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

    viewBlocoFixoInferior: {
        backgroundColor: "rgba(206, 17, 17, 255)",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        paddingVertical: 10,
    },

    viewBotaoCadastrar: {
        backgroundColor: "rgba(0, 123, 255, 255)",
        width: 328,
        alignItems: "center",
        borderRadius: 8,
        paddingVertical: 15,
        marginBottom: 10,
    },
    textBotaoCadastrar: {
        color: "rgba(255, 255, 255, 255)",
        fontFamily: "Roboto",
        fontSize: 18,
        fontWeight: "700",
    },

    viewJaTenhoConta: {
        alignItems: "center",
    },
    textJaTenhoConta: {
        color: "rgba(255, 255, 255, 255)",
        fontFamily: "Roboto",
        textAlign: "center",
        fontSize: 16,
        textDecorationLine: "underline",
    },

});