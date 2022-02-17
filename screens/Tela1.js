import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Image, TouchableOpacity, View, Dimensions } from 'react-native';

export default function Tela1({ navigation }) {

    const clickHandler = () => {
        navigation.navigate('Tela2') 
     };


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

    return (
        <View>
               <MapView style={styles.mapa} onPress={(event) => {
        setLatitude(event.nativeEvent.coordinate.latitude)
        setLongitude(event.nativeEvent.coordinate.longitude)
      }}>
        <Marker 
          coordinate={{ latitude: latitude, longitude: longitude }}/> 
                    {
                        markers.map((marker, id) => <Marker
                            key={id}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            title={marker.title}
                            description={marker.description} />
                        )
                    }
                </MapView>

                <TouchableOpacity
          activeOpacity={1}
          onPress={ clickHandler }
          style={styles.touchableOpacityStyle}>
          <Image
            source={{
              uri:
                'https://developerplus.com.br/wp-content/uploads/2021/12/plus_icon.png',
            }}
            style={styles.floatingButtonStyle}
          />
      </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapa: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    touchableOpacityStyle: {
    width: 40,
    height: 30,
    right: 40,
    bottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  floatingButtonStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',

  },
  });
