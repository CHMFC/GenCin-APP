import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from "react-native";

export default function SeletorCadastro() {

    return (
        <View style={styles.container}>

            {/* Logo */}
            <View style={styles.viewLogo}>
                <Image
                    source={require('../assets/GenCIn_Logo.png')}
                    style={styles.logo}
                />
            </View>

            {/* Texto: "Bem-vindo(a) ao GenCin!" */}
            <View style={styles.viewBemVindo}>
                <Text style={styles.textBemVindo}>
                    Bem-vindo(a) ao GenCin!
                </Text>
            </View>

            {/* Texto: "Quem é você no CIn?" */}
            <View style={styles.viewQuemSou}>
                <Text style={styles.textQuemSou}>
                    Quem é você no CIn?
                </Text>
            </View>

            {/* Botão para "Eu sou aluno" */}
            <TouchableOpacity style={styles.botao}>
                <Image
                    source={require('../assets/EuSouAluno.png')}
                    style={styles.imagemBotao}
                />
                <Text style={styles.textBotao}>
                    Eu sou aluno
                </Text>
            </TouchableOpacity>

            {/* Botão para "Eu sou professor" */}
            <TouchableOpacity style={styles.botao}>
                <Image
                    source={require('../assets/EuSouProfessor.png')}
                    style={styles.imagemBotao}
                />
                <Text style={styles.textBotao}>
                    Eu sou professor
                </Text>
            </TouchableOpacity>

            {/*Texto: "Já possui uma conta?"*/}
            <TouchableOpacity style={styles.viewJaTenhoConta}>
                <Text style={styles.textJaTenhoConta}>
                    Já possui uma conta?
                </Text>
            </TouchableOpacity>

        </View>
    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: "rgba(206, 17, 17, 255)",
    },

    viewLogo: {
        position: "absolute",
        top: 50,
    },
    logo: {
        width: 128,
        height: 128,
        resizeMode: "contain",
    },

    viewBemVindo: {
        marginBottom: 10,
    },
    textBemVindo: {
        color: "rgba(255, 255, 255, 255)",
        fontFamily: "Roboto",
        textAlign: "center",
        fontSize: 26,
        fontWeight: "700",
    },

    viewQuemSou: {
        marginBottom: 20,
    },
    textQuemSou: {
        color: "rgba(255, 255, 255, 255)",
        fontFamily: "Roboto",
        textAlign: "center",
        fontSize: 24,
        fontWeight: "500",
    },

    botao: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 255)",
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        width: 328,
    },
    imagemBotao: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    textBotao: {
        color: "rgba(0, 0, 0, 255)",
        fontFamily: "Roboto",
        fontSize: 18,
        fontWeight: "600",
    },

    viewJaTenhoConta: {
        position: "absolute",
        bottom: 20,
    },
    textJaTenhoConta: {
        color: "rgba(255, 255, 255, 255)",
        fontFamily: "Roboto",
        fontSize: 16,
        textDecorationLine: "underline",
    },

});