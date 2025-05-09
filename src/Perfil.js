import { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import { getInfo, logout } from "../functions/api";

export default function Perfil({sessaoKey, onLogin, onPag}) {

    const [nome,setNome] = useState("");
    const [email,setEmail] = useState("");
    const [departamento,setDepartamento] = useState("");

    const handleGetInfo = async () => {
        try {
          if (!sessaoKey) {
            console.warn("Nenhuma sessaoKey encontrada!");
            onLogin(0);
          }
          const info = await getInfo(sessaoKey); 
          setNome(info[0]);
          setEmail(info[1]);
          setDepartamento(info[3]);
    
        } catch (error) {
          console.error("Erro ao obter informações Home:", error);
        }
      };
      
      
      const handleEditar = () => {
        onPag(5);
      }

      const handleLogout = async () => {
        try {
          if (!sessaoKey) {
            console.warn("SessaoKey não encontrada!");
            onLogin(0);
            return;
          }
          // Chama a função logout passando a sessaoKey
          const result = await logout(sessaoKey);
          
          // Após o logout, redirecione o usuário ou atualize o estado da aplicação
          onLogin(0);
        } catch (error) {
        }
      };
    
      useEffect(() => {
        handleGetInfo();
      })

    return (

        <View style={styles.container}>

            {/* Bloco do Perfil */}
            <View style={styles.viewBlocoPerfil}>

                {/* Foto do Perfil */}
                <View style={styles.viewImagemUsuario}>
                    <Image
                        source={require("../assets/DefaultUser.jpg")}
                        style = {styles.imageImagemUsuario}
                    />
                </View>

                {/* Nome do Usuário */}
                <Text style={styles.textNomeUsuario}>
                    {nome}
                </Text>

                {/* Email do Usuário */}
                <Text style={styles.textEmailUsuario}>
                    {email}
                </Text>

                {/* Bloco de Informações */}
                <View style={styles.viewInformacoes}>

                    {/* Texto: "[Departamento]" */}
                    <Text style={styles.textDepartamentoUsuario}>
                        {departamento}
                    </Text>

                </View>

            </View>

            {/* Bloco fixo que fica embaixo */}
            <View style={styles.viewBlocoFixoInferior}>

                {/* Botão de Editar Perfil */}
                <TouchableOpacity onPress={handleEditar} style={styles.viewBotaoEditarPerfil}>
                    <Text style={styles.textBotaoEditarPerfil}>
                        Editar Perfil
                    </Text>
                </TouchableOpacity>

                {/* Texto: "Sair da conta" */}
                <TouchableOpacity style={styles.viewSairConta} onPress={handleLogout}>
                    <Text style={styles.textSairConta}>
                        Sair da conta
                    </Text>
                </TouchableOpacity>

            </View>
        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "rgba(242, 242, 242, 255)",
        flex: 1,
    },

    viewBlocoPerfil: {
        flex: 1,
        alignItems: "center",
    },

    viewImagemUsuario: {
        marginTop: 50,
        marginBottom: 28,
    },
    imageImagemUsuario: {
        backgroundColor: "rgba(224, 224, 224, 255)",
        width: 128,
        height: 128,
        borderRadius: 64,
    },

    textNomeUsuario: {
        color: "rgba(84, 87, 89, 255)",
        fontSize: 25,
        fontWeight: "700",
        marginBottom: 5,
    },

    textEmailUsuario: {
        color: "rgba(84, 87, 89, 255)",
        fontSize: 18,
        marginBottom: 80,
    },

    viewInformacoes: {
        backgroundColor: "rgba(255, 255, 255, 255)",
        width: "90%",
        borderRadius: 10,
        paddingTop: 25,
        paddingBottom: 30,
        paddingHorizontal: 25,
        shadowColor: "rgba(0, 0, 0, 255)",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignItems: "center",
        justifyContent: "center",
    },

    textDepartamentoUsuario: {
        color: "rgba(51, 51, 51, 255)",
        fontSize: 25,
        fontWeight: "700",
    },

    viewBlocoFixoInferior: {
        backgroundColor: "rgba(242, 242, 242, 255)",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        paddingVertical: 15,
    },

    viewBotaoEditarPerfil: {
        backgroundColor: "rgba(0, 123, 255, 255)",
        width: 328,
        alignItems: "center",
        borderRadius: 8,
        paddingVertical: 15,
        marginBottom: 20,
    },
    textBotaoEditarPerfil: {
        color: "rgba(255, 255, 255, 255)",
        fontFamily: "Roboto",
        fontSize: 18,
        fontWeight: "700",
    },

    viewSairConta: {
        alignItems: "center",
    },
    textSairConta: {
        color: "rgba(84, 87, 89, 255)",
        fontFamily: "Roboto",
        textAlign: "center",
        fontSize: 16,
        textDecorationLine: "underline",
    },

});