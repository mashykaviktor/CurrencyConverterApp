import { useNavigation } from "expo-router";

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

import { fetchCurrency } from "./api/fetchCurrency";

export default function Home() {
  const navigation = useNavigation();

  const [text, setText] = useState("");

  const onChangeText = (input) => {
    setText(input);
  };

  console.log({ text });

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 10,
          height: 50,
          paddingHorizontal: 10,
        }}
        onChangeText={onChangeText}
        value={text}
      />
      <Text>All currencies</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity onPress={() => navigation.navigate("card")}>
        <Text>Click me </Text>
      </TouchableOpacity>
    </View>
  );
}
