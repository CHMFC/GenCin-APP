import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";

const mapHorarios = [
    "06:00 - 06:50", "07:00 - 07:50", "08:00 - 08:50", "09:00 - 09:50", "10:00 - 10:50", "11:00 - 11:50",
    "12:00 - 12:50", "13:00 - 13:50", "14:00 - 14:50", "15:00 - 15:50", "16:00 - 16:50",
    "17:00 - 17:50", "18:00 - 18:50", "18:50 - 19:40", "19:40 - 20:30", "20:30 - 21:20", "21:20 - 22:10", "22:10 - 23:00"
];

const mapDiasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

const mapAulas = {
    "06:00 - 06:50": { "Segunda": "", "Terça": "", "Quarta": "", "Quinta": "", "Sexta": "", "Sábado": "" },
    "07:00 - 07:50": { "Segunda": "", "Terça": "", "Quarta": "", "Quinta": "ZZZZ", "Sexta": "", "Sábado": "" },
    "08:00 - 08:50": { "Segunda": "", "Terça": "", "Quarta": "", "Quinta": "ZZZZ", "Sexta": "", "Sábado": "" },
    "09:00 - 09:50": { "Segunda": "", "Terça": "", "Quarta": "", "Quinta": "ZZZZ", "Sexta": "", "Sábado": "" },
    "10:00 - 10:50": { "Segunda": "", "Terça": "ZZZZ", "Quarta": "WWWW", "Quinta": "", "Sexta": "WWWW", "Sábado": "" },
    "11:00 - 11:50": { "Segunda": "", "Terça": "ZZZZ", "Quarta": "WWWW", "Quinta": "", "Sexta": "WWWW", "Sábado": "" },
    "12:00 - 12:50": { "Segunda": "XXXX", "Terça": "", "Quarta": "", "Quinta": "", "Sexta": "", "Sábado": "" },
    "13:00 - 13:50": { "Segunda": "XXXX", "Terça": "KKKK", "Quarta": "", "Quinta": "KKKK", "Sexta": "", "Sábado": "" },
    "14:00 - 14:50": { "Segunda": "XXXX", "Terça": "KKKK", "Quarta": "", "Quinta": "KKKK", "Sexta": "", "Sábado": "" },
    "15:00 - 15:50": { "Segunda": "XXXX", "Terça": "", "Quarta": "", "Quinta": "", "Sexta": "", "Sábado": "" },
    "16:00 - 16:50": { "Segunda": "XXXX", "Terça": "", "Quarta": "", "Quinta": "", "Sexta": "", "Sábado": "" },
    "17:00 - 17:50": { "Segunda": "", "Terça": "", "Quarta": "YYYY", "Quinta": "", "Sexta": "", "Sábado": "" },
    "18:00 - 18:50": { "Segunda": "", "Terça": "", "Quarta": "YYYY", "Quinta": "", "Sexta": "", "Sábado": "" },
    "18:50 - 19:40": { "Segunda": "YYYY", "Terça": "", "Quarta": "", "Quinta": "", "Sexta": "", "Sábado": "" },
    "19:40 - 20:30": { "Segunda": "YYYY", "Terça": "", "Quarta": "", "Quinta": "", "Sexta": "", "Sábado": "" },
    "20:30 - 21:20": { "Segunda": "", "Terça": "", "Quarta": "", "Quinta": "", "Sexta": "", "Sábado": "" },
    "21:20 - 22:10": { "Segunda": "", "Terça": "", "Quarta": "", "Quinta": "", "Sexta": "", "Sábado": "" },
    "22:10 - 23:00": { "Segunda": "", "Terça": "", "Quarta": "", "Quinta": "", "Sexta": "", "Sábado": "" }
};

export default function Agenda() {
    return (

        <View style={styles.container}>

            {/* Bloco para rolagem horizontal */}
            <ScrollView horizontal>
                <View>

                    {/* Bloco fixo: cabeçalho */}
                    <View style={styles.viewCabecalho}>

                        {/* Bloco do texto: Horários */}
                        <View style={styles.viewHorarios}>
                            <Text style={styles.textCabecalho}>
                                Horários
                            </Text>
                        </View>

                        {/* Blocos dinâmicos dos dias da semana */}
                        {mapDiasSemana.map((dia, index) => (
                            <View key={index} style={styles.viewDiasSemana}>
                                <Text style={styles.textCabecalho}>
                                    {dia}
                                </Text>
                            </View>
                        ))}

                    </View>

                    {/* Bloco para rolagem vertical */}
                    <ScrollView>

                        {/* Blocos dinâmicos dos horários */}
                        {mapHorarios.map((horario, index) => (
                            // Definindo a cor de fundo de acordo com o período do dia
                            <View key={index} style=
                                {[
                                    styles.viewPeriodoDia,
                                    index < 6
                                    ? styles.viewPeriodoManha
                                    : index < 11
                                    ? styles.viewPeriodoTarde
                                    : styles.viewPeriodoNoite
                                ]}
                            >

                                {/* Bloco dinâmico dos horários do dia */}
                                <View style={styles.viewHorario}>
                                    <Text style={styles.textHorario}>
                                        {horario}
                                    </Text>
                                </View>

                                {/* Bloco dinâmico das aulas do dia */}
                                {mapDiasSemana.map((dia, diaIndex) => (
                                    <View key={diaIndex} style={styles.viewAula}>
                                        <Text style={styles.textAula}>
                                            {mapAulas[horario] && mapAulas[horario][dia] ? mapAulas[horario][dia] : "---"}
                                        </Text>
                                    </View>
                                ))}

                            </View>
                        ))}

                    </ScrollView>

                </View>
            </ScrollView>

        </View>

    );
}

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

    viewPeriodoManha: {
        backgroundColor: "rgba(227, 242, 253, 255)",
    },

    viewPeriodoTarde: {
        backgroundColor: "rgba(255, 243, 224, 255)",
    },

    viewPeriodoNoite: {
        backgroundColor: "rgba(237, 231, 246, 255)",
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