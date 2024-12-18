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
      if (data) setCurrencies(data);
    })();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.currencyLink}
        onPress={() => navigation.navigate("converter", { item })}
      >
        <View style={styles.currencyWrapper}>
          <View style={styles.currencyDetailsWrapper}>
            <Text style={[styles.currencyDetailText, { fontSize: 32 }]}>
              {item.flag || ""}
            </Text>
            <Text style={styles.currencyDetailText}>{item.code || ""}</Text>
            <Text
              style={[
                styles.currencyDetailText,
                { fontSize: 16, fontWeight: "300" },
              ]}
            >
              {item.name || ""}
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="black" />
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
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeText}
              value={text}
              placeholder="Search currencies"
              placeholderTextColor="#AAA"
            />
            <MaterialIcons
              name="search"
              size={24}
              color="#999"
              style={styles.searchIcon}
            />
          </View>
          <Text style={styles.currencyDetailText}>All currencies</Text>
          <FlatList
            data={filteredCurrencies}
            renderItem={renderItem}
            keyExtractor={(item) => item.code}
            ListEmptyComponent={
              <Text style={styles.currencyText}>
                No currencies found. Please, try again.
              </Text>
            }
            initialNumToRender={20}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 16,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 40,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchWrapper: {
    position: "relative",
    height: 50,
  },
  searchIcon: {
    position: "absolute",
    left: 10,
    top: 13,
  },
  currencyLink: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  currencyWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currencyText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  currencyDetailsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  currencyDetailText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
});
