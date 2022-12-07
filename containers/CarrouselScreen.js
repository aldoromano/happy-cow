import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Constants from "expo-constants";

export default function () {
  const { params } = useRoute();

  //   console.log("params -> ", params);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.imageRestaurant} />
      </View>
    );
  };

  return (
    <View style={StyleSheet.container}>
      <FlatList
        data={params.pictures}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
        style={styles.flatlist}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
  },

  flatlist: {
    // height: Dimensions.get("window").height - Constants.statusBarHeight - 49,
    width: Dimensions.get("window").width,
    flexWrap: "wrap",
  },

  imageContainer: {
    borderWidth: 1,
    borderColor: "white",
  },

  imageRestaurant: {
    height:
      (Dimensions.get("window").height - Constants.statusBarHeight - 75) / 5,
    width: Dimensions.get("window").width / 3,
  },
});
