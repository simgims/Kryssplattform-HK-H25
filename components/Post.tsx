import { PostData } from "@/types/post";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export type PostProps = {
	postData: PostData;
};

export default function Post({ postData }: PostProps) {
	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "/post-details/[id]",
					params: { id: postData.id },
				})
			}
		>
			<View style={styles.post}>
				<Text style={styles.postTitle}>{postData.title}</Text>
				<View style={styles.postDescriptionContainer}>
					<Text style={styles.postDescription}>{postData.description}</Text>
				</View>
				<Image
					source={{ uri: postData.imageUri }}
					style={{ width: "100%", height: 200, marginTop: 8, borderRadius: 8 }}
				/>
				<View style={styles.postCommentIcon}>
					<FontAwesome5 name="comment" size={24} color="black" />
					<Text> {postData.comments?.length || 0}</Text>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	post: {
		backgroundColor: "white",
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	postTitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	postDescription: {
		fontSize: 16,
		color: "gray",
	},
	postDescriptionContainer: {
		marginTop: 16,
	},
	postCommentIcon: {
		marginTop: 8,
		flexDirection: "row",
		alignItems: "center",
	},
});
