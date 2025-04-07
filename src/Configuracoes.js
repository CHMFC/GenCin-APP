import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function Configuracoes() {
    return (

        // Bloco de fundo
        <View style={styles.container}>

            {/* Bloco do perfil */}
            <View style={styles.viewPerfil}>

                {/* Imagem do perfil */}
                <Image
                    style={styles.imagePerfil}
                    source={require("../assets/DefaultUser.jpg")}
                />

                {/* Bloco de informações do perfil */}
                <View style={styles.viewInformacoesPerfil}>
                    <Text style={styles.textPerfil}>
                        nome do usuário
                    </Text>
                    <Text style={styles.textPerfil}>
                        email@email.com
                    </Text>
                    <Text style={styles.textPerfil}>
                        matrícula
                    </Text>
                </View>
            </View>

            {/* Bloco principal */}
            <View style={styles.viewBlocoPrincipal}>

                {/* Botão: Editar perfil */}
                <TouchableOpacity style={styles.buttonOpcoes}>
                    <Feather name="user" size={24} color="rgba(51, 51, 51, 255)" />
                    <Text style={styles.textOpcoes}>
                        Editar perfil
                    </Text>
                </TouchableOpacity>

                {/* Botão: Alterar senha */}
                <TouchableOpacity style={styles.buttonOpcoes}>
                    <Feather name="lock" size={24} color="rgba(51, 51, 51, 255)" />
                    <Text style={styles.textOpcoes}>
                        Alterar senha
                    </Text>
                </TouchableOpacity>

            </View>

            {/* Bloco principal */}
            <View style={styles.viewBlocoPrincipal}>

                {/* Botão: Sobre */}
                <TouchableOpacity style={styles.buttonOpcoes}>
                    <Feather name="info" size={24} color="rgba(51, 51, 51, 255)" />
                    <Text style={styles.textOpcoes}>
                        Sobre
                    </Text>
                </TouchableOpacity>

                {/* Botão: Ajuda */}
                <TouchableOpacity style={styles.buttonOpcoes}>
                    <Feather name="help-circle" size={24} color="rgba(51, 51, 51, 255)" />
                    <Text style={styles.textOpcoes}>
                        Ajuda
                    </Text>
                </TouchableOpacity>

            </View>

            {/* Bloco fixo inferior */}
            <View style={styles.viewBlocoInferior}>

                {/* Botão: Sair da conta */}
                <TouchableOpacity style={styles.buttonSairConta}>
                    <Feather name="log-out" size={20} color="rgba(255, 59, 48, 255)" />
                    <Text style={styles.textSairConta}>
                        Sair da conta
                    </Text>
                </TouchableOpacity>

                {/* Texto informativo: Versão do APP */}
                <Text style={styles.textVersaoAPP}>
                    Versão 1.0
                </Text>

            </View>

        </View>

    );
}

const styles = StyleSheet.create({

// Bloco de fundo
container: {
    backgroundColor: "rgba(244, 244, 244, 255)",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
},

// Bloco do perfil
viewPerfil: {
    backgroundColor: "rgba(255, 255, 255, 255)",
    flexDirection: "row",
    width: "85%",
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 255)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
    marginTop: 20,
    marginBottom: 30,
},

// Imagem do perfil
imagePerfil: {
    backgroundColor: "rgba(206, 17, 17, 255)",
    width: 128,
    height: 128,
    borderRadius: 64,
    resizeMode: "contain",
},

// Informações do perfil
viewInformacoesPerfil: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 25,
    marginTop: 15,
    marginBottom: 15,
},

// Informações do perfil
textPerfil: {
    color: "rgba(51, 51, 51, 255)",
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: 500,
    margin: 5,
},

// Bloco principal
viewBlocoPrincipal: {
    backgroundColor: "rgba(255, 255, 255, 255)",
    width: "85%",
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 255)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
},

// Botões de opções
buttonOpcoes: {
    borderBottomColor: "rgba(224, 224, 224, 255)",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
},
textOpcoes: {
    color: "rgba(51, 51, 51, 255)",
    fontFamily: "Roboto",
    fontSize: 18,
    marginLeft: 8,
},

// Bloco fixo inferior
viewBlocoInferior: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    },

// Botão: Sair da conta
buttonSairConta: {
    backgroundColor: "rgba(255, 255, 255, 255)",
    flexDirection: "row",
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 255)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
},
textSairConta: {
    color: "rgba(255, 59, 48, 255)",
    fontFamily: "Roboto",
    fontSize: 18,
    marginLeft: 8,
},

// Texto informativo: Versão do APP
textVersaoAPP: {
    color: "rgba(119, 119, 119, 255)",
    fontFamily: "Roboto",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
},

});