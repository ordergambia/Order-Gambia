import { Link } from "expo-router";
import { View, Text, Button } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>🇬🇲 Order Gambia</Text>
      <Text style={{ marginVertical: 10 }}>Welcome! Are you a:</Text>

      <Link href="/login">
        <Button title="Customer" />
      </Link>

      <Link href="/business/register">
        <Button title="Business Owner" />
      </Link>
    </View>
  );
}
