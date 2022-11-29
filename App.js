import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import restaurants from "./assets/restaurants.json";

// Containers
import RestaurantsScreen from "./containers/RestaurantsScreen";
import SplashScreen from "./containers/SplashScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  // MAJ Token User
  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    try {
      // Fetch the token from storage then navigate to our appropriate place
      const checkIfATokenExist = async () => {
        // We should also handle error for production apps
        const userToken = await AsyncStorage.getItem("userToken");
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        setUserToken(userToken);
        setIsLoading(false);
      };

      checkIfATokenExist();
    } catch (error) {
      console.log("Erreur >> ", error.message);
    }
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn">
              {() => <SignInScreen setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {() => <SignUpScreen setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Home">
            {() => <RestaurantsScreen restaurants={restaurants.slice(0, 10)} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
