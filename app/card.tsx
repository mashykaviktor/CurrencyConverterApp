import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const uk = {
  name: "British Pound",
  flag: "🇬🇧",
  code: "GBP",
  rate: 1,
};

export default function Card() {
  const route = useRoute();
  const [value, setValue] = useState(0);

  const onChangeText = (input) => {
    setValue(input);
  };

  if (!route) null;

  const { flag, code, name, rate } = route?.params?.item;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View style={styles.innerContainer}>
          <View style={styles.currencyWrapper}>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text>{uk.flag || ""}</Text>
              <Text>{uk.code || ""}</Text>
            </View>
            <View
              style={{
                borderLeftWidth: 1,
              }}
            ></View>
            <View style={{ gap: 4 }}>
              <Text>You spend:</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.textInput}
                onChangeText={onChangeText}
                value={value}
              />
            </View>
          </View>
          <View style={styles.currencyWrapper}>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text>{flag || ""}</Text>
              <Text>{code || ""}</Text>
            </View>
            <View
              style={{
                borderLeftWidth: 1,
              }}
            ></View>
            <View style={{ gap: 4 }}>
              <Text>You spend:</Text>
              <Text>{value * rate}</Text>
            </View>
          </View>
          <View style={{ gap: 8, alignSelf: "center" }}>
            <Text>Current exchange rate</Text>
            <Text>
              1 {uk.code} = {rate} {code}
            </Text>
          </View>
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
  currencyWrapper: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "space-around",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  textInput: {
    padding: 5,
  },
});
