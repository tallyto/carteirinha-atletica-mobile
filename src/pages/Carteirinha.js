import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import api from "./../services/api";
import moment from "moment";
export default function Carteirinha() {
  const [user, setUser] = useState("");

  async function handleSocio() {
    try {
      const socio = await api.get("/listar/socio", {
        params: { cpf: "02614566284" }
      });

      setUser(socio.data);
      console.log(socio.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      {user.isValid ? (
        <Text style={styles.valid}>VALIDO</Text>
      ) : (
        <Text style={styles.invalid}>INVALIDO</Text>
      )}
      <Image
        style={styles.imgProfile}
        source={{
          uri: "https://avatars3.githubusercontent.com/u/28845658?s=460&v=4"
        }}
      />
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.description}>{user.cpf}</Text>
      <Text style={styles.description}>{user.curso}</Text>
      <Text style={styles.description}>Membro desde
        {moment(user.createdAt).format(" MM/YY")}
      </Text>

      <Text style={styles.description}>Mercenária</Text>
      <TouchableOpacity onPress={handleSocio} style={styles.button}>
        <Text style={styles.buttonText}>SAIR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 20
  },

  title: {
    color: "#000",
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "bold"
  },
  button: {
    padding: 10,
    color: "#fff",
    backgroundColor: "#000",
    alignItems: "center",
    width: "100%"
  },
  buttonText: {
    fontSize: 18,
    color: "#fff"
  },
  description: {
    fontSize: 18,
    marginVertical: 5
  },
  imgProfile: {
    height: 300,
    width: 300
  },
  valid: {
    fontSize: 25,
    color: "green",
    fontWeight: "bold",
    marginBottom: 10
  },
  invalid: {
    fontSize: 25,
    color: "red",
    fontWeight: "bold",
    marginBottom: 10
  }
});
