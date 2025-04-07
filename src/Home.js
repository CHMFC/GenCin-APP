import React, { useEffect, useState } from "react";
import { 
  View, Text, Image, ScrollView, 
  StyleSheet, SafeAreaView, 
  TouchableOpacity 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getInfo, getMinhasTurmas, buscarAtividadesPorCod } from "../functions/api";

export default function Home({ sessaoKey, onLogin, onPag }) {

  const [nome, setNome] = useState("");

  // Estado que controla se há aula em cada dia (segunda..domingo)
  const [diasComAulas, setDiasComAulas] = useState({
    seg: false, ter: false, qua: false,
    qui: false, sex: false, sab: false, dom: false
  });

  // Novo estado para armazenar as atividades de todas as turmas
  const [atividadesEmAberto, setAtividadesEmAberto] = useState([]);

  // Buscar nome do usuário (primeiro item do array retornado) 
  const handleGetInfo = async () => {
    try {
      if (!sessaoKey) {
        console.warn("Nenhuma sessaoKey encontrada!");
        onLogin(0);
        return;
      }
      const info = await getInfo(sessaoKey);
      setNome(info[0]);
    } catch (error) {
      console.error("Erro ao obter informações Home:", error);
    }
  };

  // Buscar turmas do usuário e marcar dias com aula
  const handleCarregarDiasComAulas = async () => {
    try {
      if (!sessaoKey) return;
      const turmas = await getMinhasTurmas(sessaoKey);
      /*
        Exemplo de cada turma:
        {
          "id": "...",
          "codAula": "...",
          "nomeAula": "...",
          "seg": true/false,
          "ter": ...,
          ...
        }
      */

      let temSeg = false, temTer = false, temQua = false,
          temQui = false, temSex = false, temSab = false, temDom = false;

      for (let aula of turmas) {
        if (aula.seg) temSeg = true;
        if (aula.ter) temTer = true;
        if (aula.qua) temQua = true;
        if (aula.qui) temQui = true;
        if (aula.sex) temSex = true;
        if (aula.sab) temSab = true;
        // dom, se existir, etc.
      }

      setDiasComAulas({
        seg: temSeg, ter: temTer, qua: temQua,
        qui: temQui, sex: temSex, sab: temSab, dom: temDom
      });
    } catch (error) {
      console.error("Erro ao verificar dias com aulas:", error);
    }
  };

  // Buscar atividades de todas as turmas do usuário
  const handleCarregarAtividades = async () => {
    try {
      if (!sessaoKey) return;
      const turmas = await getMinhasTurmas(sessaoKey);

      let todasAtividades = [];

      // Para cada turma, buscar atividades pelo codAula
      for (let aula of turmas) {
        if (!aula.codAula) continue;

        try {
          // Chama GET /atividade/cod?codAula=...
          const atividades = await buscarAtividadesPorCod(aula.codAula);
          // 'atividades' é um array, 
          // Se a Atividade no back tem, por ex., 'nomeAtividade', 'descricao', etc.,
          // e você só precisa exibir um resumo, salve-as em 'todasAtividades'

          // Vamos supor que cada item seja algo como 
          // { id, codAula, nomeAtividade, descricao, ... }
          // Adicionamos no array local
          todasAtividades.push(...atividades); 
        } catch (error) {
          // Se alguma turma não tiver atividades ou der 404, ignore
          console.log(`Nenhuma atividade para aula ${aula.codAula} ou erro`, error);
        }
      }

      setAtividadesEmAberto(todasAtividades);
    } catch (error) {
      console.error("Erro ao carregar atividades:", error);
    }
  };

  // Carregar nome, dias de aulas e atividades 
  useEffect(() => {
    handleGetInfo();
    handleCarregarDiasComAulas();
    handleCarregarAtividades();
  }, [sessaoKey]);

  // Ao clicar na agenda
  const handleAgenda = () => {
    onPag(4);
  };

  // Exemplo de clique na atividade 
  const handleAtividadePress = (atividade) => {
    console.log("Clicou em atividade:", atividade);
    // Por ex., onPag(7) ou algo assim
  };

  return (
    <SafeAreaView style={styles.containerSafe}>
      <ScrollView contentContainerStyle={styles.containerScroll}>

        {/* Container Bem-vindo */}
        <View style={styles.containerBemVindo}>
          <View style={styles.containerBemVindoText}>
            <Text style={styles.bemVindoNome}>
              Bem-vindo(a), {nome}
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/imagemBemVindo.png")}
              style={styles.imageBemVindo}
            />
          </View>
        </View>

        {/* Agenda - Dias da Semana */}
        <TouchableOpacity onPress={handleAgenda}>
          <View style={styles.containerAgenda}>
            {/* Segunda (S) */}
            <View style={styles.containerDias}>
              <Text style={styles.textDias}>S</Text>
              <Ionicons 
                name="ellipse"
                size={40}
                color={diasComAulas.seg ? "green" : "#D9D9D9"}
                style={styles.frameChild}
              />
            </View>
            {/* Terça (T) */}
            <View style={styles.containerDias}>
              <Text style={styles.textDias}>T</Text>
              <Ionicons
                name="ellipse"
                size={40}
                color={diasComAulas.ter ? "green" : "#D9D9D9"}
                style={styles.frameChild}
              />
            </View>
            {/* Quarta (Q) */}
            <View style={styles.containerDias}>
              <Text style={styles.textDias}>Q</Text>
              <Ionicons
                name="ellipse"
                size={40}
                color={diasComAulas.qua ? "green" : "#D9D9D9"}
                style={styles.frameChild}
              />
            </View>
            {/* Quinta (Q) */}
            <View style={styles.containerDias}>
              <Text style={styles.textDias}>Q</Text>
              <Ionicons
                name="ellipse"
                size={40}
                color={diasComAulas.qui ? "green" : "#D9D9D9"}
                style={styles.frameChild}
              />
            </View>
            {/* Sexta (S) */}
            <View style={styles.containerDias}>
              <Text style={styles.textDias}>S</Text>
              <Ionicons
                name="ellipse"
                size={40}
                color={diasComAulas.sex ? "green" : "#D9D9D9"}
                style={styles.frameChild}
              />
            </View>
            {/* Sábado (S) */}
            <View style={styles.containerDias}>
              <Text style={styles.textDias}>S</Text>
              <Ionicons
                name="ellipse"
                size={40}
                color={diasComAulas.sab ? "green" : "#D9D9D9"}
                style={styles.frameChild}
              />
            </View>
            {/* Domingo (D) */}
            <View style={styles.containerDias}>
              <Text style={styles.textDias}>D</Text>
              <Ionicons
                name="ellipse"
                size={40}
                color={diasComAulas.dom ? "green" : "#D9D9D9"}
                style={styles.frameChild}
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* Atividades em aberto */}
        <View style={styles.containerAtividadesPrincipal}>
          <Text style={styles.labelAtividadeTitulo}>
            Atividades em aberto
          </Text>

          {
            atividadesEmAberto.length === 0 
            ? (
              <Text style={{fontSize:14, color:'#666'}}>
                Não há atividades no momento.
              </Text>
            ) : (
              atividadesEmAberto.map((atividade) => (
                <TouchableOpacity 
                  key={atividade.id} 
                  style={styles.containerAtividades} 
                  onPress={() => handleAtividadePress(atividade)}
                >
                  <View style={styles.containerDescricaoTurma}>
                    {/* Exemplo: se a Atividade no back tem 'nomeAtividade' e 'descricao' */}
                    <Text style={styles.labelAtividade}>
                      {atividade.nomeAtividade || "Atividade Sem Nome"}
                    </Text>
                    <Text style={styles.labelDescricaoAtividade}>
                      {atividade.descricao || "Sem descrição"}
                    </Text>
                  </View>

                  <TouchableOpacity style={styles.chevronButton}>
                    <Ionicons name="chevron-forward" size={24} color="#545759" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
    backgroundColor: "#F0F0F0",
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
    marginTop: 10,
    marginLeft: 14,
    borderRadius: 16,
    padding: 10,
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
    justifyContent: "space-between",
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
  frameChild:{
    // Ionicons style
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
