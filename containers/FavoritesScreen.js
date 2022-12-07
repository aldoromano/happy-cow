import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

import axios from "axios";

export default function FavoriteScreen({ userToken }) {
  console.log("FavoriteScreen ->> ", userToken);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("useEffect Favorites ->> ", userToken);
    try {
      const loadData = async () => {
        const response = await axios.get("/user/favorites?token=" + userToken);
        setData(response.data);
      };

      loadData();
      setIsLoading(false);
    } catch (error) {
      console.log("Erreur détectée ->> ", error.message);
    }
  }, []);

  const renderItem = (item) => {
    <View>
      <Text>{item.name}</Text>
    </View>;
  };

  return isLoading ? (
    <ActivityIndicator></ActivityIndicator>
  ) : (
    <View style={StyleSheet.container}>
      <FlatList
        data={data}
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
    justifyContent: "center",
    alignItems: "center",
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
