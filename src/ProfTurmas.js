import React from "react"; 
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function ProfTurmas() {

  const handleEntrarNaTurmaClick = () => {
    console.log("Entrou na turma!");
  };

  const handleAdicionarTurmaClick = () => {
    console.log("Botão de adicionar turma clicado!");
  };

  const handleEditarTurma = () => {
    console.log("Botão de Editar turma clicado!");
  };

  const handleRemoverTurma = () => {
    console.log("Botão de Remover turma clicado!");
  };

  return (
    <SafeAreaView style={styles.containerSafe}>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <Text style={styles.turmasTitulo}>Turmas</Text>
        
        <View style={styles.containerTurma}>
          <TouchableOpacity style={styles.containerDescricaoTurma} onPress={handleEntrarNaTurmaClick}>
            <Text style={styles.turmasXx}>Turmas XX</Text>
            <Text style={styles.horario}>Horario</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoEditar} onPress={handleEditarTurma}>
            <FontAwesome5 name="edit" size={24} color="#545759" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoExcluir} onPress={handleRemoverTurma}>
            <FontAwesome name="trash-o" size={29} color="#545759" />
          </TouchableOpacity>
        </View>

      </ScrollView>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleAdicionarTurmaClick}>
        <Ionicons name="add" size={36} style={styles.plusIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  containerSafe: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },

  containerScroll: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  turmasTitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#545759",
    marginBottom: 10,
  },

  containerTurma: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    gap: 20,
  },

  containerDescricaoTurma: {
    flex: 1,
    padding: 4,
  },

  turmasXx: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },

  horario: {
    fontSize: 12,
    color: "#545759",
  },

  botaoEditar: {
    padding: 4,
  },

  botaoExcluir: {
    padding: 4,
  },

  buttonContainer: {
    position: "absolute",
    bottom: "5%",
    right: "6%",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E90FF",
    borderRadius: 50,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  plusIcon: {
    color: "#FFFFFF",
  },

});
