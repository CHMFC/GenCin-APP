import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { getInfo, editarDadosUsuario } from "../functions/api";

export default function EditarPerfil({ sessaoKey, onLogin, onPag }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [extra, setExtra] = useState(""); 
  const [tipo, setTipo] = useState("");

  const handleGetInfo = async () => {
    try {
      if (!sessaoKey) {
        console.warn("Nenhuma sessaoKey encontrada!");
        onLogin(0);
        return;
      }
      const info = await getInfo(sessaoKey);
      setNome(info[0]);
      setEmail(info[1]);
      setTipo(info[2]);
      setExtra(info[3]);
    } catch (error) {
      console.error("Erro ao obter informações do perfil:", error);
    }
  };

  useEffect(() => {
    handleGetInfo();
  }, []);

  const handlePerfil = () => {
    onPag(0);
  };

  const handleSalvar = async () => {
    if (!nome || !email || !senha || !extra) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }
    try {
      await editarDadosUsuario(tipo, nome, email, senha, extra);
      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      onPag(0);
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Foto do Perfil */}
        <View style={styles.viewImagemUsuario}>
          <Image
            source={require("../assets/DefaultUser.jpg")}
            style={styles.imageImagemUsuario}
          />
        </View>

        {/* Campo de Informações */}
        <View style={styles.viewInformacoes}>
          <Text style={styles.textInformacoes}>Informações</Text>

          {/* Campo Nome */}
          <TextInput
            style={styles.inputCampoDigitacao}
            value={nome}
            onChangeText={setNome}
            placeholder="Nome"
            placeholderTextColor="rgba(176, 176, 176, 255)"
          />

          {/* Campo Email (bloqueado para edição) */}
          <TextInput
            style={[styles.inputCampoDigitacao, styles.inputBloqueado]}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="rgba(176, 176, 176, 255)"
            editable={false}
          />

          {/* Campo Senha */}
          <TextInput
            style={styles.inputCampoDigitacao}
            value={senha}
            onChangeText={setSenha}
            placeholder="Nova Senha"
            secureTextEntry={true}
            placeholderTextColor="rgba(176, 176, 176, 255)"
          />

          {/* Campo para Matrícula ou Departamento */}
          <TextInput
            style={styles.inputCampoDigitacao}
            value={extra}
            onChangeText={setExtra}
            placeholder={
              tipo.toLowerCase() === "aluno" ? "Matrícula" : "Departamento"
            }
            placeholderTextColor="rgba(176, 176, 176, 255)"
          />

          {/* Botões */}
          <View style={styles.viewBotoes}>
            {/* Botão Cancelar */}
            <TouchableOpacity
              onPress={handlePerfil}
              style={styles.buttonCancelar}
            >
              <Text style={styles.textBotaoCancelar}>Cancelar</Text>
            </TouchableOpacity>

            {/* Botão Salvar */}
            <TouchableOpacity onPress={handleSalvar} style={styles.buttonSalvar}>
              <Text style={styles.textBotaoSalvar}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(242, 242, 242, 255)",
    flex: 1,
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 20,
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
  inputBloqueado: {
    backgroundColor: "rgba(224, 224, 224, 255)",
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
