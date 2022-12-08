import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import Constants from "expo-constants";

import axios from "axios";

export default function FavoriteScreen({ userToken }) {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const loadData = async () => {
        console.log("loadData !");
        const response = await axios.post(
          // "https://bf34-193-252-55-178.eu.ngrok.io/user/favorites",
          "site--happy-cow-backend--7j9qcvd6v4p4.code.run/user/favorites",
          {
            token: userToken,
          }
        );
        console.log("Réponse : ", response.data);
        setData(response.data);
        setIsLoading(false);
      };

      loadData();
    } catch (error) {
      console.log("Erreur détectée ->> ", error.message);
    }
  }, [isFocused]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.imageRestaurant}
        />
        <Text style={styles.textName}>{item.name}</Text>
        <Text style={styles.textAddress}>{item.address}</Text>
      </View>
    );
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
    borderRadius: 10,
  },

  textName: {
    fontWeight: "bold",
    fontSize: 12,
    width: Dimensions.get("window").width / 3,
  },

  textAddress: {
    fontSize: 10,
    width: Dimensions.get("window").width / 3,
  },
});
