import React from "react";
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform 
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Importando o Ionicons

export default function ProfAddAtividade() {

  // Funções para os botões
  const handleCancel = () => {
    console.log("Cancelado!");
  };

  const handleAdd = () => {
    console.log("Adicionado!");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.containerSafe}>
          {/* Container Principal */}
          <View style={styles.containerPrincipal}>
            <View style={styles.containerTitulo}>
              <Text style={styles.textoTitulo}>Adicionar Atividade</Text>
            </View>
            <View style={styles.containerInputTitulo}>
              <Text style={styles.textoSecundario}>Título da Atividade</Text>
              <TextInput
                style={styles.input}
                placeholder="Título da Atividade"
                placeholderTextColor="rgba(169, 169, 169, 255)"
              />
            </View>
            <View style={styles.containerDescrição}>
              <Text style={styles.textoSecundario}>Descrição</Text>
              <TextInput
                style={styles.input}
                placeholder="Descrição"
                placeholderTextColor="rgba(169, 169, 169, 255)"
              />
            </View>
            <View style={styles.containerAddAnexo}>
              <Text style={styles.textoSecundario}>Adicionar Anexo</Text>
              {/* Ícone de Clip para anexar */}
              <TouchableOpacity style={styles.addAnexoButton}>
              <Text style={styles.textoSelecioneArquivo}>Selecione um arquivo</Text>
                <MaterialCommunityIcons name="attachment" size={30} color="#545759" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Container Secundário fixo no fundo */}
        <View style={styles.containerSecundario}>
          {/* Botões */}
          <TouchableOpacity style={styles.botaoCancelar} onPress={handleCancel}>
            <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoAdd} onPress={handleAdd}>
            <Text style={styles.textoBotaoAdd}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
    backgroundColor: "#F2F2F2", // Cor de fundo geral
  },

  containerPrincipal: {
    alignItems: "flex-start",
    padding: 16, // Padding para não ficar colado nas bordas
    flex: 1,
  },

  textoTitulo: {
    fontSize: 20,
    color: "#545759", // Cor do texto principal
    fontWeight: "600",
  },

  textoSecundario: {
    fontSize: 16,
    color: "#545759", // Cor do texto principal
  },

  containerTitulo: {
    height: "5%", // Ajuste para o título
    width: "100%", // Largura do título
    marginTop: 6,
  },

  input: {
    backgroundColor: "rgba(255, 255, 255, 255)",
    color: "rgba(0, 0, 0, 255)",
    height: 55,
    fontSize: 16,
    borderRadius: 8,
    marginTop: 8,
    paddingLeft: 8,
  },

  containerInputTitulo: {
    height: "15%", // Altura para o título da atividade
    width: "100%",
    marginTop: 8,
  },

  containerDescrição: {
    height: "15%", // Altura para a descrição
    width: "100%",
    marginTop: 6,
  },

  containerAddAnexo: {
    height: "15%", // Altura para adicionar anexo
    width: "100%",
    marginTop: 12,
  },

  addAnexoButton: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height: "60%", // Altura para o título da atividade
    flexDirection: "row", // Alinha os botões lado a lado
    borderStyle: "dashed",
    borderWidth: 1.2,
    borderColor: "#545759",
    gap: 8,
  },

  textoSelecioneArquivo:{
    color: "rgba(169, 169, 169, 255)",
    fontSize: 16,
  },

  // Botões
  containerSecundario: {
    height: 80, // Ajuste de altura para os botões
    width: "100%",
    padding: 10,
    position: "absolute", // Fixar no fundo
    bottom: 14, // Coloca no fundo da tela
    flexDirection: "row", // Alinha os botões lado a lado
    gap: 8,
    justifyContent: "space-between", // Espaçamento entre os botões
  },

  botaoCancelar: {
    height: "100%",
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  botaoAdd: {
    height: "100%",
    width: "48%",
    backgroundColor: "#1E90FF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotaoCancelar: {
    fontSize: 16,
    color: "#545759",
  },

  textoBotaoAdd: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});
