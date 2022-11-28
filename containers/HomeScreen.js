import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <View style={styles.box}></View>
    <Text>This is the HomeScreen component</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    height: 100,
    width: 150,
    backgroundColor: "blue",
  },
});
