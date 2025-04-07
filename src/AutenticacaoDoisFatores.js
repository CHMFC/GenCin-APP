import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from "react-native";

export default function AutenticacaoDoisFatores({ onPag }) {

    const goToLogin = async () => {
        try {
            onPag(0);
        } catch (error){
            console.error(error);
        }
    };

    // useState para criar um estado 'code' que armazena um array com 6 valores vazios (um para cada input)
    const [code, setCode] = useState(["", "", "", "", "", ""]);

    //  useRef para criar uma referência de múltiplos inputs, o que permite o controle do foco nos inputs.
    const inputsRef = useRef([]);

    // Função chamada toda vez que o valor de um input muda (cada digitação)
    const handleChange = (text, index) => {
        // Se o comprimento do texto for menor ou igual a 1, permitindo qualquer caractere (letras, números, etc.)
        if (text.length <= 1) { 
            // Cria uma cópia do array 'code' para evitar mutações diretas no estado
            let newCode = [...code];
            // Atualiza o valor do código no índice específico com o texto digitado
            newCode[index] = text;
            setCode(newCode);

            // Se o input não estiver vazio e o índice não for o último, move o foco para o próximo input
            if (text !== "" && index < 5) {
                inputsRef.current[index + 1]?.focus();
            }
        }
    };

    // Função chamada toda vez que uma tecla é pressionada em um dos inputs
    const handleKeyPress = (e, index) => {
        // Se a tecla pressionada for "Backspace" (apagar)
        if (e.nativeEvent.key === "Backspace" && index > 0 && code[index] === "") {
            // Se o input atual estiver vazio, move o foco para o input anterior
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleRecovery = () => {
        console.log("Codigo de Autenticacao enviado");
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
            
            {/* Container do Esqueceu senha */}  
            <View style={styles.containerTituloSub}>
                <Text style={styles.textTitulo}>Autenticação de Dois Fatores</Text>
                <Text style={styles.textSubTitulo}>
                    Nós enviamos o código de verificação para seu e-mail.
                </Text>
            </View>

            {/* Texto do codigo de verificacao */} 
            <Text style={styles.textCodigo}>Insira o código de verificação</Text>

            {/* Container do Inputs */} 
            <View style={styles.containerIpunt}>
                {code.map((char, index) => (
                <TextInput
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    style={styles.input}
                    value={char}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    maxLength={1} // Cada input aceita apenas um caractere
                    autoCapitalize="characters" // Deixa as letras em maiúsculas automaticamente
                />
                ))}
            </View>

            {/* Botão "Verificar Codigo" */}
            <TouchableOpacity style={styles.containerBotaoVerificar} onPress={handleRecovery}>
                <Text style={styles.textBotaoVerificar}>Verificar Código</Text>
            </TouchableOpacity>
            
            {/* Link/Botão "Retornar ao login" */}
            <TouchableOpacity onPress={goToLogin}>
                <Text style={styles.textRetornarLogin}>Retornar ao login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    
    containerPrincipal: {
        backgroundColor: "#ce1111",
        width: "100%",
        height: "100%", // Garantir que a altura seja 100%
        justifyContent: "center", 
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 40,
    },

    // Estilos da logo
    viewLogo: {
        alignItems: "center",
        marginBottom: 10, // Espaço para separar a logo do conteúdo
    },
    logo: {
        width: 90,
        height: 90,
        resizeMode: "contain",
    },

   // Container do titulo e Subtitulo
    containerTituloSub: {
        gap: 8,
        alignSelf: "stretch",
        marginBottom: 30, //Margem para o texto do codigo de verificacao
    },

    textTitulo: {
        fontSize: 24,
        fontWeight: "700",
        fontFamily: "Roboto",
        textAlign: "center",
        color: "#fff",
        alignSelf: "stretch",
    },

    textSubTitulo: {
        fontFamily: "Roboto",
        fontSize: 16,
        textAlign: "center",
        color: "#fff",
        alignSelf: "stretch",
    },

    //Estido do texto acima dos Inputs
    textCodigo: {
        fontFamily: "Roboto",
        fontSize: 16,
        color: "#fff",
    },

    //Container Inputs
    containerIpunt: {
        flexDirection: "row",
        gap: 12, // Espaçamento entre os inputs
        justifyContent: "center",
        marginTop: 15, //Margem entre o texto e os Inputs
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 4 }, // Deslocamento da sombra
        shadowOpacity: 0.35, // Opacidade da sombra
        shadowRadius: 4, // Raio da sombra
        elevation: 10,
    },

    //Inputs
    input: {
        width: 40,
        height: 50,
        textAlign: "center",
        fontSize: 24,
        borderRadius: 8,
        backgroundColor: "white",
        textTransform: "uppercase", // Exibir sempre em maiúsculas
    },

    // Estilos do botão "Verificar Codigo"
    containerBotaoVerificar: {
        backgroundColor: "rgba(0, 123, 255, 255)",
        alignItems: "center",
        borderRadius: 8,
        paddingVertical: 15,
        marginTop: 15,
        width: 300,
    },

    textBotaoVerificar: {
        color: "rgba(255, 255, 255, 255)",
        fontFamily: "Roboto",
        fontSize: 16,
        fontWeight: "500",
    },

    //Retornar ao login.
    textRetornarLogin: {
        color: "rgba(255, 255, 255, 255)",
        fontSize: 16,
        textDecorationLine: "underline",
        marginTop: 80,
    },

});
