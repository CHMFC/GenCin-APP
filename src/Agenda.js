import React from 'react'; 
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useWindowDimensions } from 'react-native';

export default function Agenda() {
  const { width: windowWidth } = useWindowDimensions();
  const isWideScreen = windowWidth > 768;

  const fullDayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  // Array de horários personalizados com texto que pode ser alterado
  const customSchedule = [
    { time: '13:00', dayIndex: 5, content: 'Redes Neurais' },
    { time: '13:00', dayIndex: 1, content: 'Redes Neurais' },
    { time: '17:00', dayIndex: 1, content: 'Banco De Dados' },
    { time: '18:50', dayIndex: 3, content: 'Banco De Dados' },
    { time: '18:50', dayIndex: 1, content: 'Engenharia De Software' },
    { time: '17:00', dayIndex: 3, content: 'Engenharia De Software' },
    { time: '17:00', dayIndex: 2, content: 'Gestão De Processos De Negócio' },
    { time: '18:50', dayIndex: 4, content: 'Gestão De Processos De Negócio' },
    { time: '17:00', dayIndex: 4, content: 'Sistema De Gestão Empresarial' },
    { time: '18:50', dayIndex: 2, content: 'Sistema De Gestão Empresarial' },
    { time: '17:00', dayIndex: 5, content: 'Planejamento E Gerenciamento De Projetos' },
    { time: '18:50', dayIndex: 5, content: 'Planejamento E Gerenciamento De Projetos' },
    
  
  ];

  // Função para determinar o conteúdo de cada célula baseado no horário e no dia
  const getCellContent = (time, dayIndex) => {
    const classData = customSchedule.filter(item => item.time === time && item.dayIndex === dayIndex);
    return classData.length > 0 ? classData.map(item => item.content).join(', ') : ''; // Retorna o conteúdo da aula ou vazio se não houver
  };

  // Agrupar por horário
  const groupedSchedule = customSchedule.reduce((acc, item) => {
    if (!acc[item.time]) {
      acc[item.time] = [];
    }
    acc[item.time].push(item); // Adiciona a aula ao horário correspondente
    return acc;
  }, {});

  // Geração da grade com horários, dias da semana e conteúdos
  const schedule = Object.keys(groupedSchedule).map(time => {
    return {
      time,
      days: groupedSchedule[time],
    };
  });

  // Filtra os dias da semana que possuem aulas
  const activeDays = Array.from({ length: 7 }, (_, dayIndex) =>
    schedule.some(row => row.days.some(cell => cell.dayIndex === dayIndex)) ? dayIndex : null
  ).filter(index => index !== null);

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
          {schedule.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              <View style={[styles.cell, styles.hourCell]}>
                <Text style={styles.hourText}>{row.time}</Text>
              </View>
              {activeDays.map(dayIndex => {
                const classData = row.days.find(item => item.dayIndex === dayIndex);
                return (
                  <View
                    key={dayIndex}
                    style={[
                      styles.cell,
                      classData ? styles.classCell : {},
                    ]}
                  >
                    <Text style={classData ? styles.classText : styles.cellText}>
                      {classData ? classData.content : ''}
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
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  grid: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    borderRadius: 13,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#545759',
    backgroundColor: '#545759',
    padding: 4,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  headerCell: {
    
    backgroundColor: 'white',
    fontWeight: 'bold',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
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
    color: '#black',
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#D9D9D9',
  },
  classCell: {
    backgroundColor: '#4CAF50',
  },
  classText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cellText: {
    color: '#121212',
    fontSize: 12,
    textAlign: 'center',
  },
});
