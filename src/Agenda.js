import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useWindowDimensions } from 'react-native';

export default function Agenda() {
  const { width: windowWidth } = useWindowDimensions();
  const isWideScreen = windowWidth > 768; // Define se a tela é grande para ajustar os estilos

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

  // Estilos dinâmicos para ajustar a largura do contêiner principal em telas maiores
  const dynamicStyles = {
    formContainer: {
      ...styles.formContainer,
      maxWidth: isWideScreen ? 600 : '100%', // Ajusta largura com base no tamanho da tela
    },
  };

  return (
    <View style={dynamicStyles.formContainer}>
      {/* ScrollView para garantir que o conteúdo será rolável verticalmente */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.grid}>
          {/* Linha de cabeçalho com os dias da semana */}
          <View style={styles.row}>
            <View style={[styles.cell, styles.dayCell]}>
              <Text style={styles.cellText}></Text>
            </View>
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
              <View key={index} style={[styles.cell, styles.headerCell]}>
                <Text style={styles.cellText}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Linhas de horários com células para cada dia da semana */}
          {Array.from({ length: 24 }, (_, hourIndex) => (
            <View key={hourIndex} style={styles.row}>
              {/* Célula de horário na primeira coluna */}
              <View style={[styles.cell, styles.hourCell]}>
                <Text style={styles.hourText}>{hourIndex}:00</Text>
              </View>

              {/* Células para os dias da semana */}
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const cellContent = getCellContent(hourIndex, dayIndex);
                const isClass = cellContent !== ''; // Verifica se a célula contém aula
                return (
                  <View
                    key={dayIndex}
                    style={[
                      styles.cell,
                      isClass && styles.classCell, // Aplica estilo especial para aulas
                    ]}
                  >
                    <Text style={[styles.cellText, isClass && styles.classText]}>
                      {cellContent}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Configurações do contêiner principal
  formContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '4%',
    paddingRight: '4%',
    paddingTop: '6%',
    paddingBottom: '6%',
    backgroundColor: '#FFFFFF', // Cor de fundo do contêiner principal
    width: '100%',
    alignSelf: 'center',
    paddingTop: 100,
    paddingBottom: 80,
  },
  // Configurações do conteúdo rolável
  scrollViewContent: {
    paddingVertical: 20,
    alignItems: 'center',
    width: '100%',
  },
  // Grade principal que contém os horários e dias
  grid: {
    flexDirection: 'column', // Organiza a grid verticalmente
    width: '100%',
    alignItems: 'center', // Centraliza o conteúdo dentro da grade
    borderRadius: 10, // Bordas arredondadas na grade
    overflow: 'hidden', // Impede que o conteúdo extrapole as bordas
    borderWidth: 1, // Borda em volta da grade
    borderColor: 'black', // Cor da borda
  },
  // Configuração para cada linha (horários e dias)
  row: {
    flexDirection: 'row', // Organiza as células horizontalmente
    width: '100%', // Linha ocupa toda a largura disponível
    justifyContent: 'center', // Centraliza as células
  },
  // Células de horário na primeira coluna
  hourCell: {
    width: 60, // Largura fixa para as células de horário
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white', // Fundo branco
    height: 40, // Altura fixa
  },
  hourText: {
    fontSize: 14,
    color: '#333333', // Cor do texto
  },
  // Estilos padrão para todas as células
  cell: {
    flex: 1, // Células ocupam largura igual (tamanho flexível)
    height: 40, // Altura fixa
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#D9D9D9', // Fundo cinza claro
  },
  // Estilo para a célula "Dia" no cabeçalho
  dayCell: {
    backgroundColor: '#F5F5F5', // Fundo mais claro para destaque
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold', // Texto em negrito
    height: 40, // Altura fixa
    width: 60, // Largura fixa
  },
  // Estilo para células do cabeçalho (dias da semana)
  headerCell: {
    backgroundColor: 'white', // Fundo branco
    fontWeight: 'bold', // Texto em negrito
    height: 40, // Altura fixa
  },
  // Texto padrão para as células
  cellText: {
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
  },
  // Estilo especial para células com aulas
  classCell: {
    backgroundColor: 'green', // Fundo verde para células com aulas
  },
  // Texto especial para células com aulas
  classText: {
    color: 'white', // Texto branco
  },
});
