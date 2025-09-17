import { useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { Link } from "expo-router";

export default function CartScreen() {
  const [cart, setCart] = useState([
    { id: "1", title: "Sample Product", price: 10.0, qty: 1 },
  ]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>My Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            {item.title} - ${item.price} x {item.qty}
          </Text>
        )}
      />

      <Text style={{ marginVertical: 10 }}>Total: ${total.toFixed(2)}</Text>

      <Link href="/checkout">
        <Button title="Proceed to Checkout" />
      </Link>
    </View>
  );
}
