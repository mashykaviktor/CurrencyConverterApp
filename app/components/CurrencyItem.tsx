import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { CurrencyCardProps } from "./CurrencyCard";
import type { RootStackParams } from "../_layout";

export interface CurrencyItemProps {
  item: CurrencyCardProps;
}

const CurrencyItem = ({ item }: CurrencyItemProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

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

export default React.memo(CurrencyItem);

const styles = StyleSheet.create({
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
