import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View, Text, TextInput, Button } from "react-native";

export default function BusinessRegister() {
  const [brandName, setBrandName] = useState("");
  const [phone, setPhone] = useState("");

  async function handleBusinessRegister() {
    const user = supabase.auth.getUser();
    if (!user) return alert("You must log in first.");

    const { error } = await supabase.from("businesses").insert({
      brand_name: brandName,
      phone,
      owner_id: (await supabase.auth.getUser()).data.user.id,
    });

    if (error) alert(error.message);
    else alert("Business registered successfully ✅");
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Register Business</Text>
      <TextInput placeholder="Brand Name" value={brandName} onChangeText={setBrandName} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
      <Button title="Register Business" onPress={handleBusinessRegister} />
    </View>
  );
}
