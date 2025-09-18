import { useAuthSession } from "@/providers/authctx";
import { PostData } from "@/types/post";
import { getPostByLocalId, storeCommentToPost } from "@/utils/local-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";

export default function PostDetailsPage() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [post, setPost] = useState<PostData | null>(null);
	const [commentText, setCommentText] = useState("");
	const { userNameSession } = useAuthSession();

	async function fetchPostFromLocal(inputId: string) {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		const postLocal = await getPostByLocalId(inputId);
		if (postLocal) {
			setPost(postLocal);
		}
	}

	async function addCommentToPost() {
		if (!post) return;

		const newComment = {
			id: Date.now().toString(), // Generate a unique ID for the comment
			userName: userNameSession ? userNameSession : "Anon",
			text: commentText,
		};

		const updatedPost = {
			...post,
			comments: post.comments ? [...post.comments, newComment] : [newComment],
		};

		setPost(updatedPost);
		setCommentText("");

		// Save to localStorage
		try {
			await storeCommentToPost(updatedPost);
		} catch (error) {
			console.log("Failed to save comment:", error);
		}
	}

	useEffect(() => {
		fetchPostFromLocal(id);
	}, [id]);

	if (post === null) {
		return (
			<View>
				<Text>LASTER</Text>
			</View>
		);
	}

	return (
		<View style={{ padding: 16 }}>
			<Text>
				{post.title}, {post.description}
			</Text>
			<Image
				source={{ uri: post.imageUri }}
				style={{ width: "100%", height: 200, marginTop: 8, borderRadius: 8 }}
			/>
			<TextInput
				value={commentText}
				onChangeText={setCommentText}
				placeholder="Skriv en kommentar..."
				style={{
					borderWidth: 1,
					borderColor: "gray",
					borderRadius: 5,
					padding: 8,
					marginTop: 16,
				}}
				onSubmitEditing={addCommentToPost} // Legg til kommentaren når brukeren trykker "Enter"
			></TextInput>
			<View>
				<Text>Kommentarer: {post.comments?.length}</Text>
				{post.comments && post.comments.length > 0 ? (
					post.comments.map((comment, index) => (
						<View key={index} style={{ marginTop: 8 }}>
							<Text style={{ fontWeight: "bold" }}>{comment.userName}:</Text>
							<Text>{comment.text}</Text>
						</View>
					))
				) : (
					<Text>Ingen kommentarer enda.</Text>
				)}
			</View>
		</View>
	);
}
