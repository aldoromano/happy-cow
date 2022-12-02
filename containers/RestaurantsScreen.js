import {
  View,
  ScrollView,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/core";

import { useState, useEffect } from "react";
import Constants from "expo-constants";
import { Picker } from "@react-native-picker/picker";
import { getDistance } from "geolib";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

// Composants
import MapScreen from "../components/MapScreen";

export default function RestaurantsScreen({ restaurants }) {
  //console.log("Restaurants -> ", restaurants.length);
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [dataLength, setDataLength] = useState(restaurants.length);
  const [data, setData] = useState(restaurants);
  const [newRestaurants, setNewRestaurants] = useState([]);
  const [action, setAction] = useState({});
  const [selectedValue, setSelectedValue] = useState("All");
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();

  // Maximum de restaurants par page
  const MAXROWPAGES = 5;

  /*
   * Rendu de l'affichage des restaurants
   */
  const renderItem = ({ item }) => {
    return (
      <View key={item.placeId} style={styles.lineContainer}>
        {item.thumbnail && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("Restaurant", { id: item.placeId })
            }
          >
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.thumbnailContainer}
            />
          </TouchableOpacity>
        )}
        <View style={styles.informationContainer}>
          <View style={styles.detailContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textRestaurant}>{item.name}</Text>
              <Text style={styles.defaultText}>{item.address}</Text>
            </View>
            <View style={styles.additionalInformationContainer}>
              <Text style={styles.defaultText}>{item.price}</Text>
              <Text style={styles.defaultText}>{item.type}</Text>
              <Text style={styles.defaultText}>
                {(
                  getDistance(
                    { latitude: coords.latitude, longitude: coords.longitude },
                    {
                      latitude: item.location.lat,
                      longitude: item.location.lng,
                    }
                  ) / 1000
                ).toFixed(2) + " Km"}
              </Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{ width: 280, fontSize: 11, color: "grey" }}
            >
              {item.description}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    console.log("useEffect -> ", action);
    const loadData = () => {
      if (action.action === "P" && action.value == "-") {
        const page = pageNumber > 1 ? pageNumber - 1 : pageNumber;
        setPageNumber(page);
        setNewRestaurants(
          data.slice(
            (page - 1) * MAXROWPAGES,
            (page - 1) * MAXROWPAGES + MAXROWPAGES
          )
        );
      } else if (action.action === "P" && action.value === "+") {
        const page =
          pageNumber * MAXROWPAGES > dataLength ? pageNumber : pageNumber + 1;
        console.log("page -> ", page, " - ", newRestaurants.length);
        setPageNumber(page);
        const tab = data.slice(
          (page - 1) * MAXROWPAGES,
          (page - 1) * MAXROWPAGES + MAXROWPAGES
        );
        console.log(" Nbre éléments Tab -> ", tab.length);
        console.log(" slice deb -> ", (page - 1) * MAXROWPAGES);
        console.log(" slice fin -> ", (page - 1) * MAXROWPAGES + MAXROWPAGES);
        setNewRestaurants(tab);
      } else if (action.action === "List" && action.value !== "All") {
        const data = restaurants.filter((elem) =>
          elem.type.toLowerCase().includes(action.value.toLowerCase())
        );
        console.log("Taille data ->> ", data.length);
        setData(data);
        setDataLength(data.length);
        if (data.length > MAXROWPAGES) {
          setNewRestaurants(data.slice(0, MAXROWPAGES));
        } else {
          setNewRestaurants(data);
        }
      } else {
        if (searchText) {
          const data = restaurants.filter((elem) =>
            elem.name.includes(searchText)
          );
          setData(data);
          setDataLength(data.length);

          if (data.length > MAXROWPAGES) {
            setNewRestaurants(data.slice(0, MAXROWPAGES));
          } else {
            setNewRestaurants(data);
          }
          // setNewRestaurants(
          //   data.slice(
          //     (pageNumber - 1) * MAXROWPAGES,
          //     (pageNumber - 1) * MAXROWPAGES + MAXROWPAGES
          //   )
          // );
        } else {
          setNewRestaurants(restaurants.slice(0, MAXROWPAGES));
          setDataLength(restaurants.length);
          setData(restaurants);
        }
      }
    };
    loadData();
  }, [searchText, action]);

  useEffect(() => {
    console.log("Use effect bis !");
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
  //console.log("newR -> ", newRestaurants.length);

  return isLoading ? (
    <ActivityIndicator size="large" color="purple" style={{ marginTop: 100 }} />
  ) : error ? (
    <Text>Permission refusée</Text>
  ) : (
    <View>
      <ScrollView horizontal>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          placeholder="Que cherchez-vous ?"
        ></TextInput>
        <TouchableOpacity
          style={styles.pagination}
          onPress={() => {
            setAction({ action: "P", value: "-" });
          }}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <Text>
          {pageNumber} / {Math.ceil(dataLength / MAXROWPAGES)}
        </Text>
        <TouchableOpacity
          style={styles.pagination}
          onPress={() => {
            setAction({ action: "P", value: "+" });
          }}
        >
          <Text>+</Text>
        </TouchableOpacity>

        <Picker
          selectedValue={selectedValue}
          // style={{ height: 20, width: 100 }}
          itemStyle={{ height: 70, backgroundColor: "yellow" }}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            setAction({ action: "List", value: itemValue });
          }}
        >
          <Picker.Item
            style={{ fontSize: 11, height: 10 }}
            label="All"
            value="All"
          />
          <Picker.Item
            style={{ fontSize: 11, height: 10 }}
            label="Vegan"
            value="Vegan"
          />
          <Picker.Item
            style={{ fontSize: 11, height: 10 }}
            label="Veg Store"
            value="Veg Store"
          />
          <Picker.Item
            style={{ fontSize: 11, height: 10 }}
            label="Vegetarian"
            value="Vegetarian"
          />
        </Picker>
      </ScrollView>

      {/* Affichage de la carte  */}
      <MapScreen restaurants={newRestaurants} />

      {/* Affichage des restaurants */}
      <View style={styles.container}>
        <FlatList
          data={newRestaurants}
          keyExtractor={(item) => String(item.placeId)}
          renderItem={renderItem}
          style={styles.flatlist}
        />

        {/* {restaurants.map((restaurant) => {
          //console.log("Blc >>", restaurant);
          return (
            <View key={restaurant.placeId}>
              <View style={styles.lineContainer}>
                {restaurant.thumbnail && (
                  <Image
                    source={{ uri: restaurant.thumbnail }}
                    style={styles.thumbnailContainer}
                  />
                )}
                <View style={styles.informationContainer}>
                  <View style={styles.detailContainer}>
                    <View style={styles.textContainer}>
                      <Text style={styles.textRestaurant}>
                        {restaurant.name}
                      </Text>
                      <Text style={styles.defaultText}>
                        {restaurant.address}
                      </Text>
                    </View>
                    <View style={styles.additionalInformationContainer}>
                      <Text style={styles.defaultText}>{restaurant.price}</Text>
                      <Text style={styles.defaultText}>{restaurant.type}</Text>
                    </View>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{ width: 280, fontSize: 11, color: "grey" }}
                    >
                      {restaurant.description}
                    </Text>

                  </View>
                </View>
              </View>
            </View>
          );
        })} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 20,
  },

  input: {
    borderColor: "#ffbac0",
    borderWidth: 1,
    height: 20,
    width: 180,
    borderRadius: 5,
    backgroundColor: "white",
    marginLeft: 5,
  },

  pagination: {
    borderColor: "#ffbac0",
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 5,
    height: 20,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  picker: {
    height: 10,
    width: 100,
    borderColor: "red",
    borderWidth: 1,
    fontSize: 8,
    // backgroundColor: "yellow",
    padding: 0,
  },

  lineContainer: {
    height: 100,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },

  thumbnailContainer: {
    height: 100,
    width: 100,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },

  descriptionContainer: {
    width: Dimensions.get("window").width - 120,
    borderWidth: 1,
    borderColor: "red",
  },

  informationContainer: {
    width: Dimensions.get("window").width - 120,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "blue",
  },

  detailContainer: {
    flexDirection: "row",
  },

  textContainer: {
    width: Dimensions.get("window").width - 220,
    borderColor: "black",
    borderWidth: 1,
  },

  textRestaurant: {
    fontWeight: "bold",
  },

  defaultText: {
    fontSize: 11,
    color: "grey",
  },

  additionalInformationContainer: {
    width: 100,
    alignItems: "flex-end",
    paddingRight: 10,
  },

  flatlist: {
    height:
      Dimensions.get("window").height - 300 - Constants.statusBarHeight - 40,
  },
});
