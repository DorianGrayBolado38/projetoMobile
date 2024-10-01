import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { firestore } from "../Firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function alterarMusica({navigation, route}) {

    const id = route.params.id;

    const [nomeMusica, setNomeMusica] = useState(route.params.nomeMusica);
    const [autorMusica, setAutorMusica] = useState(route.params.autorMusica);
    const [albumMusica, setAlbumMusica] = useState(route.params.albumMusica);


    async function alterarMusica(id, nomeMusica, autorMusica, albumMusica) {
        try {
            await updateDoc(doc(collection(firestore, "tbmoeda"), id), {
                nomeMusica: nomeMusica,
                autorMusica: autorMusica,
                albumMusica: albumMusica
            })
            Alert.alert("Aviso", "Música Alterado com sucesso.")
            navigation.navigate("Home")
        }
        catch (error) {
            console.error("Erro ao alterar: ", error);
            Alert.alert("Erro", "Erro ao alterar. Por favor, tente novamente.");
        }
    }
        return (
            <View style={estilo.container}>
                <View>
                    <Text style={estilo.titulo}> Alterar dados da Música </Text>
                </View>
                <View>
                    <TextInput autoCapitalize='words' style={estilo.input} placeholder="Digite a música" onChangeText={setNomeMusica} value={nomeMusica} />
                    <TextInput style={estilo.input} placeholder="Digite o autor" onChangeText={setAutorMusica} value={autorMusica} />
                    <TextInput style={estilo.input} placeholder="Digite o albúm" onChangeText={setAlbumMusica} value={albumMusica} />
                    <TouchableOpacity
                        style={estilo.btnenviar}
                        onPress={() => {
                            alterarMusica(id, nomeMusica, autorMusica, albumMusica);
                        }}>
                        <Text style={estilo.btntxtenviar}> Alterar </Text>
                    </TouchableOpacity>
                </View>
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
            marginVertical: 10,
            marginHorizontal: 10,
            backgroundColor:'#87CEFA',
            paddingHorizontal: 20,
            paddingVertical: 10,
            fontSize: 15,
            borderRadius: 10,
        },
        btnenviar: {
            marginTop: 20,
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