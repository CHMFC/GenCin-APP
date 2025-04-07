import React, { useState, useEffect } from "react";
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
import { buscarInfoAula, criarAtividade } from "../functions/api"; // Aqui importamos a função de API

// Componente que representa um cartão de atividade individual
function CartaoAtividade({ atividade, aoExcluir, aoAtualizar }) {
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(atividade.title);
  const [conteudo, setConteudo] = useState(atividade.body);

  const podeEnviar = titulo.trim() && conteudo.trim();

  function salvarEdicao() {
    aoAtualizar(atividade.id, titulo.trim(), conteudo.trim());
    setEditando(false);
  }

  return (
    <View style={estilos.cartao}>
      {atividade.edited && (
        <Text style={estilos.rotuloEditado}>
          Editado
        </Text>
      )}

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
            <Text style={estilos.tituloCartao}>{atividade.title}</Text>
            <Text style={estilos.horarioCartao}>{atividade.time}</Text>
          </View>
          <Text style={estilos.corpoCartao}>{atividade.body}</Text>
        </>
      )}

      <View style={estilos.acoesCartao}>
        {editando ? (
          <TouchableOpacity
            style={[
              estilos.botaoEnviarInline,
              {
                backgroundColor: podeEnviar
                  ? "rgba(0, 123, 255, 255)"
                  : "rgba(204, 204, 204, 255)",
              },
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
              onPress={() => aoExcluir(atividade.id)}
            >
              <Feather name="trash-2" size={20} color="rgba(229, 57, 53, 255)" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

// Componente principal “VisualizaTurma”
export default function VisualizaTurma({ sessaoKey, onLogin, onPag, onTurma }) {
    const [expandido, setExpandido] = useState(false);
    const [novoTitulo, setNovoTitulo] = useState("");
    const [novoConteudo, setNovoConteudo] = useState("");
  
    const [atividades, setAtividades] = useState([]);
  
    // Nome da turma, buscado do backend
    const [nomeTurma, setNomeTurma] = useState("...");
    const [codTurma, setCodTurma] = useState("");
  
    const podeEnviarNovo = novoTitulo.trim() && novoConteudo.trim();
  
    // useEffect para carregar info da aula
    useEffect(() => {
      async function carregarInfo() {
        try {
          const aulaDTO = await buscarInfoAula(onTurma);
          setNomeTurma(aulaDTO.nomeAula);
          setCodTurma(aulaDTO.codAula);
        } catch (error) {
          console.error("Erro ao buscar info da aula:", error);
        }
      }
      if (onTurma) {
        carregarInfo();
      }
    }, [onTurma]);
  
    // Cria nova atividade no backend
    async function enviarNovaAtividade() {
      if (!podeEnviarNovo) return;
  
      try {
        // Montamos o objeto conforme o backend espera.
        // Exemplo: seu Atividade.java pode ter codAula, nomeAtividade, descricao
        // Se for "title" e "body", então faça:
        const payload = {
          // Se no seu Atividade.java há "codAula", inclua:
          codAula: codTurma, 
          // Se for ID da aula, troque o nome do campo ou crie um no back
          nomeAtividade: novoTitulo.trim(),
          descricao: novoConteudo.trim()
        };
  
        // Chamamos a função de API
        const resposta = await criarAtividade(payload);
  
        // 'resposta' é a atividade criada que o backend retorna
        // Vamos adicionar no array local
        setAtividades([{
          id: resposta.id, // se o back retorna 'id'
          title: resposta.nomeAtividade,  // mapeamos para 'title'
          body: resposta.descricao,       // mapeamos para 'body'
          time: "agora",                  // ou outro
          edited: false
        }, ...atividades]);
  
        // Limpa os campos e recolhe
        setExpandido(false);
        setNovoTitulo("");
        setNovoConteudo("");
        Keyboard.dismiss();
      } catch (error) {
        console.error("Erro ao criar atividade no backend:", error);
      }
    }
  
    // Exclui atividade localmente (você pode também excluir no backend)
    function excluirAtividade(id) {
      setAtividades((prev) => prev.filter((a) => a.id !== id));
    }
  
    // Atualiza (edita) atividade localmente (você pode também editar no backend)
    function atualizarAtividade(id, titulo, conteudo) {
      setAtividades((prev) =>
        prev.map((a) =>
          a.id === id
            ? { ...a, title: titulo, body: conteudo, edited: true }
            : a
        )
      );
    }
  
    function recolherNovaAtividade() {
      setExpandido(false);
      setNovoTitulo("");
      setNovoConteudo("");
      Keyboard.dismiss();
    }
  
    // Função para voltar (por ex.)
    function handleVoltar() {
      onPag(1);
    }
  
    return (
      <TouchableWithoutFeedback onPress={recolherNovaAtividade}>
        <View style={estilos.container}>
  
          {/* Barra de título */}
          <View style={estilos.barraTitulo}>
            <TouchableOpacity onPress={handleVoltar}>
              <Ionicons name="arrow-back" size={24} color="rgba(51, 51, 51, 255)" />
            </TouchableOpacity>
  
            <Text style={estilos.titulo}>
              Turma: {nomeTurma}
            </Text>
          </View>
  
          {/* Área de criação de atividade */}
          <View style={estilos.areaAviso}>
            {!expandido ? (
              <TouchableOpacity
                style={estilos.botaoPlaceholder}
                onPress={() => setExpandido(true)}
              >
                <Text style={estilos.textoPlaceholder}>
                  Escreva uma atividade
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <TextInput
                  style={estilos.inputTitulo}
                  placeholder="Título da atividade"
                  placeholderTextColor="rgba(153, 153, 153, 255)"
                  value={novoTitulo}
                  onChangeText={setNovoTitulo}
                />
                <TextInput
                  style={[estilos.inputConteudo, { height: 80 }]}
                  placeholder="Conteúdo da atividade"
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
                {
                  backgroundColor: podeEnviarNovo
                    ? "rgba(0, 123, 255, 255)"
                    : "rgba(204, 204, 204, 255)",
                },
              ]}
              disabled={!podeEnviarNovo}
              onPress={enviarNovaAtividade}
            >
              <Ionicons name="send" size={20} color="rgba(255, 255, 255, 255)" />
            </TouchableOpacity>
          </View>
  
          <Text style={estilos.subtitulo}>
            {atividades.length === 0
              ? "Nenhuma atividade disponível"
              : "Últimas atividades"}
          </Text>
  
          {/* Lista de atividades */}
          <FlatList
            data={atividades}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CartaoAtividade
                atividade={item}
                aoExcluir={excluirAtividade}
                aoAtualizar={atualizarAtividade}
              />
            )}
            contentContainerStyle={estilos.lista}
          />
  
          {/* Botão flutuante (exemplo) */}
          <TouchableOpacity
            style={estilos.fab}
            onPress={() => console.log("FAB Press!")}
          >
            <Ionicons name="add" size={28} color="rgba(255, 255, 255, 255)" />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }

// Estilos
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(242, 242, 242, 255)",
    padding: 16,
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
    color: "rgba(51, 51, 51, 255)",
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
    paddingVertical: 12,
  },
  textoPlaceholder: {
    color: "rgba(153, 153, 153, 255)",
    fontSize: 16,
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
    paddingBottom: 80,
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
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(51, 51, 51, 255)",
  },
  horarioCartao: {
    fontSize: 12,
    color: "rgba(102, 102, 102, 255)",
  },
  corpoCartao: {
    fontSize: 14,
    color: "rgba(68, 68, 68, 255)",
    marginBottom: 8,
  },
  acoesCartao: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  botaoAcao: {
    marginLeft: 16,
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
