import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";

export default function EditarPerfil() {

    return (

        <View style = {styles.container}>

            {/* Foto do Perfil */}
            <View style = {styles.viewImagemUsuario}>
                <Image
                    source = {require("../assets/DefaultUser.jpg")}
                    style = {styles.imageImagemUsuario}
                />
            </View>

            {/* Campo de Informações */}
            <View style = {styles.viewInformacoes}>

                {/* Texto: "Informações" */}
                <Text style = {styles.textInformacoes}>
                    Informações
                </Text>

                {/* Campo Nome */}
                <TextInput
                    style = {styles.inputCampoDigitacao}
                    placeholder = "nome"
                    placeholderTextColor = "rgba(176, 176, 176, 255)"
                />

                {/* Campo Email */}
                <TextInput
                    style = {styles.inputCampoDigitacao}
                    placeholder = "email@email.com"
                    keyboardType = "email-address"
                    placeholderTextColor = "rgba(176, 176, 176, 255)"
                />

                {/* Campo Departamento */}
                <TextInput
                    style = {styles.inputCampoDigitacao}
                    placeholder = "departamento"
                    placeholderTextColor = "rgba(176, 176, 176, 255)"
                />

                {/* Botões */}
                <View style = {styles.viewBotoes}>

                    {/* Botão Cancelar */}
                    <TouchableOpacity style = {styles.buttonCancelar}>
                        <Text style = {styles.textBotaoCancelar}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>

                    {/* Botão Salvar */}
                    <TouchableOpacity style = {styles.buttonSalvar}>
                        <Text style = {styles.textBotaoSalvar}>
                            Salvar
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "rgba(242, 242, 242, 255)",
        flex: 1,
        alignItems: "center",
    },

    viewImagemUsuario: {
        marginTop: 50,
        marginBottom: 50,
    },
    imageImagemUsuario: {
        backgroundColor: "rgba(224, 224, 224, 255)",
        width: 128,
        height: 128,
        borderRadius: 64,
    },

    viewInformacoes: {
        backgroundColor: "rgba(255, 255, 255, 255)",
        width: "90%",
        borderRadius: 10,
        paddingTop: 25,
        paddingBottom: 30,
        paddingHorizontal: 25,
        shadowColor: "rgba(0, 0, 0, 255)",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    textInformacoes: {
        color: "rgba(51, 51, 51, 255)",
        fontSize: 25,
        fontWeight: "700",
        marginBottom: 30,
    },

    inputCampoDigitacao: {
        backgroundColor: "rgba(245, 245, 245, 255)",
        color: "rgba(51, 51, 51, 255)",
        height: 55,
        fontSize: 20,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },

    viewBotoes: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },

    buttonCancelar: {
        backgroundColor: "rgba(224, 224, 224, 255)",
        alignItems: "center",
        justifyContent: "center",
        height: 55,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flex: 1,
        marginRight: 18,
    },
    textBotaoCancelar: {
        color: "rgba(51, 51, 51, 255)",
        fontSize: 18,
        fontWeight: "700",
    },

    buttonSalvar: {
        backgroundColor: "rgba(0, 123, 255, 255)",
        alignItems: "center",
        justifyContent: "center",
        height: 55,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flex: 1,
    },
    textBotaoSalvar: {
        color: "rgba(255, 255, 255, 255)",
        fontSize: 18,
        fontWeight: "700",
    },

});