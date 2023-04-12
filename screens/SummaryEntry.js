import React from "react";
import { View, Text } from "react-native";
import { Divider, useTheme } from 'react-native-paper';


export const SummaryEntry = ({ name, label }) => {
  const theme = useTheme();
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 8, fontWeight: "700", color : theme.colors.primary }}>{label}</Text>
      <Text style={{ marginBottom: 8, color : theme.colors.secondary }}>{name}</Text>
      <Divider />
    </View>
  );
};
