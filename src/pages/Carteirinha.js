import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  AsyncStorage
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function Carteirinha({ navigation }) {
  const [user, setUser] = useState("");
  async function handleSair() {
    await AsyncStorage.setItem("@socio", "");

    navigation.navigate("Login");
    // await AsyncStorage.setItem("@socio","")
  }

  async function handlerDados() {
    const userDB = await AsyncStorage.getItem("@socio");
    if (userDB) {
      const db = await JSON.parse(userDB);
      setUser(db);
    }
  }
  useEffect(() => {
    handlerDados();
  });

  if (!user) {
    return null;
  }
  return (
    <ImageBackground
      style={{ flex: 1, width: "100%", height: "100%" }}
      source={{
        uri:
          "https://carteirinha-atletica.s3-sa-east-1.amazonaws.com/background2.png"
      }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>SÓCIO</Text>
        <Text style={styles.atletica}>A. A. A. M - UFRR</Text>

        <View style={styles.imgView}>
          <Image
            style={styles.imgProfile}
            source={{
              uri: user.img.url
            }}
          />
        </View>

        {user.isValid ? (
          <Text style={styles.valid}>VALIDO</Text>
        ) : (
          <Text style={styles.invalid}>INVALIDO</Text>
        )}

        <Text style={styles.title}>{user.nome}</Text>
        <Text style={styles.description}>MATRÍCULA: {user.matricula}</Text>
        <Text style={styles.description}>CPF: {user.cpf}</Text>
        <Text style={styles.description}>CURSO: {user.curso}</Text>

        <TouchableOpacity onPress={handleSair} style={styles.button}>
          <Text style={styles.buttonText}>SAIR</Text>
          <MaterialCommunityIcons name="exit-run" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 20,
    marginVertical: 20
  },
  title: {
    color: "#000000",
    fontSize: 25,
    marginVertical: 5,
    fontWeight: "bold"
  },
  button: {
    padding: 10,
    color: "#fff",
    backgroundColor: "#000000",
    alignItems: "center",
    width: 100,
    marginTop: 30,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#ffd600"
  },
  buttonText: {
    fontSize: 18,
    color: "#fff"
  },
  description: {
    fontSize: 18,
    marginVertical: 5
  },
  label: {
    fontSize: 15,
    marginVertical: 5
  },
  imgProfile: {
    height: 200,
    width: 200,
    borderRadius: 100
  },
  imgView: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#ffd600"
  },
  valid: {
    fontSize: 25,
    color: "green",
    fontWeight: "bold",
    marginVertical: 10
  },
  invalid: {
    fontSize: 25,
    color: "red",
    fontWeight: "bold",
    marginVertical: 10
  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 5
  },
  atletica: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#ffd600"
  }
});
