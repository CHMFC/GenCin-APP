import React from "react";
import {
    View,
    StyleSheet,
    Text,
} from "react-native";

export default function Login(){


    return (
        <View style={styles.container}>

            <View style={styles.centraLogin}>

                <View style={styles.viewLogo}>
                    <Text style={styles.Logo}> 
                        GenCin
                    </Text>
                </View>

                <View style={styles.viewEmail}>
                    <Text style={styles.textoEmail}>
                        E-mail
                    </Text>
                    <View style={styles.inputEmail}>

                    </View>
                </View>

                <View style={styles.viewSenha}>
                    <Text style={styles.textoSenha}>
                        Senha
                    </Text>
                    <View style={styles.inputSenha}>

                    </View>
                </View>

                <View style={styles.viewEsqueceuSenha}>
                    <Text style={styles.textoEsqueceuSenha}>
                        Esqueceu sua senha?
                    </Text>
                </View>

                <View>

                </View>

            </View>




        </View>
    )
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  centraLogin: {
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(255,0,0,255)',
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  viewLogo: {
    height: "10%",
    width: "100%",
    backgroundColor: 'rgba(255,255,255,255)',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  }, 
  Logo: {
    fontSize: 48,
    fontWeight: 800,
  },

  viewEmail: {
    height: "14%",
    width: "100%",
    backgroundColor: 'rgba(255,255,255,255)',
    alignItems: "left",
    padding: 10,
  },
  textoEmail: {
    fontSize: 24,
    marginBottom: 10,
  }, 
  inputEmail: {
    height: "50%",
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,255)',
    borderRadius: 10,
  },

  viewSenha: {
    height: "14%",
    width: "100%",
    backgroundColor: 'rgba(255,255,255,255)',
    alignItems: "start",
    marginBottom: 20,
    padding: 10,
  },
  textoSenha: {
    fontSize: 24,
    marginBottom: 10,
  }, 
  inputSenha: {
    height: "50%",
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,255)',
    borderRadius: 10,
  },

  viewEsqueceuSenha: {
    width: "100%",
    height: "10%",
    backgroundColor: 'rgba(255,255,255,255)',
  },
  textoEsqueceuSenha: {
    textAlign: "right",
    fontSize: 24,
  }

});
