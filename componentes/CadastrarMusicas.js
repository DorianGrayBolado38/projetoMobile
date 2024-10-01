import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { firestore } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CadastrarCriptos({navigation}) {

    const [nomeMusica, setNomeMusica] = useState(null);
    const [autorMusica, setAutorMusica] = useState(null);
    const [albumMusica, setAlbumMusica] = useState(null);

    async function addCripto() {
        try {
            const docRef = await addDoc(collection(firestore, 'Músicas'), {
                nomeMusica: nomeMusica,
                autorMusica: autorMusica,
                albumMusica: albumMusica
            });
            console.log("Cadastrado com ID: ", docRef.id);
            Alert.alert("Cadastro", "Registros cadastrados com sucesso")
            navigation.navigate("Home");
        } catch (error) {
            console.error("Erro ao cadastrar: ", error);
            Alert.alert("Erro", "Erro ao cadastrar . Por favor, tente novamente.");
        }
    }

    return (
        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo}> Cadastre uma nova Música</Text>
            </View>
            <TextInput autoCapitalize='words' style={estilo.input} placeholder="Digite a música" onChangeText={setNomeMusica} value={nomeMusica} />
            <TextInput style={estilo.input} placeholder="Digite o Autor" onChangeText={setAutorMusica} value={autorMusica} />
            <TextInput style={estilo.input} placeholder="Digite o albúm" onChangeText={setAlbumMusica} value={albumMusica} />

            <TouchableOpacity
                style={estilo.btnenviar}
                onPress={() => {
                    addCripto();
                }}>
                <Text style={estilo.btntxtenviar}> Enviar </Text>
            </TouchableOpacity>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor:'#87CEFA',
        marginVertical: 10,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 15,
        borderRadius: 10,
    },
    btnenviar: {
        marginTop: 20,
        color:'#87CEFA',
    },
    btntxtenviar: {
        fontSize: 25,
    },
    titulo: {
        marginVertical: 40,
        fontSize: 25,
        textAlign: 'center',
    },
});