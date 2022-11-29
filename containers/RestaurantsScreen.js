import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

import MapScreen from "./MapScreen";
export default function RestaurantsScreen({ restaurants }) {
  // console.log("Restaurants -> ", restaurants.length);
  return (
    <View>
      <MapScreen></MapScreen>
      <ScrollView>
        <View style={styles.container}>
          <Text>This is the HomeScreen component</Text>
          {restaurants.map((restaurant) => {
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
                        <Text style={styles.defaultText}>
                          {restaurant.price}
                        </Text>
                        <Text style={styles.defaultText}>
                          {restaurant.type}
                        </Text>
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
                      {/* <Text>xxx</Text> */}
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
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

  lineContainer: {
    height: 100,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    margin: 5,
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
});
