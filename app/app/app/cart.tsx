import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { View, Text, FlatList, Button } from "react-native";
import { Link } from "expo-router";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    getUserAndCart();
  }, []);

  async function getUserAndCart() {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUserId(data.user.id);
      fetchCart(data.user.id);
    }
  }

  async function fetchCart(uid: string) {
    const { data, error } = await supabase
      .from("order_items")
      .select("id, product_id, quantity, unit_price, products(title)")
      .eq("order_id", "cart-" + uid); // treat a pending order as "cart"

    if (error) {
      console.error(error);
      return;
    }
    setCartItems(data || []);
  }

  async function removeItem(id: string) {
    const { error } = await supabase.from("order_items").delete().eq("id", id);
    if (!error) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    }
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>My Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>
              {item.products.title} - ${item.unit_price} × {item.quantity}
            </Text>
            <Button title="Remove" onPress={() => removeItem(item.id)} />
          </View>
        )}
      />

      <Text style={{ marginVertical: 10 }}>Total: ${total.toFixed(2)}</Text>

      <Link href="/checkout">
        <Button title="Proceed to Checkout" />
      </Link>
    </View>
  );
}
