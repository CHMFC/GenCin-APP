import React from "react"; 
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5, Feather } from "@expo/vector-icons";

export default function ProfVizualizaAtividade() {

    const handleVoltar = () => {
        console.log("Voltou!");
    };

    const handleChevronClick = () => {
        console.log("Entrar na Atividade!"); 
    };

    const handleEditarAtividade = () => {
        console.log("Editar a Atividade!");
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
                <Text style={styles.textTitulo}>Atividade</Text>
            </View>
            <TouchableOpacity style={styles.containerLaterais} onPress={handleEditarAtividade}>
                <View style={styles.botaoEditar} >
                    <FontAwesome5 name="edit" size={20} color="#545759" />
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.containerSubtitulo}>
            <Text style={styles.textPrazoSub}>Prazo: XX/XX/XXXX</Text>
        </View>
        
        
        {/* Scroll */}
        <ScrollView contentContainerStyle={styles.containerScroll}>
            {/* Avisos */}
            <View style={styles.containerDescrição}>
                <Text style={styles.textDescricao}>Atenção! Essa atividade e para complementar a nota da segunda prova. Irei deixar a aberta até xx/xx/xx</Text>
            </View>

            {/* Titulo de Anexos */}
            <Text style={styles.textTituloAnexo}>Anexos</Text>
            {/* Container de Anexos */}
            <TouchableOpacity style={styles.containerAnexos} onPress={handleChevronClick}>
              <View style={styles.containerFile} >
                <Feather name="file" size={44} color="#545759" />
              </View>
              <View style={styles.containerFileText} >
                <Text style={styles.textTituloFile}>Instruções atividade XX</Text>
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
  containerSubtitulo:{
    width: "92%",
    marginLeft: 16,
    alignItems: "center",
  },

  textPrazoSub: {
    fontSize: 12,
    color: "#1E90FF",
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
  containerDescrição: {
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
  },  

  textDescricao:{
    fontSize: 14,
    color: "#545759",

  },

  //Titulo de Anexos
  textTituloAnexo: {
    fontSize: 16,
    width: "92%",
    marginTop: 10,
    marginBottom: 10,
  },

  //Atividades
  containerAnexos: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    gap: 8,
  },

  containerFile: {
    width: "13%",
    height: 55,
    paddingTop: 6,
  },

  containerFileText: {
    width: "84%",
    height: 55,
    padding: 10,
    paddingTop: 16,
  },
  
  textTituloFile: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: "#545759",
  },

});
