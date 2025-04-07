import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { getMinhasTurmas } from "../functions/api";

/**
 * Aqui definimos faixas de horário (ex.: "06:00 - 06:50", "07:00 - 07:50", ...).
 * Cada faixa tem um horário inicial em 'horarioSlots' para identificá-la.
 * Caso queira blocos diferentes (ex.: 1h), ajuste esses arrays.
 */

// FAIXAS DE HORÁRIO EXIBIDAS (para exibir no cabeçalho da tabela)
const mapHorarios = [
  "06:00 - 06:50",
  "07:00 - 07:50",
  "08:00 - 08:50",
  "09:00 - 09:50",
  "10:00 - 10:50",
  "11:00 - 11:50",
  "12:00 - 12:50",
  "13:00 - 13:50",
  "14:00 - 14:50",
  "15:00 - 15:50",
  "16:00 - 16:50",
  "17:00 - 17:50",
  "18:00 - 18:50",
  "18:50 - 19:40",
  "19:40 - 20:30",
  "20:30 - 21:20",
  "21:20 - 22:10",
  "22:10 - 23:00"
];

// HORÁRIOS "INICIAIS" DE CADA BLOCO (padrão 50 minutos).
// Usamos para "encaixar" o horário. Ex.: 18:50 => index 13, 19:00 => ainda index 13
const horarioSlots = [
  "06:00:00",
  "07:00:00",
  "08:00:00",
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
  "18:00:00",
  "18:50:00",
  "19:40:00",
  "20:30:00",
  "21:20:00",
  "22:10:00"
];

// DIAS DA SEMANA
const mapDiasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

/**
 * Converte "HH:mm:ss" => número de minutos do dia (ex.: "19:00:00" => 1140).
 */
function toMinutes(timeStr) {
  const [hh, mm, ss] = timeStr.split(":");
  return parseInt(hh, 10) * 60 + parseInt(mm, 10);
}

/**
 * Função que faz aproximação: dado um timeStr, retorna o índice do 'horarioSlots'
 * cujo início é o maior que não ultrapassa timeStr.
 * Ex.: se timeStr = "19:00:00", e temos "18:50:00" e "19:40:00" no array,
 * ele vai acabar pegando o index de "18:50:00" (por ex., 13).
 */
function approximateTimeStringToIndex(timeStr) {
  if (!timeStr) return -1;

  const totalMins = toMinutes(timeStr);
  let bestIndex = -1;

  // Percorre horarioSlots e atualiza 'bestIndex' para o maior slot que não exceda totalMins
  for (let i = 0; i < horarioSlots.length; i++) {
    const slotMins = toMinutes(horarioSlots[i]);
    if (slotMins <= totalMins) {
      bestIndex = i;
    } else {
      // assim que encontrarmos um slot que passa totalMins, paramos
      break;
    }
  }
  return bestIndex;
}

// Cria um objeto do tipo:
// { "06:00 - 06:50": { "Segunda": "", "Terça": "", ... },
//   "07:00 - 07:50": { ... }, ... }
function criarAgendaVazia() {
  const agenda = {};
  mapHorarios.forEach((faixa) => {
    agenda[faixa] = {};
    mapDiasSemana.forEach((dia) => {
      agenda[faixa][dia] = "";
    });
  });
  return agenda;
}

/**
 * Preenche a agenda para cada dia em que a aula ocorra (aula.seg, aula.ter, etc.).
 * Fazemos a aproximação do horário de início/fim para descobrir os blocos
 * que devem ser marcados.
 */
function preencherAulaNaAgenda(agenda, aula) {
  // Função auxiliar:
  const marcarBlocos = (diaLabel, horaInicio, horaFim, nomeAula) => {
    const start = approximateTimeStringToIndex(horaInicio);
    const end = approximateTimeStringToIndex(horaFim);

    if (start >= 0 && end >= 0 && end >= start) {
      for (let i = start; i <= end; i++) {
        const faixa = mapHorarios[i];
        agenda[faixa][diaLabel] = nomeAula;
      }
    }
  };

  // Se aula.seg === true, marcamos segunda
  if (aula.seg) {
    marcarBlocos("Segunda", aula.horaInicioSeg, aula.horaFimSeg, aula.nomeAula);
  }
  if (aula.ter) {
    marcarBlocos("Terça", aula.horaInicioTer, aula.horaFimTer, aula.nomeAula);
  }
  if (aula.qua) {
    marcarBlocos("Quarta", aula.horaInicioQua, aula.horaFimQua, aula.nomeAula);
  }
  if (aula.qui) {
    marcarBlocos("Quinta", aula.horaInicioQui, aula.horaFimQui, aula.nomeAula);
  }
  if (aula.sex) {
    marcarBlocos("Sexta", aula.horaInicioSex, aula.horaFimSex, aula.nomeAula);
  }
  if (aula.sab) {
    marcarBlocos("Sábado", aula.horaInicioSab, aula.horaFimSab, aula.nomeAula);
  }
}

