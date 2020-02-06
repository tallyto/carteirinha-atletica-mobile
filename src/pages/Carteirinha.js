import React, { useState, useEffect, version } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  AsyncStorage
} from "react-native";

import { LinearGradient } from 'expo-linear-gradient';
import logo from "./../../assets/logo.png";
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
    <LinearGradient
      colors={['#08AEEA', '#2AF598']}
      style={{ flex: 1 }}>
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

          <View style={styles.information}></View>

          {/* <TouchableOpacity onPress={handleSair} style={styles.button}>
            <Text style={styles.buttonText}>SAIR</Text>
            <MaterialCommunityIcons name="exit-run" size={20} color="#FFF" />
          </TouchableOpacity> */}
          </View>

        </View>
      </View>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
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
    borderRadius: 15,
  },
  texto: {padding: 20 },
  nome: {
    color: "#ffff",
    fontSize: 28,
    fontWeight: "bold"
  },
  faculdade: {
    color: "#ffff",
    fontSize: 24,
  },
  curso: {
    color: "#ffff",
    fontSize: 20,
  },
  info: {
    backgroundColor: "#fff",
    borderRadius: 20,
    flex: 1
  },
  logo: {
    height: 150, width: 150
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
  information: {

    borderBottomColor: "#c3c3c3",
    borderBottomWidth: 1,
    marginHorizontal: 20
  }
 
});
