import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";

import api from "./../services/api";
import logo from "./../../assets/logo.png";

export default function Login({ navigation }) {
  const [document, setDocument] = useState("");
  const [invalid, setInvalid] = useState("");

  async function handleLogin() {
    try {
      const response = await api.get("/api/show", {
        params: { cpf: document }
      });

      const value = response.data;

      if (value) {
        if (!value.isValid) {
          setInvalid(`O associado ${value.nome} está em débito!`);
          setDocument("");
        } else {
          await AsyncStorage.setItem("@socio", JSON.stringify(value));
          navigation.navigate("Carteirinha");
        }
      }else{
        setInvalid("Usuário invalido");
          setDocument("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    AsyncStorage.getItem("@socio").then(socio => {
      if (socio) {
        navigation.navigate("Carteirinha");
      }
    });
  }, []);
  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <Image source={logo} style={{ height: 300, width: 300 }} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="number-pad"
        placeholder="Digite seu CPF - Apenas números"
        placeholderTextColor="#999"
        style={styles.input}
        value={document}
        onChangeText={setDocument}
        maxLength={11}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      {invalid ? <Text style={styles.invalid}>{invalid}</Text> : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  input: {
    height: 46,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15
  },
  button: {
    height: 46,
    alignSelf: "stretch",
    backgroundColor: "#ffd600",
    borderRadius: 4,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  },
  invalid: {
    fontSize: 16,
    color: "red",
    marginTop: 10
  }
});
