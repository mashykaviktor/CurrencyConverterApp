import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import fetchCurrency from "./api/fetchCurrency";

export default function Home() {
  const navigation = useNavigation();

  const [text, setText] = useState("");
  const [currencies, setCurrencies] = useState([]);

  const onChangeText = (input) => {
    setText(input);
  };

  useEffect(() => {
    (async () => {
      const data = await fetchCurrency();
      console.log("data => ", data);
      if (data) setCurrencies(data);
    })();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.currencyButton}
        onPress={() => navigation.navigate("card", { item })}
      >
        <View style={styles.currencyWrapper}>
          <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>
            <Text>{item.flag || ""}</Text>
            <Text>{item.code || ""}</Text>
            <Text>{item.name || ""}</Text>
          </View>
          <MaterialIcons name="chevron-right" size={16} color="black" />
        </View>
      </TouchableOpacity>
    );
  };

  const filteredCurrencies =
    currencies.filter((el) =>
      el?.code?.toLowerCase().includes(text.toLowerCase())
    ) || [];

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View style={styles.innerContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="search"
              size={24}
              color="black"
              style={{ position: "absolute", left: 5 }}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeText}
              value={text}
            />
          </View>
          <Text style={{ fontWeight: 600 }}>All currencies</Text>
          <FlatList
            data={filteredCurrencies}
            renderItem={renderItem}
            keyExtractor={(item) => item.code}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    gap: 16,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    height: 50,
    padding: 10,
    paddingLeft: 32,
  },
  currencyButton: {
    flex: 1,
  },
  currencyWrapper: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
});
