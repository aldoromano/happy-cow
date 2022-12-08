import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    // FRONT on vérifie que tous les champs soient renseignés
    if (!email || !password) {
      setError("Remplir tous les champs");
      return;
    }

    try {
      const response = await axios.post(
        // "https://bf34-193-252-55-178.eu.ngrok.io/user/login",
        "https://site--happy-cow-backend--7j9qcvd6v4p4.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );

      setToken(response.data.token);
      //   setId(response.data.id);
    } catch (error) {
      console.log("Erreur détectée ->> ", error.message);
    }
  };

  console.log("SignIn :");
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ marginTop: 55 }}>Email: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email"
          autoCapitalize="none"
        />
        <Text style={{ marginTop: 35 }}>Password: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          placeholder="password"
          secureTextEntry={true}
          value={password}
          autoCapitalize="none"
        />
        <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>
        <TouchableOpacity style={styles.btn} onPress={submit}>
          <Text>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    borderBottomColor: "#ffbac0",
    borderBottomWidth: 2,
    height: 40,
    width: 300,
    // marginTop: 40,
  },

  btn: {
    borderColor: "#ffbac0",
    borderWidth: 3,
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    margin: 40,
    borderRadius: 10,
  },
});
