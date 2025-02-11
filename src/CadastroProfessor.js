import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { cadastroProfessor } from "../functions/api";

const { width, height } = Dimensions.get("window");

export default function CadastroProfessor({ onPag }) {
  // Estados para os campos do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Função para redirecionar à tela de login
  const goToLogin = () => {
    onPag(0);
  };

  // Função que realiza o cadastro do professor
  const handleCadastroProfessor = async () => {
    // Validação: verifica se todos os campos foram preenchidos
    if (!nome || !email || !departamento || !senha || !repetirSenha) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    // Validação: verifica se as senhas conferem
    if (senha !== repetirSenha) {
      Alert.alert("Atenção", "As senhas não conferem.");
      return;
    }

    try {
      // Chama a função cadastroProfessor importada da API
      const result = await cadastroProfessor(nome, email, senha, departamento);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      // Após o cadastro, redireciona para a tela de login
      onPag(0);
    } catch (error) {
      console.error("Erro ao cadastrar professor:", error);
      Alert.alert("Erro", "Não foi possível realizar o cadastro. Tente novamente.");
    }
  };

  return (
    // KeyboardAvoidingView para evitar que o teclado cubra o conteúdo
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {/* ScrollView para permitir rolagem do conteúdo caso o teclado ou outros elementos ocupem muito espaço */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          {/* Container da imagem */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/IconLogoV.png")}
              style={styles.image}
            />
          </View>

          {/* Campo Nome */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="nome"
              placeholderTextColor="#BCBCBC"
              onChangeText={setNome}
              value={nome}
            />
          </View>

          {/* Campo Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="exemplo@gmail.com"
              placeholderTextColor="#BCBCBC"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Campo Departamento */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Departamento</Text>
            <TextInput
              style={styles.input}
              placeholder="departamento"
              placeholderTextColor="#BCBCBC"
              onChangeText={setDepartamento}
              value={departamento}
            />
          </View>

          {/* Campo Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="senha"
              placeholderTextColor="#BCBCBC"
              secureTextEntry={!passwordVisible}
              onChangeText={setSenha}
              value={senha}
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

          {/* Campo Repetir Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Repetir senha</Text>
            <TextInput
              style={styles.input}
              placeholder="repetir senha"
              placeholderTextColor="#BCBCBC"
              secureTextEntry={!passwordVisible}
              onChangeText={setRepetirSenha}
              value={repetirSenha}
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

          {/* Botão Criar conta */}
          <View style={styles.buttonCriar}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleCadastroProfessor}
            >
              <Text style={styles.buttonText}>Criar conta</Text>
            </TouchableOpacity>
          </View>

          {/* Link para voltar ao login */}
          <View style={styles.linkContainer}>
            <TouchableOpacity style={styles.link} onPress={goToLogin}>
              <Text style={styles.linkText}>
                Já tenho conta! Quero fazer login
              </Text>
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
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "4%",
    paddingRight: "4%",
    paddingTop: "6%",
    paddingBottom: "6%",
    backgroundColor: "#CE1111", // Cor de fundo do contêiner principal
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  // Estilo do contêiner que exibe a imagem de perfil (ou logo)
  imageContainer: {
    width: width * 0.4,
    aspectRatio: 1.5, // Mantém a proporção da imagem
    marginBottom: 5,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  // Estilo da imagem, para garantir que se ajuste dentro do contêiner
  image: {
    width: "100%", // A imagem ocupa toda a largura do contêiner
    height: "100%", // A imagem ocupa toda a altura do contêiner
    resizeMode: "contain", // Garante que a imagem será redimensionada sem distorções
  },
  // Estilo do rótulo (label) dos campos de input
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "400",
    marginTop: 6,
  },
  // Estilo do contêiner que envolve os campos de entrada de texto
  inputContainer: {
    alignSelf: "stretch",
    height: 72, // Altura fixa para manter a consistência visual
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "4%", // Espaço entre o label e o input
  },
  // Estilo do campo de entrada de texto (input)
  input: {
    flex: 1,
    alignSelf: "stretch",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F2F2F2", // Cor de fundo do campo de entrada
    paddingLeft: 6,
  },
  // Estilo do contêiner do botão "Olho" da senha
  buttonOlhoSenha: {
    position: "absolute", // Utiliza position absolute para posicionar o botão sobre o campo
    right: 10, // Ajusta a distância do botão à direita
    top: 50, // Alinha verticalmente o botão ao centro
    transform: [{ translateY: -12 }], // Ajuste fino para centralizar verticalmente
    justifyContent: "center",
    alignItems: "center",
  },
  imageOlhoSenha: {
    width: 24,
    height: 24,
    tintColor: "#BCBCBC",
  },
  // Estilo do contêiner do botão "Criar Conta"
  buttonCriar: {
    alignSelf: "stretch",
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "3%",
  },
  // Estilo do botão "Criar Conta"
  button: {
    alignSelf: "stretch",
    height: 45,
    paddingLeft: "4%",
    paddingRight: "4%",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E90FF", // Cor de fundo para o botão
  },
  // Estilo do texto dentro do botão (Criar Conta)
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "400",
  },
  linkContainer: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%", // Espaçamento entre o botão e o link
  },
  link: {
    alignSelf: "stretch",
    paddingLeft: "4%",
    paddingRight: "4%",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  linkText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
