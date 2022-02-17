import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Dimensions, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';


export default function Tela2( { navigation } ) { 
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [markers, setMarker] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);


  useEffect(function () {
    async function fetchData() {
        const response = await fetch('https://mobile.ect.ufrn.br:3003/markers', {
            headers: {
                Authorization: 'Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF'
            }
        });
        const markers = await response.json();
        console.log(markers);
        setMarker(markers);
    }
    fetchData();
}, []);


  function Enviar() {
     fetch("https://mobile.ect.ufrn.br:3003/markers", {
        method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF",
          },
          body: JSON.stringify({
            latitude: latitude,
            longitude: longitude,
            title: titulo,
            description: descricao,
          }),
      }).then( alert('Seu marcador foi adicionado com sucesso!')
      )
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container1}>
      <MapView style={styles.mapa} onPress={(event) => {
            setLatitude(event.nativeEvent.coordinate.latitude)
            setLongitude(event.nativeEvent.coordinate.longitude)
            }}>
            <Marker 
              coordinate={{ latitude: latitude, longitude: longitude }}
              title={titulo}
              description={descricao}
            /> 
            {
              markers.map((marker, id) => <Marker
                key={id}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title= {marker.title}
                description= {marker.description}
              />)
            }
          </MapView>
      </ScrollView>

      <ScrollView style={styles.container2}>
          <View style={styles.form_container}>
            <TextInput style={styles.input} placeholder= 'Título' value={titulo} onChangeText={setTitulo} />
            <TextInput style={styles.input} placeholder= 'Descrição' value={descricao} onChangeText={setDescricao} />
            <TouchableOpacity style={styles.botaoAdicionar} onPress={ () => Enviar() }>
               <Text >
                 Adicionar
               </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    container1: {
      height: 400,
    },
    form_container: {
      backgroundColor: 'white',
      margin: 40,
    },
    input: {
      height: 40,
      marginBottom: 10,
      borderWidth: 2,
      backgroundColor: 'white',
    },
    botaoAdicionar: {
      width:330,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      padding: 15,
      backgroundColor: 'green'
    },
    mapa: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },

  });