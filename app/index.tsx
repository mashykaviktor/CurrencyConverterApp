import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import fetchCurrency from "./api/fetchCurrency";
import CurrencyItem from "./components/CurrencyItem";
import type { CurrencyItemProps } from "./components/CurrencyItem";
import { CurrencyCardProps } from "./components/CurrencyCard";

export default function Home() {
  const [text, setText] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = useCallback((input: string) => {
    setText(input);
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetchCurrency();
      if (data) setCurrencies(data);
      setLoading(false);
    })();
  }, []);

  const renderItem = ({ item }: CurrencyItemProps) => (
    <CurrencyItem item={item} />
  );

  const filteredCurrencies =
    currencies.filter((el: CurrencyCardProps) =>
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
              onChangeText={handleSearch}
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
          <Text style={styles.currencyListTitle}>All currencies</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#2979F2" />
          ) : (
            <FlatList
              data={filteredCurrencies}
              renderItem={renderItem}
              keyExtractor={(item) => item.code}
              ListEmptyComponent={
                <Text style={styles.currencyText}>
                  No currencies found. Please try again.
                </Text>
              }
              initialNumToRender={20}
            />
          )}
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
  currencyText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  currencyListTitle: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
});
