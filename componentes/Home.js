import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { firestore } from "../Firebase"; 
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 

export default function Home({ navigation }) {
    const [musicas, setmusicas] = useState([]);

    async function deleteCripto(id) {
        try {
            await deleteDoc(doc(firestore, 'Músicas', id));
            Alert.alert("A música foi deletada.");
        } catch (error) {
            console.error("Erro ao deletar.", error);
        }
    }

    useEffect(() => {
        const unsubcribe = onSnapshot(collection(firestore, 'Músicas'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({ ...doc.data(), id: doc.id });
            });
            setmusicas(lista);
        });
        return () => unsubcribe();
    }, []);

    return (
        <ImageBackground 
            source={require('../componentes/imagens/rave.jpg')} // Altere o caminho para o local correto da imagem
            style={estilo.container}
            resizeMode="cover"
        >
            <View>
                <Text style={estilo.titulo}>Lista de Músicas</Text>
            </View>
            <FlatList 
                data={musicas}
                renderItem={({ item }) => {
                    return (
                        <View style={estilo.musicas}>
                            <TouchableOpacity onPress={() => navigation.navigate("Alterar", {
                                id: item.id,
                                NomeMusica: item.nomeMusica,
                                AutorMusica: item.autorMusica,
                                AlbumMusica: item.albumMusica
                            })}>
                                <View style={estilo.itens}>
                                    <Text>Nome: <Text>{item.nomeMusica}</Text></Text>
                                    <Text>Autor: <Text>{item.autorMusica}</Text></Text>
                                    <Text>Álbum: <Text>{item.albumMusica}</Text></Text>
                                </View>
                            </TouchableOpacity>
                            <View style={estilo.botaodeletar}>
                                <TouchableOpacity onPress={() => { deleteCripto(item.id) }}>
                                    <Text>X</Text>
                                </TouchableOpacity>    
                            </View>    
                        </View>    
                    );
                }}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Cadastrar")}>
                <Text>+</Text>
            </TouchableOpacity>
        </ImageBackground >
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        marginTop: 50,
        fontSize: 30,
        color: '#87CEFA', 
        backgroundColor:'black',
        border:'#87CEFA',
        borderRadius:5,
    },
    itens: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
    },
    musicas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#87CEFA',
        borderRadius: 10,
    },
    botaodeletar: {
        textAlignVertical: 'center',
        marginVertical: 20,
    },
    addbutton: {
        backgroundColor: '#ffffff',
        borderRadius: 50,
        position: 'absolute',
        left: 20,
        bottom: 40,
        justifyContent: "center",
        alignItems: "center",
    },
});
