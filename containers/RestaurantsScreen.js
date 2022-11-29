import {
  View,
  ScrollView,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
} from "react-native";

import { useState } from "react";
import Constants from "expo-constants";

// Composants
import MapScreen from "../components/MapScreen";

export default function RestaurantsScreen({ restaurants }) {
  // console.log("Restaurants -> ", restaurants.length);

  const [searchText, setSearchText] = useState("");

  const renderItem = ({ item }) => {
    return (
      <View key={item.placeId} style={styles.lineContainer}>
        {item.thumbnail && (
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.thumbnailContainer}
          />
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

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        placeholder="Que cherchez-vous ?"
      ></TextInput>
      <MapScreen restaurants={restaurants} />
      <View style={styles.container}>
        <FlatList
          data={restaurants}
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
  input: {
    borderColor: "#ffbac0",
    borderWidth: 1,
    height: 40,
    width: 200,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
