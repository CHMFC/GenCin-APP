import React from "react"; 
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AlunoVizualizaTurma() {

    const handleVoltar = () => {
        console.log("Voltou!");
    };

    const handleChevronClick = () => {
        console.log("Entrar na Atividade!"); 
    };

  return (
    <SafeAreaView style={styles.containerSafe}>

        {/* Titulo e botoes laterais */}
        <View style={styles.containerTitulo}>
            <TouchableOpacity style={styles.containerLaterais} onPress={handleVoltar}>
                <View style={styles.chevronButton} >
                    <Ionicons name="chevron-back" size={24} color="#545759" />
                </View>
            </TouchableOpacity>
            <View style={styles.containerCentral}>
                <Text style={styles.textTitulo}>Turma XX</Text>
            </View>
            <View style={styles.containerLaterais} >
            </View>
        </View>
        
        {/* Subtitulo */}
        <Text style={styles.textAtualizacoes}>Ultimas atualizações</Text>
        
        {/* Scroll */}
        <ScrollView contentContainerStyle={styles.containerScroll}>
            {/* Avisos */}
            <View style={styles.containerAvisos}>
                {/* Container para alinhar o titulo e o tempo */}
                <View style={styles.containerLinha}>
                    <View style={styles.containerTituloAviso}>
                        <Text style={styles.textAviso}>GenCin APP</Text>
                    </View>
                    <View style={styles.containerTempo}>
                        <Text style={styles.textTempo}>47 minutos</Text>
                    </View>
                </View>
                <View style={styles.containerNovo}>
                    <Text style={styles.textDescricao}>GenAPP é um aplicativo desenvolvido em React Native para fornecer uma interface amigável para alunos e professores, permitindo a gestão de salas, aulas e usuários. Este aplicativo é responsável por interagir com a GenCin-API para realizar todas as operações necessárias.</Text>
                </View>
            </View>

            {/* Atividades */}
            <TouchableOpacity style={styles.containerAtividades} onPress={handleChevronClick}>
                <View style={styles.containerDescricaoTurma}  >
                    <Text style={styles.textTituloAtividade}>Atividade</Text>
                    <Text style={styles.textPrazo}>Prazo: XX/XX/XXXX</Text>
                </View>
                <View style={styles.chevronButton} >
                    <Ionicons name="chevron-forward" size={24} color="#545759" />
                </View>
            </TouchableOpacity>
        </ScrollView>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  containerSafe: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    marginTop: 0,
  },

  // Titulo e botoes laterais
  containerTitulo:{
    width: "92%",
    height: "4%",
    marginLeft: 16,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  containerLaterais:{
    width: "10%",
    height: "100%",
    alignItems: "center",
  },

  chevronButton: {
    padding: 3,
  },

  containerCentral:{
    width: "80%",
    height: "100%",
    alignItems: "center",
  },

  textTitulo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#545759",
    paddingTop: 2,
  },

  botaoEditar: {
    paddingTop: 5,
  },

  //Subtitulo
  textAtualizacoes: {
    fontSize: 16,
    color: "#545759",
    marginLeft: 16,
    width: "92%",
    marginTop: 14,
    marginBottom: 4,
  },

  //Scroll
  containerScroll: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F2F2F2",
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 6,
  },

  //Avisos
  containerAvisos: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
  },

  //Container para alinhar o titulo e o tempo
  containerLinha: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between", // Espaçamento entre os dois
    borderRadius: 6,
  },

  containerTituloAviso:{
    width: "75%",
    paddingTop: 6,
    borderRadius: 6,
    paddingLeft: 6,
  },

  textAviso:{
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
  },

  containerTempo:{
    width: "25%",
    borderRadius: 6,
    paddingTop: 6,
    paddingRight: 6,
    alignItems: "flex-end",
  },

  textTempo: {
    fontSize: 12,
    color: "#545759",
    marginBottom: 8,
    marginLeft: 8,
  },

  containerNovo: {
    width: "100%",
    paddingTop: 6,
    paddingBottom: 4,
    paddingRight: 6,
    paddingLeft: 6,
    borderRadius: 6,
  },  

  textDescricao:{
    fontSize: 14,
    color: "#545759",

  },

  //Atividades
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
  
  textTituloAtividade: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
  
  textPrazo: {
    fontSize: 12,
    color: "#1E90FF",
  },
  
  chevronButton: {
    padding: 4,
  },

});
