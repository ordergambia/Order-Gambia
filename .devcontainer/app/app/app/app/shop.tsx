import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { View, Text, FlatList } from "react-native";

export default function ShopScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) alert(error.message);
    else setProducts(data);
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Shop</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.title} - ${item.price}</Text>
        )}
      />
    </View>
  );
}
