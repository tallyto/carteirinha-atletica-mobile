import React, { useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";

import { LinearGradient } from 'expo-linear-gradient';
import logo from "./../../assets/logo.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function Carteirinha({ navigation }) {
  const [user, setUser] = useState("");

  function handerParceiros(){
    navigation.navigate("Parceiros");
  }

  async function handleSair() {
    await AsyncStorage.setItem("@socio", "");

    navigation.navigate("Login");
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
    <LinearGradient
      colors={['#ffd600', '#fff']}
      style={styles.gradient}>
      <View style={styles.container}>

        <View style={styles.card}>

          <View style={styles.perfil}>

            <Image
              style={styles.imgProfile}
              source={{
                uri: user.img.url
              }}
            />

            <View style={styles.texto}>
              <Text style={styles.nome}>{user.nome}</Text>
              <Text style={styles.faculdade}>UFRR</Text>
              <Text style={styles.curso}>Computação</Text>

            </View>
          </View>

          <View style={styles.info}>

            <View style={styles.headerInfo}>
              <Image source={logo} style={styles.logo} />

              <View style={styles.textInfo}>
                <Text style={styles.titleInfo}>Situação</Text>
                <Text style={styles.situation}>ATIVO</Text>
              </View>

            </View>

            <View style={styles.line}/>

            <View style={styles.dados}>

            <Text style={styles.title}>CPF</Text>
              <Text style={styles.date}>{user.cpf}</Text>
              
              <Text style={styles.title}>Matricula</Text>
              <Text style={styles.date}>{user.matricula}</Text>

              {/* <Text style={styles.title}>Validade</Text>
              <Text style={styles.date}>16/10/2020</Text> */}
            </View>

          <View style={styles.button}>
            
            <TouchableOpacity onPress={handerParceiros}   style={styles.actions}>     
              <MaterialCommunityIcons name="store" size={40} color="#000"  />
              <Text style={styles.textActions}>Parceiros</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSair} style={styles.actions}>
             <MaterialCommunityIcons name="exit-run" size={40} color="#000" />
             <Text style={styles.textActions}>Sair</Text>
           </TouchableOpacity>

            </View>
          </View>

        </View>
      </View>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
  },
  card: {
    marginTop: 30,
    marginHorizontal: 15,
    flex: 1
  },
  perfil: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  imgProfile: {
    height: 225,
    width: 175,
    borderRadius: 10,
  },
  texto: { padding: 20 },
  nome: {
    color: "#000",
    fontSize: 28,
    fontWeight: "bold"
  },
  faculdade: {
    color: "#000",
    fontSize: 24,
  },
  curso: {
    color: "#000",
    fontSize: 20,
  },
  info: {
    backgroundColor: "#fff",
    borderRadius: 20,
    flex: 1
  },
  logo: {
    height: 100, width: 100
  },
  headerInfo: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textInfo: {
    alignItems: "center"
  },
  titleInfo: {
    fontSize: 24,
  },
  situation: {
    fontSize: 28,
    fontWeight: "bold"
  },
  line: {
    borderBottomColor: "#c3c3c3",
    borderBottomWidth: 1,
    marginHorizontal: 20
  },
  dados: {
    flex: 1,
    padding: 25,
    flexDirection: "column",

  },
  title: {
    fontSize: 26,
    color: "#ffd600",
    fontWeight: "bold"
  },
  date: {
    fontSize: 28
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20
  },
  actions: {
    alignItems: "center",
  },
  textActions: {
    fontSize: 18
  }
});
