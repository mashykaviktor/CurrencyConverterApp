import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export interface CurrencyCardProps {
  flag: string;
  code: string;
  name?: string;
  label: string;
  value: string;
  onChangeText?: (input: string) => void;
  editable: boolean;
}

const CurrencyCard = ({
  flag,
  code,
  label,
  value,
  onChangeText,
  editable,
}: CurrencyCardProps) => (
  <View style={styles.cardContainer}>
    <View style={styles.cardDetails}>
      <Text style={styles.flagText}>{flag || ""}</Text>
      <Text style={styles.cardCode}>{code || ""}</Text>
    </View>
    <View style={styles.cardValue}>
      <Text style={styles.labelText}>{label}</Text>
      {editable ? (
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={value}
          placeholder="0.00"
          onChangeText={onChangeText}
          autoFocus
        />
      ) : (
        <Text style={styles.valueText}>{value}</Text>
      )}
    </View>
  </View>
);

export default React.memo(CurrencyCard);

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#9299A5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "40%",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderColor: "#9299A5",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  flagText: {
    fontSize: 32,
  },
  cardCode: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  cardValue: {
    flex: 1,
    gap: 2,
    paddingHorizontal: 16,
    width: "60%",
  },
  labelText: {
    fontSize: 14,
    color: "#888",
  },
  input: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    borderColor: "#DADADA",
    paddingVertical: 4,
  },
  valueText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
