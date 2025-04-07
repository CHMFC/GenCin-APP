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
import { cadastroAluno } from "../functions/api";

const { width } = Dimensions.get("window");

export default function CadastroAluno({ onPag }) {
  // Estados para os campos do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Função para voltar à tela de login
  const goToLogin = () => {
    onPag(0);
  };

  // Função para efetuar o cadastro do aluno
  const handleCadastroAluno = async () => {
    // Validação dos campos
    if (!nome || !email || !matricula || !senha || !repetirSenha) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }
    if (senha !== repetirSenha) {
      Alert.alert("Atenção", "As senhas não conferem.");
      return;
    }

    try {
      await cadastroAluno(nome, email, senha, matricula);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      onPag(0);
    } catch (error) {
      Alert.alert(`${error}`, "Não foi possível fazer o cadastro");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#CE1111" }}
    >
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
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
          </View>

          {/* Campo Matrícula */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Matrícula</Text>
            <TextInput
              style={styles.input}
              placeholder="matrícula"
              placeholderTextColor="#BCBCBC"
              onChangeText={setMatricula}
              value={matricula}
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
            <TouchableOpacity style={styles.button} onPress={handleCadastroAluno}>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "4%",
    paddingRight: "4%",
    paddingTop: "6%",
    paddingBottom: "6%",
    backgroundColor: "#CE1111",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  imageContainer: {
    width: width * 0.4,
    aspectRatio: 1.5,
    marginBottom: 5,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "400",
    marginTop: 6,
  },
  inputContainer: {
    alignSelf: "stretch",
    height: 72,
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 8,
  },
  input: {
    flex: 1,
    alignSelf: "stretch",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
    paddingLeft: 6,
    paddingRight: 40,
  },
  buttonOlhoSenha: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
    justifyContent: "center",
    alignItems: "center",
  },
  imageOlhoSenha: {
    width: 24,
    height: 24,
    tintColor: "#BCBCBC",
  },
  buttonCriar: {
    alignSelf: "stretch",
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "3%",
  },
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
    backgroundColor: "#1E90FF",
  },
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
    marginTop: "3%",
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
