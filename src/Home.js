import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importando o Ionicons
import { getInfo } from "../functions/api";

export default function Home({sessaoKey, onLogin, onPag}) {

  const [nome,setNome] = useState("");

  const handleChevronClick = () => {
    console.log("Entrar na Atividade!");
  };

  const handleGetInfo = async () => {
    try {
      if (!sessaoKey) {
        console.warn("Nenhuma sessaoKey encontrada!");
        onLogin(0);
      }
      const info = await getInfo(sessaoKey); 
      setNome(info[0])

    } catch (error) {
      console.error("Erro ao obter informações Home:", error);
    }
  };

  useEffect(() => {
    handleGetInfo();
  })

  const handleAgenda = () => {
    onPag(5);
  }

  return (
    <SafeAreaView style={styles.containerSafe}>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        {/* Container Bem-vindo */}
        <View style={styles.containerBemVindo}>
          <View style={styles.containerBemVindoText}>
            <Text style={styles.bemVindoNome}>Bem-vindo(a), {nome}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image 
              source={require("../assets/imagemBemVindo.png")}
              style={styles.imageBemVindo} 
            />
          </View>
        </View>

        <TouchableOpacity onPress={handleAgenda}>
          <View style={styles.containerAgenda}>
            <View style={styles.containerDias}>
              <Text style={styles.textDias}>S</Text>
              <Ionicons name="ellipse" style={[styles.frameChild]} size={40} color="#D9D9D9" />
            </View>
            <View style={styles.containerDias}>
              <Text style={styles.textDias}>T</Text>
              <Ionicons name="ellipse" style={[styles.frameChild]} size={40} color="#D9D9D9" />
            </View>
            <View style={styles.containerDias}>
              <Text style={styles.textDias}>Q</Text>
              <Ionicons name="ellipse" style={[styles.frameChild]} size={40} color="#D9D9D9" />
            </View>
            <View style={styles.containerDias}>
              <Text style={styles.textDias}>Q</Text>
              <Ionicons name="ellipse" style={[styles.frameChild]} size={40} color="#D9D9D9" />
            </View>
            <View style={styles.containerDias}>
              <Text style={styles.textDias}>S</Text>
              <Ionicons name="ellipse" style={[styles.frameChild]} size={40} color="#D9D9D9" />
            </View>
            <View style={styles.containerDias}>
              <Text style={styles.textDias}>S</Text>
              <Ionicons name="ellipse" style={[styles.frameChild]} size={40} color="#D9D9D9" />
            </View>
            <View style={styles.containerDias}>
              <Text style={styles.textDias}>D</Text>
              <Ionicons name="ellipse" style={[styles.frameChild]} size={40} color="#D9D9D9" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Atividades em aberto */}
        <View style={styles.containerAtividadesPrincipal}>
          <Text style={styles.labelAtividadeTitulo}>Atividades em aberto</Text>
          
          <View style={styles.containerAtividades}>
            <TouchableOpacity style={styles.containerDescricaoTurma} onPress={handleChevronClick} >
                <Text style={styles.labelAtividade}>Atividade</Text>
                <Text style={styles.labelDescricaoAtividade}>Breve descrição da atividade</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.chevronButton} onPress={handleChevronClick} >
                <Ionicons name="chevron-forward" size={24} color="#545759" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
    backgroundColor: "#F0F0F0", // Cor de fundo geral
  },

  containerScroll: {
    flexGrow: 1,
    paddingVertical: 10,
  },

  containerBemVindo: {
    backgroundColor: "#FFFFFF",
    width: "92%",
    height: 200,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,  // Remover ou ajustar a margem superior aqui
    marginLeft: 14,
    borderRadius: 16,
    padding: 10, // Ajuste no padding
  },

  containerBemVindoText: {
    width: "50%",
    marginLeft: 10,
  },

  imageContainer: {
    width: 80,
    height: 80,
    marginBottom: 60,
  },

  bemVindoNome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },

  imageBemVindo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },

  containerAgenda:{
    width: "92%",
    height: 73,
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginLeft: 14,
    flexDirection: "row",
    justifyContent: "space-between", // Para distribuir os itens igualmente
  },

  containerDias:{
    width: 40,
    height: 62,
    margin: 5,
    borderRadius: 3,
  },

  textDias:{
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "bold",
  },

  containerAtividadesPrincipal: {
    width: "100%",
    padding: 16,
    marginBottom: 16,
  },

  labelAtividadeTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },

  containerAtividades: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    gap: 8,
  },
  
  containerDescricaoTurma: {
    flex: 1,
    padding: 4,
  },
  
  labelAtividade: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
  
  labelDescricaoAtividade: {
    fontSize: 12,
    color: "#1E90FF",
  },
  
  chevronButton: {
    padding: 4,
  },
});
