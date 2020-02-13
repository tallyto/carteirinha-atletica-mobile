import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet,Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import parceiroDb from './../db/parceiros.json'
import logo from "./../../assets/image.png";
export default function Parceiros({ navigation }) {

  const [parceiro, setParceiro] = useState(parceiroDb)
  function handleCarteirinha() {
    navigation.navigate("Carteirinha");
  }

  return (
    <View style={styles.container}>
      <View style={styles.parceiros}>
      {parceiro.map((item) => (
        <View key={item.key} style={styles.viewList}>
          <View style={styles.info}>
          <Text style={styles.title}>{item.loja}</Text>
          <Text style={styles.promotion}>{item.promotion}</Text>
          </View>
         
          <Image source={logo} style={styles.logo} />
        </View>
      ))}

      <TouchableOpacity onPress={handleCarteirinha} style={styles.actions}>
        <MaterialCommunityIcons name="keyboard-backspace" size={40} color="#000" />
        <Text style={styles.textActions}>Voltar</Text>
      </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  parceiros: {
    marginTop: 60,
    marginHorizontal: 30,
    flex: 1, 
  },
  viewList: {
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center",
  },
  actions: {
    alignItems: "center",
  },
  textActions: {
    fontSize: 18
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  promotion: {
    fontSize: 16
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});

