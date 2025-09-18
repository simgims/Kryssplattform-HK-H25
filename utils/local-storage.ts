import { PostData } from "@/types/post";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData(key: string, value: string) {
	try {
		await AsyncStorage.setItem(key, value);
		console.log("Stored!");
	} catch (e) {
		console.log("Feil med storeData()" + e);
	}
}

export async function getData(key: string) {
	try {
		const data = await AsyncStorage.getItem(key);
		if (data !== null) {
			console.log(data);
			return data;
		}
	} catch (e) {
		console.log("Feil med storeData()" + e);
	}
}

export async function getPostByLocalId(id: string) {
	try {
		const data = await AsyncStorage.getItem("postStore");
		if (data !== null) {
			const posts: PostData[] = JSON.parse(data);
			return posts.find((post) => post.id === id);
		}
	} catch (e) {
		console.log("Feil med getPostByIdLocal()", e);
	}
}

export async function storeCommentToPost(updatedPost: PostData) {
	try {
		// Get existing posts array
		const existingData = await AsyncStorage.getItem("postStore");
		let posts: PostData[] = [];

		if (existingData !== null) {
			posts = JSON.parse(existingData);
		}

		// Find and update the specific post
		const postIndex = posts.findIndex((post) => post.id === updatedPost.id);
		if (postIndex !== -1) {
			posts[postIndex] = updatedPost;
		} else {
			// If post doesn't exist, add it
			posts.push(updatedPost);
		}

		// Store the updated posts array back
		await AsyncStorage.setItem("postStore", JSON.stringify(posts));
		console.log("Comment stored successfully!");
	} catch (e) {
		console.log("Feil med storeCommentToPost()" + e);
	}
}