export default function Agenda({ sessaoKey, onLogin }) {
  // Estado: array de turmas vindas do backend
  const [turmas, setTurmas] = useState([]);

  // Estado: agenda pronta pra exibição
  const [agenda, setAgenda] = useState(criarAgendaVazia);

  // Loading
  const [loading, setLoading] = useState(true);

  // Buscar turmas do back
  const fetchTurmas = async () => {
    try {
      if (!sessaoKey) {
        console.warn("SessaoKey não encontrada!");
        return;
      }
      const data = await getMinhasTurmas(sessaoKey);
      setTurmas(data);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega turmas quando sessaoKey mudar
  useEffect(() => {
    fetchTurmas();
  }, [sessaoKey]);

  // Monta a agenda sempre que turmas mudar
  useEffect(() => {
    if (turmas.length > 0) {
      const novaAgenda = criarAgendaVazia();
      turmas.forEach((aula) => {
        preencherAulaNaAgenda(novaAgenda, aula);
      });
      setAgenda(novaAgenda);
    } else {
      setAgenda(criarAgendaVazia());
    }
  }, [turmas]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />
      ) : (
        <ScrollView horizontal>
          <View>
            {/* Cabeçalho (Dias) */}
            <View style={styles.viewCabecalho}>
              <View style={styles.viewHorarios}>
                <Text style={styles.textCabecalho}>Horários</Text>
              </View>

              {mapDiasSemana.map((dia, index) => (
                <View key={index} style={styles.viewDiasSemana}>
                  <Text style={styles.textCabecalho}>{dia}</Text>
                </View>
              ))}
            </View>

            {/* Corpo (Horários × Dias) */}
            <ScrollView>
              {mapHorarios.map((faixa, index) => {
                // Define cor de fundo de acordo com manhã/tarde/noite
                let backgroundColor = "rgba(237, 231, 246, 255)"; // Noite, default
                if (index < 6) {
                  // 06:00 - 11:00
                  backgroundColor = "rgba(227, 242, 253, 255)"; // manhã
                } else if (index < 12) {
                  // 12:00 - 17:00
                  backgroundColor = "rgba(255, 243, 224, 255)"; // tarde
                }

                return (
                  <View
                    key={index}
                    style={[
                      styles.viewPeriodoDia,
                      { backgroundColor }
                    ]}
                  >
                    {/* Coluna da faixa de horário */}
                    <View style={styles.viewHorario}>
                      <Text style={styles.textHorario}>{faixa}</Text>
                    </View>

                    {/* Colunas de cada dia */}
                    {mapDiasSemana.map((dia, diaIndex) => (
                      <View key={diaIndex} style={styles.viewAula}>
                        <Text style={styles.textAula}>
                          {agenda[faixa][dia] || "---"}
                        </Text>
                      </View>
                    ))}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(248, 249, 250, 255)",
    flex: 1,
  },
  viewCabecalho: {
    backgroundColor: "rgba(52, 58, 64, 255)",
    flexDirection: "row",
  },
  viewHorarios: {
    backgroundColor: "rgba(52, 58, 64, 255)",
    width: 100,
    paddingVertical: 12,
    alignItems: "center",
    borderColor: "rgba(222, 226, 230, 255)",
    borderWidth: 0.5,
  },
  viewDiasSemana: {
    backgroundColor: "rgba(73, 80, 87, 255)",
    width: 150,
    paddingVertical: 12,
    alignItems: "center",
    borderColor: "rgba(222, 226, 230, 255)",
    borderWidth: 0.5,
  },
  textCabecalho: {
    color: "rgba(255, 255, 255, 255)",
    fontSize: 16,
    fontWeight: "700",
  },
  viewPeriodoDia: {
    flexDirection: "row",
  },
  viewHorario: {
    width: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(222, 226, 230, 255)",
    borderWidth: 0.5,
  },
  textHorario: {
    color: "rgba(73, 80, 87, 255)",
    fontSize: 14,
    fontWeight: "700",
  },
  viewAula: {
    width: 150,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(222, 226, 230, 255)",
    borderWidth: 0.5,
  },
  textAula: {
    color: "rgba(73, 80, 87, 255)",
    fontSize: 14,
  },
});
