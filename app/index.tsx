import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";

export default () => {
  const router = useRouter();
  setTimeout(() => router.replace("/login"), 200);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};
