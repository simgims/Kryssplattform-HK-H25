import { PostData } from "@/types/post";
import { StyleSheet, Text, View } from "react-native";

export type PostProps = {
  postData: PostData;
};

export default function Post({ postData }: PostProps) {
  return (
    <View style={styles.post}>
      <Text>{postData.title}</Text>
      <View>
        <Text>{postData.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  post: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
