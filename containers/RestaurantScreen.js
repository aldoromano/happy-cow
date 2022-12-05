import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import restaurants from "../assets/restaurants.json";
import Constants from "expo-constants";
import { FontAwesome } from "@expo/vector-icons";

import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import MapScreen from "../components/MapScreen";
import getStars from "../components/Stars";

export default function RestaurantScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();

  const restaurant = restaurants.filter((elem) => elem.placeId === params.id);

  /*
   * Gestion des favoris
   */
  const handleFavorite = (action) => {
    alert("Clic favoris, action >> ", action);
  };

  // console.log("placeId -> ", params.id, " / ", params.distance);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.restaurantContainer}>
          <View style={styles.imagesContainer}>
            <Image
              source={{ uri: restaurant[0].thumbnail }}
              // resizeMode={"contain"}
              style={styles.restaurantMainImage}
            ></Image>
            <View style={styles.restaurantOtherImageContainer}>
              <View style={styles.restaurantOtherImage1Container}>
                <Image
                  source={{ uri: restaurant[0].pictures[0] }}
                  style={styles.restaurantOtherImage1}
                ></Image>
              </View>
              <View style={styles.restaurantOtherImage2Container}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Carrousel", {
                      pictures: restaurant[0].pictures,
                    });
                  }}
                >
                  <Image
                    source={{ uri: restaurant[0].pictures[1] }}
                    style={styles.restaurantOtherImage2}
                  ></Image>
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.numberPhotos}>
                      +{restaurant[0].pictures.length}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.whiteText}>{restaurant[0].name}</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                handleFavorite("Delete");
              }}
            >
              <FontAwesome name="heart-o" size={24} color="grey" />
            </TouchableOpacity>

            <View>
              <Text style={styles.whiteText}>{restaurant[0].type}</Text>
            </View>
          </View>

          <View style={styles.textContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.whiteText}>
                {getStars(restaurant[0].rating)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.favoriteContainer}
              onPress={() => {
                handleFavorite("Add");
              }}
            >
              <Text style={styles.whiteText}>Ajouter à vos Favoris</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.whiteText}>{params.distance}</Text>
            </View>
          </View>
          {/* <Text>Truc</Text> */}
        </View>
        <View style={styles.mediumContainer}>
          <View style={styles.textMediumContainer}>
            <Text style={styles.textMedium}>AJOUTER UN AVIS</Text>
            <Text style={styles.textMedium}>AJOUTER UNE PHOTO</Text>
            <Text style={styles.textMedium}>APPELER</Text>
          </View>
          <Text style={styles.textMedium}>{restaurant[0].description}</Text>
        </View>
        <View style={styles.mapContainer}>
          <MapScreen restaurants={restaurant}></MapScreen>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  restaurantContainer: {
    backgroundColor: "#1FAE9E",
    height:
      (Dimensions.get("window").height - Constants.statusBarHeight - 49) / 3,
    width: Dimensions.get("window").width,
    //alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  imagesContainer: {
    height: "80%",
    width: "100%",
    //backgroundColor: "black",
    flexDirection: "row",
  },

  restaurantMainImage: {
    height: "100%",
    flex: 4,
  },

  restaurantOtherImageContainer: {
    height: "100%",
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: "white",
  },

  restaurantOtherImage1Container: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
    height: "50%",
  },
  restaurantOtherImage1: {
    height: "100%",
    width: "100%",
  },

  restaurantOtherImage2Container: {
    height: "50%",
  },
  restaurantOtherImage2: {
    height: "100%",
    width: "100%",
  },

  numberPhotos: {
    fontSize: 25,
    color: "white",
  },

  nameContainer: { justifyContent: "flex-start" },

  whiteText: {
    color: "white",
    fontSize: 12,
  },

  textContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  favoriteContainer: {
    borderColor: "orange",
    borderWidth: 1,
    backgroundColor: "orange",
    paddingLeft: 10,
    paddingRight: 10,
  },

  mediumContainer: {
    backgroundColor: "#FFFFFF",
    width: Dimensions.get("window").width,
    height:
      (Dimensions.get("window").height - Constants.statusBarHeight - 49) / 4,
  },

  textMediumContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    padding: 15,
  },

  textMedium: { padding: 10, fontSize: 12 },

  mapContainer: {
    backgroundColor: "yellow",
    // height:
    //   (Dimensions.get("window").height - Constants.statusBarHeight - 49) / 3,
    height: "100%",
    width: Dimensions.get("window").width,
  },
});
