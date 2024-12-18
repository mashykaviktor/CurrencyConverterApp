import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const uk = {
  name: "British Pound",
  flag: "🇬🇧",
  code: "GBP",
  rate: 1,
};

export default function Converter() {
  const route = useRoute();
  const [value, setValue] = useState(0);

  const { flag, code, rate } = route?.params?.item || {};
  const numericValue = parseFloat(value) || 0;
  const currencyExchange = (numericValue * rate).toFixed(2);

  const onChangeText = (input) => {
    // Remove non-numeric characters and ensure valid numeric input
    const sanitizedInput = input.replace(/[^0-9.]/g, "");
    // Restrict to two decimal places
    const formattedInput = sanitizedInput.replace(
      /^(\d+(\.\d{0,2})?).*$/,
      "$1"
    );
    setValue(formattedInput);
  };

  if (!route) null;

  const handleContinue = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View style={styles.innerContainer}>
          <View style={styles.currencyWrapper}>
            <View style={styles.currencyDetailsWrapper}>
              <Text style={[styles.currencyDetailText, { fontSize: 32 }]}>
                {uk.flag || ""}
              </Text>
              <Text style={styles.currencyDetailText}>{uk.code || ""}</Text>
            </View>
            <View
              style={{
                borderLeftWidth: 1,
              }}
            ></View>
            <View style={styles.currencyValueWrapper}>
              <Text style={styles.text}>You spend:</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.currencyDetailText}
                onChangeText={onChangeText}
                value={value}
                placeholder="0.00"
                autoFocus={true}
              />
            </View>
          </View>
          <View style={styles.currencyWrapper}>
            <View style={styles.currencyDetailsWrapper}>
              <Text style={[styles.currencyDetailText, { fontSize: 32 }]}>
                {flag || ""}
              </Text>
              <Text style={styles.currencyDetailText}>{code || ""}</Text>
            </View>
            <View
              style={{
                borderLeftWidth: 1,
              }}
            ></View>
            <View style={styles.currencyValueWrapper}>
              <Text style={styles.text}>You get:</Text>
              <Text style={styles.currencyDetailText}>{currencyExchange}</Text>
            </View>
          </View>
          <View style={styles.exchangeRateWrapper}>
            <Text style={styles.text}>Current exchange rate</Text>
            <Text style={styles.amountText}>
              1 {uk.code} = {rate} {code}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
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
  currencyWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9299A5",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: "space-around",
  },
  currencyDetailsWrapper: {
    flex: 1,
    flexDirection: "row",
    gap: 2,
    width: "40%",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderColor: "#9299A5",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  currencyDetailText: {
    borderWidth: 0,
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
  currencyValueWrapper: {
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 16,
    width: "60%",
  },
  continueButton: {
    backgroundColor: "#1172A5",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  exchangeRateWrapper: {
    gap: 4,
    alignItems: "center",
    marginTop: 12,
  },
  text: {
    fontSize: 14,
    color: "#888",
  },
  amountText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
