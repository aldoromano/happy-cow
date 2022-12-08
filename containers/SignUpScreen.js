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
export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    // FRONT on vérifie que tous les champs soient renseignés
    if (!email || !userName || !password || !confirmPassword || !description) {
      setError("Remplir tous les champs");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mdp différents!");
      return;
    }

    try {
      const response = await axios.post(
        //"https://bf34-193-252-55-178.eu.ngrok.io/user/signup",
        "site--happy-cow-backend--7j9qcvd6v4p4.code.run/user/signup",
        {
          email: email,
          username: userName,
          password: password,
          description: description,
        }
      );
      console.log(response.data);
      setToken(response.data.token);
      //   setId(response.data._id);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Email: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email"
          autoCapitalize="none"
        />

        <Text style={styles.text}>Username: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUserName(text)}
          value={userName}
          placeholder="username"
          autoCapitalize="none"
        />

        <Text style={styles.text}>Password: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry
        />

        <Text style={styles.text}>Confirm assword: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry
        />

        <Text style={styles.text}>Description: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDescription(text)}
          value={description}
          placeholder="passwdescriptionord"
          autoCapitalize="none"
        />

        <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>
        <TouchableOpacity style={styles.btn} onPress={submit}>
          <Text>Sign up</Text>
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
    height: 30,
    width: 300,
    // marginTop: 10,
  },

  text: {
    marginTop: 30,
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
