import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ProfilePage() {
  return (
    <View style={style.mainContainer}>
      <Text>Her er profilsiden!</Text>
      <Text>
        Trykk{" "}
        {
          <Link style={style.link} href={"/declarations"}>
            her
          </Link>
        }{" "}
        for informasjon om appen
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    textDecorationLine: "underline",
  },
});
