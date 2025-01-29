import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useWindowDimensions } from 'react-native';

//Agenda Sintetizada, Mostra apenas os dias e horarios que possuem aulas registradas

export default function Agenda() {
  const { width: windowWidth } = useWindowDimensions();
  const isWideScreen = windowWidth > 768;

  const fullDayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  // Função para determinar o conteúdo de cada célula baseado no horário e no dia
  const getCellContent = (hourIndex, dayIndex) => {
    if (hourIndex === 1 && dayIndex === 2) {
      return 'Aula de Matemática';
    }
    if (hourIndex === 2 && dayIndex === 4) {
      return 'Aula de Física';
    }
    return '';
  };

  // Geração da grade com horários, dias da semana e conteúdos
  const schedule = Array.from({ length: 24 }, (_, hourIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) => ({
      hour: `${hourIndex}:00`,
      dayIndex,
      content: getCellContent(hourIndex, dayIndex),
    }))
  );

  // Filtra os dias da semana que possuem aulas
  const activeDays = Array.from({ length: 7 }, (_, dayIndex) =>
    schedule.some(row => row[dayIndex].content !== '') ? dayIndex : null
  ).filter(index => index !== null);

  // Filtra os horários que possuem pelo menos uma aula
  const filteredSchedule = schedule.filter(row =>
    row.some(cell => cell.content !== '')
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.grid}>
          {/* Cabeçalho com os dias da semana ativos */}
          <View style={styles.row}>
            <View style={[styles.cell, styles.headerCell]}>
              <Text style={styles.cellText}>Horário</Text>
            </View>
            {activeDays.map(dayIndex => (
              <View key={dayIndex} style={[styles.cell, styles.headerCell]}>
                <Text style={styles.cellText}>{fullDayNames[dayIndex]}</Text>
              </View>
            ))}
          </View>

          {/* Linhas de horários com células somente para dias com aulas */}
          {filteredSchedule.map((hourCells, hourIndex) => (
            <View key={hourIndex} style={styles.row}>
              <View style={[styles.cell, styles.hourCell]}>
                <Text style={styles.hourText}>{hourCells[0].hour}</Text>
              </View>
              {hourCells.map((cell, dayIndex) =>
                activeDays.includes(dayIndex) ? (
                  <View
                    key={dayIndex}
                    style={[
                      styles.cell,
                      cell.content ? styles.classCell : {},
                    ]}
                  >
                    <Text style={cell.content ? styles.classText : styles.cellText}>
                      {cell.content}
                    </Text>
                  </View>
                ) : null
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Contêiner principal, com fundo branco e centralização do conteúdo
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  // Configuração do ScrollView para permitir rolagem e centralização do conteúdo
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  // Grade principal que contém as linhas e colunas
  grid: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#FFFFFF',
  },
  // Linha genérica para organizar células horizontalmente
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  // Células de horários na primeira coluna
  hourCell: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    height: 40,
  },
  hourText: {
    fontSize: 14,
    color: '#333333',
  },
  // Células genéricas para os conteúdos
  cell: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#D9D9D9',
  },
  // Células do cabeçalho com dias da semana
  headerCell: {
    backgroundColor: '#F5F5F5',
    fontWeight: 'bold',
    height: 40,
  },
  // Células que indicam aulas
  classCell: {
    backgroundColor: 'green',
  },
  classText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  // Estilo de texto genérico para células sem aula
  cellText: {
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
  },
});
