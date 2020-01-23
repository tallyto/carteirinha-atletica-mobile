import React, { useEffect, useState } from 'react'
import {
    View, Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView, AsyncStorage
} from 'react-native'

import api from "./../services/api";

export default function Login({ navigation }) {
    const [document, setDocument] = useState("");
    const [invalid, setInvalid] = useState("")



    async function handleLogin() {

        try {
            const response = await api.get("/listar/socio", {
                params: { cpf: document }
            });
            
            const value = response.data

            if (!value) {
                setInvalid("Usuário inválido!")
                setDocument("")
            } else if (value) {
                if (!value.isValid) {
                    setInvalid(`O associado ${value.name} está em débito!`)
                    setDocument("")
                }
            }
            else {
                navigation.navigate("Carteirinha")
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
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
    )

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