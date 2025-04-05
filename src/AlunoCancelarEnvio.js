import React from 'react'; 
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

export default function AlunoCancelarEnvio(){
  const [entregue, setEntregue] = useState(false);

  const handleSair = () => {
    console.log('Saiu da Pagina!');
  };

  const handleInstrucoes = () => {
    console.log('Abriu Instruções');
  };

  const handleSelecionarArquivo = () => {
    console.log("Selecionar arquivo")
  };

  const handleEntregarAtividade = () => {
    console.log("Entegue!")
    setEntregue(!entregue);
    console.log(entregue ? "Envio cancelado!" : "Entregue!");

  };

  return (
    <SafeAreaView style={styles.containerSafe}>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        
      {/* Botão sair + Titulo Pagina + prazo */}         
      <View style={styles.TituloFlexBox}>
      <TouchableOpacity style={styles.chevronButton} onPress={handleSair}>
        <Ionicons name='chevron-back' size={24} color='#545759' />
      </TouchableOpacity>
      
        <Text style={[styles.Titulo, styles.containerTitulo]}>Atividade</Text>
        <Text style={[styles.Prazo, styles.containerTitulo]}>Prazo: xx/xx/xx</Text>
      
      </View>
        
        {/*Descrição atividade*/}
        <View style={styles.DescricaoFlexBox}>
            <Text style={styles.Descricao_Atividade}>Atenção! Essa atividade é para complementar a nota da segunda prova.
                {"\n"}{"\n"}Irei deixar a aberta até xx/xx/xx
            </Text>
        </View>


         {/* Anexo */}
         <View>
            <Text style={[styles.Titulo]}>Anexo</Text>
            <TouchableOpacity style={styles.AnexoFlexBox} onPress={handleInstrucoes}>
                <View style={styles.Pdf}>
                    <Text style={styles.Pdf_texto}>PDF.</Text>
                </View>
            <Text style={styles.Instruções}>Instruções Atividade.pdf</Text>

            </TouchableOpacity>

        </View>
        {/*Selecionar Arquivo*/}
        <View style={styles.buttons}>
          
        {/*Entregar Atividade + Cancelar Envio*/}
          <View style={styles.buttonEntregar}>
                    <TouchableOpacity style={[styles.buttonCancelado]}>
                      <Text style={[styles.buttonTextCancelado]}>Cancelar envio</Text>
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
    backgroundColor: '#F2F2F2',
  },
  containerScroll: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 70,
  },
  Titulo: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    fontWeight: '700',
    color: '#545759',
    paddingTop: 0,
    paddingBottom: 5,
  },
  Prazo:{
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#1E90FF',
    paddingTop: 0,
    paddingBottom: 5,
    paddingLeft: 85,
  },
  Pdf:{
    backgroundColor: "#F2F2F2",
    height: 60,
    width: 50,
    borderRadius: 5,
    alignItems: "center"
  },
  Pdf_texto:{
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    fontWeight: "700",
    color: '#545759',
    paddingTop: 35,
  },
  Instruções: {
    fontFamily: 'Roboto',
    paddingRight: 110,
    fontSize: 16,
    color: "#545759",
  },
  DescricaoFlexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    gap: 8,
    width: "100%",
    height: 115,
  },
  AnexoFlexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    gap: 8,
    width: "100%",
    height: 90,
 },
  TituloFlexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 6,
    gap: 8,
  },
  SelecionarFlexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    gap: 8,
  },
  buttons: {
    paddingTop: 300,
  },
  buttonCancelado: {
    backgroundColor: "white",
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
  },
  buttonTextCancelado: {
    color: "#545759",
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "400",
  },
  buttonEntregar: {
    alignSelf: "stretch",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "3%",
  },
  buttonSelecionarArquivo:{
    alignSelf: "stretch",
    height: 45,
    paddingLeft: "4%",
    paddingRight: "4%",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderStyle: "dashed",
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
  buttonTextSelecionar: {
    color: "#545759",
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "400",
  },
  containerTitulo: {
    flex: 1,
    padding: 4,
  },
  Descricao_Atividade: {
    fontSize: 14,
    color: '#000000',
  },
  chevronButton: {
    padding: 4,
  },
});
