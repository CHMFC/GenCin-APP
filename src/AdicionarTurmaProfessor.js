import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { criarAula } from "../functions/api"; // Função para criar aula via API

const DIAS_DA_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const HORAS_INICIO = [
  "06:00", "07:00", "08:00", "09:00",
  "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00",
];
const HORAS_FIM = [
  "06:50", "07:50", "08:50", "09:50",
  "10:50", "11:50", "12:50", "13:50",
  "14:50", "15:50", "16:50", "17:50",
  "18:50", "19:50", "20:50", "21:50", "22:50",
];

export default function TelaCriarTurma({ sessaoKey, onLogin, onPag }) {
  const [nomeTurma, setNomeTurma] = useState("");
  const [descricaoTurma, setDescricaoTurma] = useState("");
  const [codigoTurma, setCodigoTurma] = useState("");
  // "horarios" é um objeto que mapeia o dia para uma lista de objetos { horaInicio, horaFim }
  const [horarios, setHorarios] = useState({});

  const [modalAberto, setModalAberto] = useState(false);
  const [diaEscolhido, setDiaEscolhido] = useState(DIAS_DA_SEMANA[0]);
  const [horaInicioEscolhida, setHoraInicioEscolhida] = useState(HORAS_INICIO[0]);
  const [horaFimEscolhida, setHoraFimEscolhida] = useState(HORAS_FIM[0]);

  const podeCriar = nomeTurma && codigoTurma;

  function abrirModal() {
    setModalAberto(true);
  }

  function salvarHorario() {
    // Cria o objeto com hora de início e fim
    const horarioObj = { horaInicio: horaInicioEscolhida, horaFim: horaFimEscolhida };
    setHorarios((prev) => {
      const lista = prev[diaEscolhido] || [];
      // Evita duplicatas
      if (lista.some((h) => h.horaInicio === horaInicioEscolhida && h.horaFim === horaFimEscolhida)) {
        return prev;
      }
      return { ...prev, [diaEscolhido]: [...lista, horarioObj] };
    });
    setModalAberto(false);
  }

  async function criarTurma() {
    if (!podeCriar) return;
  
    // Constrói o objeto 'aula' conforme a estrutura esperada pelo back
    const aula = {
      codAula: codigoTurma,
      nomeAula: nomeTurma,
      // Segunda-feira
      seg: !!horarios["Segunda"],
      horaInicioSeg: horarios["Segunda"] ? horarios["Segunda"][0].horaInicio + ":00" : null,
      horaFimSeg:   horarios["Segunda"] ? horarios["Segunda"][0].horaFim   + ":00" : null,
      // Terça-feira
      ter: !!horarios["Terça"],
      horaInicioTer: horarios["Terça"] ? horarios["Terça"][0].horaInicio + ":00" : null,
      horaFimTer:   horarios["Terça"] ? horarios["Terça"][0].horaFim   + ":00" : null,
      // Quarta-feira
      qua: !!horarios["Quarta"],
      horaInicioQua: horarios["Quarta"] ? horarios["Quarta"][0].horaInicio + ":00" : null,
      horaFimQua:   horarios["Quarta"] ? horarios["Quarta"][0].horaFim   + ":00" : null,
      // Quinta-feira
      qui: !!horarios["Quinta"],
      horaInicioQui: horarios["Quinta"] ? horarios["Quinta"][0].horaInicio + ":00" : null,
      horaFimQui:   horarios["Quinta"] ? horarios["Quinta"][0].horaFim   + ":00" : null,
      // Sexta-feira
      sex: !!horarios["Sexta"],
      horaInicioSex: horarios["Sexta"] ? horarios["Sexta"][0].horaInicio + ":00" : null,
      horaFimSex:   horarios["Sexta"] ? horarios["Sexta"][0].horaFim   + ":00" : null,
      // Sábado
      sab: !!horarios["Sábado"],
      horaInicioSab: horarios["Sábado"] ? horarios["Sábado"][0].horaInicio + ":00" : null,
      horaFimSab:   horarios["Sábado"] ? horarios["Sábado"][0].horaFim   + ":00" : null,
    };
  
    try {
      // Envia uma única requisição com o objeto 'aula' consolidado
      const result = await criarAula(sessaoKey, aula);
      onPag(1);
    } catch (error) {
      
    }
  }
  

  

  return (
    <View style={estilos.container}>
      <Text style={estilos.label}>Nome da Turma</Text>
      <TextInput
        style={estilos.input}
        value={nomeTurma}
        onChangeText={setNomeTurma}
        placeholder="Ex: Turma A"
      />

      <Text style={estilos.label}>Descrição</Text>
      <TextInput
        style={[estilos.input, estilos.textoMultilinha]}
        value={descricaoTurma}
        onChangeText={setDescricaoTurma}
        placeholder="Breve descrição"
        multiline
      />

      <Text style={estilos.label}>Código de Identificação</Text>
      <TextInput
        style={estilos.input}
        value={codigoTurma}
        onChangeText={setCodigoTurma}
        placeholder="Ex: T-2025_2"
      />

      <Text style={[estilos.label, { marginTop: 24 }]}>Horários</Text>
      <TouchableOpacity style={estilos.botaoAdicionar} onPress={abrirModal}>
        <Ionicons name="add-circle-outline" size={20} color="#007BFF" />
        <Text style={estilos.textoBotaoAdicionar}>Adicionar horário</Text>
      </TouchableOpacity>

      <FlatList
        data={Object.entries(horarios)}
        keyExtractor={([dia]) => dia}
        renderItem={({ item: [dia, lista] }) => (
          <View style={estilos.blocoDia}>
            <Text style={estilos.subtituloDia}>{dia}</Text>
            {lista.map((h, index) => (
              <Text key={index} style={estilos.textoHorario}>
                • {h.horaInicio} - {h.horaFim}
              </Text>
            ))}
          </View>
        )}
        style={{ marginBottom: 80 }}
      />

      <TouchableOpacity
        style={[
          estilos.botaoCriarTurma,
          { backgroundColor: podeCriar ? "#007BFF" : "#CCC" },
        ]}
        disabled={!podeCriar}
        onPress={criarTurma}
      >
        <Text style={estilos.textoCriarTurma}>CRIAR TURMA</Text>
      </TouchableOpacity>

      <Modal visible={modalAberto} transparent animationType="fade">
        <View style={estilos.modalFundo}>
          <View style={estilos.modal}>
            <Text style={estilos.modalTitulo}>Novo Horário</Text>
            <View style={estilos.pickerContainer}>
              <Text style={estilos.modalLabel}>Dia da Semana</Text>
              <Picker
                selectedValue={diaEscolhido}
                onValueChange={setDiaEscolhido}
                style={estilos.picker}
              >
                {DIAS_DA_SEMANA.map((d) => (
                  <Picker.Item label={d} value={d} key={d} />
                ))}
              </Picker>
            </View>
            <View style={estilos.pickerContainer}>
              <Text style={estilos.modalLabel}>Hora de Início</Text>
              <Picker
                selectedValue={horaInicioEscolhida}
                onValueChange={setHoraInicioEscolhida}
                style={estilos.picker}
              >
                {HORAS_INICIO.map((h) => (
                  <Picker.Item label={h} value={h} key={h} />
                ))}
              </Picker>
            </View>
            <View style={estilos.pickerContainer}>
              <Text style={estilos.modalLabel}>Hora de Fim</Text>
              <Picker
                selectedValue={horaFimEscolhida}
                onValueChange={setHoraFimEscolhida}
                style={estilos.picker}
              >
                {HORAS_FIM.map((h) => (
                  <Picker.Item label={h} value={h} key={h} />
                ))}
              </Picker>
            </View>
            <View style={estilos.modalBotoes}>
              <TouchableOpacity style={estilos.botaoSalvar} onPress={salvarHorario}>
                <Text style={estilos.textoSalvar}>SALVAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.botaoCancelar} onPress={() => setModalAberto(false)}>
                <Text style={estilos.textoCancelar}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F9FF",
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 3,
    fontSize: 16,
    elevation: 2,
    height: 50,
  },
  textoMultilinha: {
    height: 80,
    textAlignVertical: "top",
  },
  botaoAdicionar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  textoBotaoAdicionar: {
    color: "#007BFF",
    fontSize: 16,
    marginLeft: 6,
  },
  blocoDia: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    elevation: 2,
  },
  subtituloDia: { fontSize: 16, fontWeight: "700", color: "#333" },
  textoHorario: { fontSize: 14, color: "#444", marginTop: 4 },
  botaoCriarTurma: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
  },
  textoCriarTurma: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    alignContent: "center",
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    elevation: 4,
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 18,
    color: "#333",
    textAlign: "center",
  },
  pickerContainer: {
    marginBottom: 5,
    alignItems: "center",
  },
  modalLabel: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  picker: {
    width: "100%",
  },
  modalBotoes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  botaoSalvar: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  textoSalvar: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  botaoCancelar: {
    backgroundColor: "#CCC",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  textoCancelar: { color: "#333", fontSize: 16, fontWeight: "700" },
});
