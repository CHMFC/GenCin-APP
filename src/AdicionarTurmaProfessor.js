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

const DIAS_DA_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const HORARIOS_POSSIVEIS = [
    "06:00 - 06:50","07:00 - 07:50","08:00 - 08:50","09:00 - 09:50",
    "10:00 - 10:50","11:00 - 11:50","12:00 - 12:50","13:00 - 13:50",
    "14:00 - 14:50","15:00 - 15:50","16:00 - 16:50","17:00 - 17:50",
    "18:00 - 18:50","18:50 - 19:40","19:40 - 20:30","20:30 - 21:20",
    "21:20 - 22:10","22:10 - 23:00",
];

export default function TelaCriarTurma({ navigation }) {
const [nomeTurma, setNomeTurma] = useState("");
const [descricaoTurma, setDescricaoTurma] = useState("");
const [codigoTurma, setCodigoTurma] = useState("");
const [horarios, setHorarios] = useState({});

const [modalAberto, setModalAberto] = useState(false);
const [diaEscolhido, setDiaEscolhido] = useState(DIAS_DA_SEMANA[0]);
const [horarioEscolhido, setHorarioEscolhido] = useState(HORARIOS_POSSIVEIS[0]);

const podeCriar = nomeTurma && codigoTurma;

function abrirModal() {
    setModalAberto(true);
}
function salvarHorario() {
    setHorarios(prev => {
    const lista = prev[diaEscolhido] || [];
    if (lista.includes(horarioEscolhido)) return prev;
    return { ...prev, [diaEscolhido]: [...lista, horarioEscolhido] };
    });
    setModalAberto(false);
}
function criarTurma() {
    if (!podeCriar) return;
    const dados = { nomeTurma, descricaoTurma, codigoTurma, horarios };
    navigation.navigate("ResumoTurma", { dados });
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
                {lista.map(h => (
                <Text key={h} style={estilos.textoHorario}>• {h}</Text>
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
            <TouchableOpacity style={estilos.modalFundo} activeOpacity={1} onPress={() => setModalAberto(false)}>
            <View style={estilos.modal}>
                <Text style={estilos.modalTitulo}>Novo Horário</Text>
                <View style={estilos.pickerContainer}>
                <Text style={estilos.modalLabel}>Dia da Semana</Text>
                <Picker
                    selectedValue={diaEscolhido}
                    onValueChange={setDiaEscolhido}
                    style={estilos.picker}
                >
                    {DIAS_DA_SEMANA.map(d => (
                    <Picker.Item label={d} value={d} key={d} />
                    ))}
                </Picker>
                </View>
                <View style={estilos.pickerContainer}>
                <Text style={estilos.modalLabel}>Horário</Text>
                <Picker
                    selectedValue={horarioEscolhido}
                    onValueChange={setHorarioEscolhido}
                    style={estilos.picker}
                >
                    {HORARIOS_POSSIVEIS.map(h => (
                    <Picker.Item label={h} value={h} key={h} />
                    ))}
                </Picker>
                </View>
                <TouchableOpacity style={estilos.botaoSalvar} onPress={salvarHorario}>
                <Text style={estilos.textoSalvar}>SALVAR</Text>
                </TouchableOpacity>
            </View>
            </TouchableOpacity>
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
        marginTop: 10
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
        textAlignVertical: "top"
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
    botaoSalvar: {
        backgroundColor: "#007BFF",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
    },
    textoSalvar: { color: "#FFF", fontSize: 16, fontWeight: "700" },
});