import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from "react-native";

export default function TelaPerfil({ navigation, route }) {

    // Sem vínculo com banco de dados, o estado inicial é vazio
    const usuario = route?.params?.usuario || {
        nome: "",
        email: "",
        matricula: "",
        turmas: [],
    };

    const turmasHoje = usuario.turmas.filter(t => (t.aulasHoje || []).length > 0);

    return (
        <SafeAreaView style={estilos.container}>

            {/* Bloco do perfil */}
            <View style={estilos.blocoPerfil}>

                {/* Imagem do perfil */}
                <Image
                    style={estilos.imagemPerfil}
                    source={require("../assets/DefaultUser.jpg")}
                />

                {/* Bloco de informações */}
                <View style={estilos.blocoInformacoes}>
                    <Text style={estilos.textoPerfil}>
                        {usuario.nome || "nome do usuário"}
                    </Text>
                    <Text style={estilos.textoPerfil}>
                        {usuario.email || "email@email.com"}
                    </Text>
                    <Text style={estilos.textoPerfil}>
                        {usuario.matricula || "12345678900"}
                    </Text>
                </View>
            </View>

            {/* Bloco de Turmas */}
            <View style={estilos.blocoCurto}>
                <Text style={estilos.textoBloco}>Turmas</Text>
                <Text style={estilos.textoBloco}>{usuario.turmas.length}</Text>
            </View>

            {/* Bloco de Aulas Hoje */}
            <View style={estilos.blocoAulas}>
                <Text style={estilos.tituloBloco}>Aulas Hoje</Text>
                {turmasHoje.length === 0 ? (
                    <Text style={estilos.semAulas}>Você não possui aulas hoje</Text>
                ) : (
                    <FlatList
                        data={turmasHoje}
                        keyExtractor={t => t.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={estilos.cartaoAula}
                                onPress={() =>
                                    navigation.navigate("DetalheAula", { turma: item })
                                }
                            >
                                <Text style={estilos.nomeTurma}>{item.nome}</Text>
                                <Text style={estilos.horario}>
                                    {(item.aulasHoje || []).join(", ")}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>

            {/* Bloco inferior fixo */}
            <View style={estilos.blocoFixoInferior}>

                <TouchableOpacity style={estilos.botaoEditarPerfil}>
                    <Text style={estilos.textoBotaoEditar}>
                        Editar Perfil
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={estilos.blocoSairConta}>
                    <Text style={estilos.textoSairConta}>
                        Sair da conta
                    </Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    container: {
        backgroundColor: "rgba(244, 244, 244, 1)",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },

    blocoPerfil: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        flexDirection: "row",
        width: "85%",
        borderRadius: 8,
        shadowColor: "rgba(0, 0, 0, 1)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        padding: 10,
        marginTop: 45,
        marginBottom: 25,
    },

    imagemPerfil: {
        backgroundColor: "rgba(206, 17, 17, 1)",
        width: 128,
        height: 128,
        borderRadius: 64,
        resizeMode: "contain",
    },

    blocoInformacoes: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        marginLeft: 25,
        marginTop: 15,
        marginBottom: 15,
    },

    textoPerfil: {
        color: "rgba(51, 51, 51, 1)",
        fontFamily: "Roboto",
        fontSize: 18,
        fontWeight: "500",
        margin: 5,
    },

    blocoCurto: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "85%",
        backgroundColor: "rgba(255, 255, 255, 1)",
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
        elevation: 1,
    },

    textoBloco: {
        fontSize: 18,
        fontWeight: "600",
        color: "rgba(51, 51, 51, 1)",
    },

    blocoAulas: {
        width: "85%",
        marginTop: 35,
        flex: 1,
    },

    tituloBloco: {
        fontSize: 18,
        fontWeight: "700",
        color: "rgba(51, 51, 51, 1)",
        marginBottom: 8,
    },

    semAulas: {
        fontSize: 16,
        color: "rgba(102, 102, 102, 1)",
        textAlign: "center",
        marginTop: 35,
    },

    cartaoAula: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 1,
    },

    nomeTurma: {
        fontSize: 16,
        fontWeight: "700",
        color: "rgba(51, 51, 51, 1)",
    },

    horario: {
        fontSize: 14,
        color: "rgba(85, 85, 85, 1)",
        marginTop: 4,
    },

    blocoFixoInferior: {
        backgroundColor: "rgba(242, 242, 242, 1)",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        paddingVertical: 15,
    },

    botaoEditarPerfil: {
        backgroundColor: "rgba(0, 123, 255, 1)",
        width: 328,
        alignItems: "center",
        borderRadius: 8,
        paddingVertical: 15,
        marginBottom: 20,
    },

    textoBotaoEditar: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Roboto",
        fontSize: 18,
        fontWeight: "700",
    },

    blocoSairConta: {
        alignItems: "center",
    },

    textoSairConta: {
        color: "rgba(84, 87, 89, 1)",
        fontFamily: "Roboto",
        textAlign: "center",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});