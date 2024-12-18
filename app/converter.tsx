import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import CurrencyCard from "./components/CurrencyCard";
import { sanitizedCurrencyInput } from "./utils/sanitizedCurrencyInput";

type ConverterRouteParams = {
  item: {
    flag: string;
    code: string;
    rate: number;
  };
};

type ConverterScreenRouteProp = RouteProp<
  { params: ConverterRouteParams },
  "params"
>;

const uk = {
  name: "British Pound",
  flag: "🇬🇧",
  code: "GBP",
  rate: 1,
};

export default function Converter() {
  const route = useRoute<ConverterScreenRouteProp>();
  const [value, setValue] = useState("");

  const { flag, code, rate } = route?.params?.item;
  const numericValue = parseFloat(value) || 0;
  const currencyExchange = (numericValue * rate).toFixed(2);

  const handleInputChange = useCallback((input: string) => {
    setValue(sanitizedCurrencyInput(input));
  }, []);

  if (!route) null;

  const handleContinue = () => {
    Keyboard.dismiss();
  };

  if (!code || !flag || !rate) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Invalid currency data. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View style={styles.innerContainer}>
          <CurrencyCard
            flag={uk.flag}
            code={uk.code}
            label="You spend:"
            value={value}
            onChangeText={handleInputChange}
            editable={true}
          />
          <CurrencyCard
            flag={flag}
            code={code}
            label="You get:"
            value={currencyExchange}
            editable={false}
          />
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "600",
  },
});
