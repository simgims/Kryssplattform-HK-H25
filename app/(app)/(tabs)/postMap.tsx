import { PostData } from "@/types/post";
import { getData } from "@/utils/local-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

export default function mapScreen() {
	const [posts, setPosts] = useState<PostData[]>([]);

	async function getPostsFromLocal() {
		const exisitngPosts = await getData("postStore");
		if (exisitngPosts) {
			setPosts(JSON.parse(exisitngPosts));
		}
	}
	useEffect(() => {
		getPostsFromLocal();
	}, []);

	return (
		<View>
			<MapView
				zoomEnabled={true}
				scrollEnabled={true}
				rotateEnabled={true}
				pitchEnabled={true}
				style={{ width: "100%", height: "100%" }}
			>
				{posts.map((post) =>
					post.postCoordinates ? (
						<Marker
							key={post.id}
							coordinate={{
								latitude: post.postCoordinates.latitude,
								longitude: post.postCoordinates.longitude,
							}}
							title={post.title}
							description={post.description}
						>
							<Callout>
								<View style={styles.calloutContainer}>
									<Text style={styles.calloutTitle}>{post.title}</Text>
									{/* {post.imageUri && (
										<Image
											source={{ uri: post.imageUri }}
											style={styles.calloutImage}
											resizeMode="cover"
										/>
									)} */}
								</View>
							</Callout>
						</Marker>
					) : null
				)}
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	calloutContainer: {
		width: 150,
		padding: 5,
		alignItems: "center",
	},
	calloutTitle: {
		fontWeight: "bold",
		fontSize: 14,
		marginBottom: 5,
		textAlign: "center",
	},
	calloutImage: {
		width: 120,
		height: 90,
		borderRadius: 5,
	},
});
