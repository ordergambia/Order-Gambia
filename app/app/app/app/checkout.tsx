import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { supabase } from "../lib/supabase";

export default function CheckoutScreen() {
  const [address, setAddress] = useState("");

  async function handleCheckout() {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      alert("You must log in first.");
      return;
    }

    const userId = auth.user.id;

    // Create a new order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_id: userId,
        total_amount: 0, // will calculate from order_items
        status: "pending",
      })
      .select()
      .single();

    if (orderError) {
      alert(orderError.message);
      return;
    }

    // Move cart items to this order
    const { error: updateError } = await supabase
      .from("order_items")
      .update({ order_id: order.id })
      .eq("order_id", "cart-" + userId);

    if (updateError) {
      alert(updateError.message);
      return;
    }

    alert("Order placed successfully ✅");
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Checkout</Text>

      <TextInput
        placeholder="Delivery Address"
        value={address}
        onChangeText={setAddress}
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />

      <Button title="Place Order" onPress={handleCheckout} />
    </View>
  );
}
