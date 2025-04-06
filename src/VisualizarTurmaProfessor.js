import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

function CartaoAviso({ aviso, aoExcluir, aoAtualizar }) {
    const [editando, setEditando] = useState(false);
    const [titulo, setTitulo] = useState(aviso.title);
    const [conteudo, setConteudo] = useState(aviso.body);
    const podeEnviar = titulo.trim() && conteudo.trim();

    function salvarEdicao() {
        aoAtualizar(aviso.id, titulo.trim(), conteudo.trim());
        setEditando(false);
    }

    return (
        <View style={estilos.cartao}>
            {aviso.edited && <Text style={estilos.rotuloEditado}>
                Editado
            </Text>}

            {editando ? (
                <>
                    <TextInput
                        style={estilos.inputTituloCartao}
                        value={titulo}
                        onChangeText={setTitulo}
                        placeholder="Título"
                        placeholderTextColor="rgba(153, 153, 153, 255)"
                    />
                    <TextInput
                        style={[estilos.inputConteudoCartao, { height: 80 }]}
                        value={conteudo}
                        onChangeText={setConteudo}
                        placeholder="Conteúdo"
                        placeholderTextColor="rgba(153, 153, 153, 255)"
                        multiline
                    />
                </>
            ) : (
                <>
                    <View style={estilos.cabecalhoCartao}>
                        <Text style={estilos.tituloCartao}>
                            {aviso.title}
                        </Text>
                        <Text style={estilos.horarioCartao}>
                            {aviso.time}
                        </Text>
                    </View>
                    <Text style={estilos.corpoCartao}>
                        {aviso.body}
                    </Text>
                </>
            )}

            <View style={estilos.acoesCartao}>
                {editando ? (
                    <TouchableOpacity
                        style={[
                            estilos.botaoEnviarInline,
                            { backgroundColor: podeEnviar ? "rgba(0, 123, 255, 255)" : "rgba(204, 204, 204, 255)" },
                        ]}
                        disabled={!podeEnviar}
                        onPress={salvarEdicao}
                    >
                        <Ionicons name="send" size={20} color="rgba(255, 255, 255, 255)" />
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity
                            style={estilos.botaoAcao}
                            onPress={() => setEditando(true)}
                        >
                            <Feather name="edit-2" size={20} color="rgba(73, 80, 87, 255)" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={estilos.botaoAcao}
                            onPress={() => aoExcluir(aviso.id)}
                        >
                            <Feather name="trash-2" size={20} color="rgba(229, 57, 53, 255)" />
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
}

export default function DetalheTurma({ navigation }) {
    const [expandido, setExpandido] = useState(false);
    const [novoTitulo, setNovoTitulo] = useState("");
    const [novoConteudo, setNovoConteudo] = useState("");
    const [avisos, setAvisos] = useState([]);
    const podeEnviarNovo = novoTitulo.trim() && novoConteudo.trim();

    function enviarNovoAviso() {
        if (!podeEnviarNovo) return;
        const novo = {
            id: String(Date.now()),
            title: novoTitulo.trim(),
            body: novoConteudo.trim(),
            time: "agora",
            edited: false,
        };
        setAvisos([novo, ...avisos]);
        setExpandido(false);
        setNovoTitulo("");
        setNovoConteudo("");
        Keyboard.dismiss();
    }

    function excluirAviso(id) {
        setAvisos((prev) => prev.filter((a) => a.id !== id));
    }

    function atualizarAviso(id, titulo, conteudo) {
        setAvisos((prev) =>
            prev.map((a) =>
                a.id === id ? { ...a, title: titulo, body: conteudo, edited: true } : a
            )
        );
    }

    function recolherNovoAviso() {
        setExpandido(false);
        setNovoTitulo("");
        setNovoConteudo("");
        Keyboard.dismiss();
    }

    return (
        <TouchableWithoutFeedback onPress={recolherNovoAviso}>
            <View style={estilos.container}>
                <View style={estilos.barraTitulo}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="rgba(51, 51, 51, 255)" />
                    </TouchableOpacity>
                    <Text style={estilos.titulo}>
                        Turma XX
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Config")}>
                        <Feather name="settings" size={24} color="rgba(51, 51, 51, 255)" />
                    </TouchableOpacity>
                </View>

                <View style={estilos.areaAviso}>
                    {!expandido ? (
                        <TouchableOpacity
                            style={estilos.botaoPlaceholder}
                            onPress={() => setExpandido(true)}
                        >
                            <Text style={estilos.textoPlaceholder}>
                                Escreva um aviso
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TextInput
                                style={estilos.inputTitulo}
                                placeholder="Título do aviso"
                                placeholderTextColor="rgba(153, 153, 153, 255)"
                                value={novoTitulo}
                                onChangeText={setNovoTitulo}
                            />
                            <TextInput
                                style={[estilos.inputConteudo, { height: 80 }]}
                                placeholder="Conteúdo do aviso"
                                placeholderTextColor="rgba(153, 153, 153, 255)"
                                multiline
                                value={novoConteudo}
                                onChangeText={setNovoConteudo}
                            />
                        </>
                    )}
                    <TouchableOpacity
                        style={[
                            estilos.botaoEnviar,
                            { backgroundColor: podeEnviarNovo ? "rgba(0, 123, 255, 255)" : "rgba(204, 204, 204, 255)" },
                        ]}
                        disabled={!podeEnviarNovo}
                        onPress={enviarNovoAviso}
                    >
                        <Ionicons name="send" size={20} color="rgba(255, 255, 255, 255)" />
                    </TouchableOpacity>
                </View>

                <Text style={estilos.subtitulo}>
                    {avisos.length === 0
                        ? "Nenhuma atualização disponível"
                        : "Últimas atualizações"}
                </Text>

                <FlatList
                    data={avisos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <CartaoAviso
                            aviso={item}
                            aoExcluir={excluirAviso}
                            aoAtualizar={atualizarAviso}
                        />
                    )}
                    contentContainerStyle={estilos.lista}
                />

                <TouchableOpacity
                    style={estilos.fab}
                    onPress={() => navigation.navigate("OutraTela")}
                >
                    <Ionicons name="add" size={28} color="rgba(255, 255, 255, 255)" />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(242, 242, 242, 255)",
        padding: 16
    },
    barraTitulo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        color: "rgba(51, 51, 51, 255)"
    },

    areaAviso: {
        backgroundColor: "rgba(255, 255, 255, 255)",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        elevation: 1,
        position: "relative",
    },
    botaoPlaceholder: {
        paddingVertical: 12
    },
    textoPlaceholder: {
        color: "rgba(153, 153, 153, 255)",
        fontSize: 16
    },

    inputTitulo: {
        fontSize: 16,
        color: "rgba(51, 51, 51, 255)",
        borderBottomWidth: 1,
        borderColor: "rgba(221, 221, 221, 255)",
        marginBottom: 8,
        paddingVertical: 4,
    },
    inputConteudo: {
        fontSize: 16,
        color: "rgba(51, 51, 51, 255)",
        borderWidth: 1,
        borderColor: "rgba(221, 221, 221, 255)",
        borderRadius: 4,
        padding: 8,
        textAlignVertical: "top",
        marginBottom: 8,
    },

    botaoEnviar: {
        position: "absolute",
        right: 12,
        bottom: 12,
        borderRadius: 20,
        padding: 8,
    },

    subtitulo: {
        fontSize: 16,
        fontWeight: "600",
        color: "rgba(73, 80, 87, 255)",
        marginBottom: 8,
    },
    lista: {
        paddingBottom: 80
    },

    cartao: {
        backgroundColor: "rgba(255, 255, 255, 255)",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        elevation: 1,
    },
    rotuloEditado: {
        color: "rgba(229, 57, 53, 255)",
        fontSize: 12,
        marginBottom: 4,
        fontStyle: "italic",
    },
    cabecalhoCartao: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    tituloCartao: {
        fontSize: 16, fontWeight: "700",
        color: "rgba(51, 51, 51, 255)"
    },
    horarioCartao: {
        fontSize: 12,
        color: "rgba(102, 102, 102, 255)"
    },
    corpoCartao: {
        fontSize: 14,
        color: "rgba(68, 68, 68, 255)",
        marginBottom: 8
    },

    acoesCartao: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    botaoAcao: {
        marginLeft: 16
    },

    inputTituloCartao: {
        fontSize: 16,
        color: "rgba(51, 51, 51, 255)",
        borderBottomWidth: 1,
        borderColor: "rgba(221, 221, 221, 255)",
        marginBottom: 8,
        paddingVertical: 4,
    },
    inputConteudoCartao: {
        fontSize: 16,
        color: "rgba(51, 51, 51, 255)",
        borderWidth: 1,
        borderColor: "rgba(221, 221, 221, 255)",
        borderRadius: 4,
        padding: 8,
        textAlignVertical: "top",
        marginBottom: 8,
    },

    botaoEnviarInline: {
        borderRadius: 20,
        padding: 6,
    },

    fab: {
        position: "absolute",
        bottom: 24,
        right: 24,
        backgroundColor: "rgba(0, 123, 255, 255)",
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
    },
});