import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useEffect, useState } from "react";
import restaurants from "./assets/restaurants.json";

// Containers
import RestaurantsScreen from "./containers/RestaurantsScreen";
import RestaurantScreen from "./containers/RestaurantScreen";
import SplashScreen from "./containers/SplashScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import FavoritesScreen from "./containers/FavoritesScreen";
import CarrouselScreen from "./containers/CarrouselScreen";
import LogoutScreen from "./containers/LogoutScreen";

// Icônes
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

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

  console.log("userToken ->> ", userToken);
  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userToken ? (
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
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: "Explorer",
                          headerStyle: { backgroundColor: "red" },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {() => (
                          <RestaurantsScreen
                            restaurants={restaurants.slice(0, 100)}
                            userToken={userToken}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Restaurant"
                        options={{
                          title: "Restaurant",
                          headerStyle: { backgroundColor: "orange" },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {() => <RestaurantScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Carrousel"
                        options={{
                          title: "Carrousel",
                          headerStyle: { backgroundColor: "violet" },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {() => <CarrouselScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="TabFavorites"
                  options={{
                    tabBarLabel: "Favorites",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Favorites"
                        options={{
                          title: "Favoris",
                          headerStyle: { backgroundColor: "blue" },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {() => <FavoritesScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="tabLogout"
                  options={{
                    tabBarLabel: "Logout",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="logout"
                        options={{
                          title: "Logout",
                          headerStyle: { backgroundColor: "blue" },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {() => <LogoutScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
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
