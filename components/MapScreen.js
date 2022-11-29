import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

export default function MapScreen({ restaurants }) {
  console.log("restaurants (nbre) -> ", restaurants.length);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});

        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        //console.log(" coordonnées -> ", obj.latitude, " - ", obj.longitude);

        setCoords(obj);
      } else {
        setError(true);
      }
      setIsLoading(false);
    };

    askPermission();
  }, []);

  //console.log(" coordonnées bis -> ", coords.latitude, " - ", coords.longitude);

  return isLoading ? (
    <ActivityIndicator size="large" color="purple" style={{ marginTop: 100 }} />
  ) : error ? (
    <Text>Permission refusée</Text>
  ) : (
    <View style={styles.container}>
      <View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation={true}
        >
          {restaurants.map((restaurant) => {
            // console.log("bcl -> ", index);

            return (
              <Marker
                key={restaurant.placeId}
                coordinate={{
                  latitude: restaurant.location.lat,
                  longitude: restaurant.location.lng,
                }}
                title={restaurant.name}
                description={restaurant.description}
                // image={<AntDesign name="flag" size={24} color="black" />}
              />
            );
          })}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    // width: Dimensions.get("window").width,

    height: 300,
    width: 400,
  },
});
