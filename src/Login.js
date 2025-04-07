import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,  // Importando o ScrollView
    KeyboardAvoidingView,  // Importando o KeyboardAvoidingView
    Platform,  // Para verificar a plataforma
    Keyboard, // Para gerenciar o comportamento do teclado
} from "react-native";
import { login } from "../functions/api";
import Icon from 'react-native-vector-icons/FontAwesome'; // Importando o ícone

export default function LoginScreen({ onLogin, onPag }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errado, setErrado] = useState(0);
    const [isVisible, setIsVisible] = useState(true); // Controle de visibilidade do alerta

    const handleLogin = async () => {
        try {
            const resposta = await login(email, senha);
            onLogin(resposta);
        } catch (error) {
            setErrado(1); // Define estado de erro para exibir alerta
            setIsVisible(true); // Garante que o alerta apareça novamente
        }
    };

    const goToCadastro = async () => {
        try {
            onPag(1);
        } catch (error) {}
    };

    const goToEsqueceuSenha = async () => {
        try {
            onPag(6);
        } catch (error) {}
    };

    const handleClose = () => {
        setErrado(0); // Redefine estado de erro
        setIsVisible(false); // Oculta o alerta
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}  // Adicionando comportamento para diferentes plataformas
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "android" ? -29 : 0}
        >
            <ScrollView contentContainerStyle={styles.container} 
            keyboardShouldPersistTaps="handled"
            >
                {/* Logo */}
                <View style={styles.viewLogo}>
                    <Image
                        source={require("../assets/GenCIn_BigLogo.png")}
                        style={styles.logo}
                    />
                </View>

                {/* Alerta de erro */}
                {errado === 1 && isVisible ? ( // Verifica ambos os estados
                    <View style={styles.alertBox}>
                        <Icon name="exclamation-circle" size={20} color="rgba(206, 17, 17, 255)" style={styles.alertIcon} />
                        <Text style={styles.message}>
                            Usuário ou Senha Incorreto
                        </Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={handleClose}
                        >
                            <Text style={styles.closeText}>×</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}

                {/* Campo do Email */}
                <View style={styles.viewEmail}>
                    <Text style={styles.textEmail}>Email</Text>
                    <TextInput
                        style={styles.inputEmail}
                        placeholder="email@email.com"
                        placeholderTextColor="rgba(169, 169, 169, 255)"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
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
                            value={senha}
                            onChangeText={setSenha}
                        />
                        <TouchableOpacity
                            style={styles.buttonOlhoSenha}
                            onPress={() =>
                                setPasswordVisible(!passwordVisible)
                            }
                        >
                            <Image
                                source={passwordVisible ? require("../assets/SenhaRevelada.png") : require("../assets/SenhaEscondida.png")}
                                style={styles.imageOlhoSenha}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Texto: "Esqueceu a senha?" */}
                <TouchableOpacity
                    style={styles.viewEsqueciSenha}
                    onPress={goToEsqueceuSenha}
                >
                    <Text style={styles.textEsqueciSenha}>
                        Esqueceu a senha?
                    </Text>
                </TouchableOpacity>

                {/* Botão para entrar/login */}
                <TouchableOpacity
                    style={styles.viewBotaoEntrar}
                    onPress={handleLogin}
                >
                    <Text style={styles.textBotaoEntrar}>Entrar</Text>
                </TouchableOpacity>

                {/* Texto: "Ainda não tem conta? Cadastre-se!" */}
                <TouchableOpacity
                    style={styles.viewCadastreSe}
                    onPress={goToCadastro}
                >
                    <Text style={styles.textCadastreSe}>
                        Ainda não tem conta? Cadastre-se!
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,  // Permite que o conteúdo ocupe mais espaço quando o teclado aparece
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: "rgba(206, 17, 17, 255)",
    },

    viewLogo: {
        alignItems: "center",
        marginBottom: 40,
    },

    logo: {
        width: 256,
        height: 128,
        resizeMode: "contain",
    },

    alertBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFDEDE",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: 328,
    },

    closeButton: {
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    closeText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "rgba(206, 17, 17, 255)",
    },

    message: {
        flex: 1,
        color: "rgba(206, 17, 17, 255)",
        fontSize: 14,
    },

    alertIcon: {
        marginRight: 10,
    },

    viewEmail: {
        width: 328,
        marginBottom: 20,
    },

    textEmail: {
        color: "rgba(255, 255, 255, 255)",
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
        tintColor: "rgb(188, 188, 188)",
    },

    viewEsqueciSenha: {
        width: 140,
        marginBottom: 30,
        alignSelf: 'flex-end', // Isso alinha o botão à direita
        marginRight: 11, // Ajuste a margem direita para dar mais espaço
    },

    textEsqueciSenha: {
        color: "rgba(255, 255, 255, 255)",
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
        fontWeight: "600",
    },

    //Ainda não tem conta? Cadastre-se!
    viewCadastreSe: {
        position: "absolute",
        bottom: "4%",
        width: "100%",
        alignItems: "center",
    },
    textCadastreSe: {
        color: "rgba(255, 255, 255, 255)",
        textAlign: "center",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});
