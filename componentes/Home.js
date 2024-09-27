import React,{ useEffect, useState } from "react";
import { View,Text,StyleSheet,FlatList, TouchableOpacity,Alert } from "react-native";
import { firestore } from "../Firebase"; 
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 

export default function Home({navigation}) {
           
    const [musicas, setmusicas] = useState([]);

    async function deleteCripto(id) {
        try{
            await deleteDoc(doc(firestore,'Músicas',id));
            Alert.alert("A musica foi deletada.")
        }catch(error){
            console.error("Erro ao deletar.", error)
        }
    }
       
    useEffect(()=>{
        const unsubcribe = onSnapshot(collection(firestore,'Músicas'),(querySnapshot)=>{
            const lista = [];
            querySnapshot.forEach((doc)=>{
                lista.push({...doc.data(), id: doc.id});
            });
            setmusicas(lista);
        });
        return () => unsubcribe();
    },[]);

    return(
        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo} >Lista de Musicas</Text>
            </View>
            <FlatList 
                data={musicas}
                renderItem={({item})=>{
                    return(
                        <View style={estilo.musicas}>
                            <TouchableOpacity onPress={()=>navigation.navigate("Alterar",{
                                id: item.id,
                                NomeMusica: item.NomeMusica,
                                AutorMusica: item.AutorMusica,
                                AlbumMusica: item.AlbumMusica
                            })}>
                                <View style={estilo.itens}>
                                    <Text> Nome: <Text>{item.NomeMusica}</Text></Text>
                                    <Text> Autor: <Text>{item.AutorMusica}</Text></Text>
                                    <Text> Album: <Text>{item.AlbumMusica}</Text></Text>
                                </View>
                            </TouchableOpacity>
                            <View style={estilo.botaodeletar}>
                                <TouchableOpacity onPress={()=>{deleteCripto(item.id)}}>
                                <Text>X</Text>
                                </TouchableOpacity>    
                            </View>    
                        </View>    
                    );
                }}
            />
            <TouchableOpacity onPress={()=> navigation.navigate("Cadastrar")}>
                <Text>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const estilo = StyleSheet.create({
    container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    titulo:{
      marginTop: 50,
      fontSize:30,
    },
    itens:{
      marginHorizontal: 10,
      marginVertical: 10,
      padding: 10,
     
    },
    titulomusicas:{
    fontSize: 13,
    color:'#fff'
    },
    textomusicas:{
    fontSize: 20,
    fontWeight: "bold",
    },
    musicas:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 10,
      marginVertical: 10,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius:10
    },
    botaodeletar:{
      textAlignVertical: 'center',
      marginVertical: 20
    },
    addbutton:{
    backgroundColor: '#ffffff',
    borderRadius: 50,
    position: 'absolute',
    left: 20,
    bottom: 40,
    justifyContent: "center",
    alignItems: "center"
    }
    });