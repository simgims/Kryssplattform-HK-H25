import { PostData } from "@/types/post";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getPostByLocalId } from "@/utils/local-storage";

export default function PostdetailsPage() {
	const { id } = useLocalSearchParams<{ id: string }>();

	const [post, setPost] = useState<PostData | null>(null);

	async function fetchPostFromLocalId(inputId: string) {

        await new Promise((resolve) => setTimeout(resolve, 1000));

		const postLocal = await getPostByLocalId(inputId);
		if (postLocal) {
			setPost(postLocal);
		}
	}

	useEffect(() => {
		fetchPostFromLocalId(id);
	}, [id]);

	if (post === null) {
		return;
		<View>
			<Text>Laster</Text>
		</View>;
	}

	return (
		<View>
			<Text>
                {post.title}, {post.description}
            </Text>
		</View>
	);
}
