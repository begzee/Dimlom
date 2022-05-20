import * as React from 'react';
import MapView, { Callout, Circle } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Button } from 'react-native-web';

export default function App(props) {
  const [pin, setPin] = React.useState({
    latitude: 47.919389001360585, 
    longitude: 106.9176252844968,
  })
  const [regoin, setRegoin] = React.useState({
    latitude: 47.919389001360585, 
    longitude: 106.9176252844968,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        GooglePlacesDetailsQuery={{
          rankby: "distance"
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          setRegoin({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          })
        }}
        query={{
          key: 'AIzaSyCvLSHVNa5VNe37zajq0VPbQbyUKFru95E',
          language: 'en',
          components: "country:us",
          type: "establishment",
          radius: 30000,
          location:  `${regoin.latitude}, ${regoin.longitude}`
        }}
        styles={{
          container: {position: 'absolute' ,width: "90%", zIndex: 1},
          listView: { backgroundColor: "black"}
        }}
      />
      <MapView style={styles.map} 
      initialRegion={{
        latitude: 47.919389001360585, 
        longitude: 106.9176252844968,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.1421,
          }}
          provider="google"
      >
        <Marker coordinate={{ latitude: regoin.latitude, longitude: regoin.longitude}}></Marker>
        <Marker coordinate={pin}
        pinColor="#d35400"
        draggable={true}
        onDragStart={(e) => {
          console.log("тэмдэглэгээ эхлэл", e.nativeEvent.coordinates)
        }}
        onDragEnd={(e) => {
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          })
        }}
        >
          <Callout>
            <Text>Тэмдэглэгээ</Text>
          </Callout>
        </Marker>
        {/* <Circle
          center={pin} radius={1000}
        /> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // position: "relative"

  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    
  },
});