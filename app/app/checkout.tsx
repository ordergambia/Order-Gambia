import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { supabase } from "../lib/supabase";

export default function CheckoutScreen() {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  async function handleCheckout() {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      alert("You must log in first.");
      return;
    }

    // Create a sample order
    const { error } = await supabase.from("orders").insert({
      customer_id: user.data.user.id,
      total_amount: 20.0, // Replace with real cart total
      status: "pending",
    });

    if (error) alert(error.message);
    else alert("Order placed successfully ✅");
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

      <Text>Payment Method: {paymentMethod}</Text>

      <Button title="Place Order" onPress={handleCheckout} />
    </View>
  );
}
