import { PostData } from "@/types/post";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function createPost(post: PostData) {
	try {
		const docRef = await addDoc(collection(db, "posts"), post);
		console.log("Document written with ID: ", docRef.id);
	} catch (e) {
		console.log("Feil ved oppretting av innlegg", e);
	}
}

export async function getAllPosts() {
	try {
		const queryResult = await getDocs(collection(db, "posts"));
		const posts = queryResult.docs.map(
			(doc) =>
				({
					...doc.data(),
					id: doc.id,
				} as PostData)
		);
		console.log("Hentet innlegg: ", posts);
		return posts;
	} catch (e) {
		console.log("Feil ved henting av innlegg", e);
		return [] as PostData[];
	}
}

export async function getPostById(id: string) {
	try {
		const spesificPost = await getDoc(doc(db, "posts", id));
		return {
			...spesificPost.data(),
			id: spesificPost.id,
		} as PostData;
	} catch (e) {
		console.log("Feil ved henting av innlegg", e);
		return null;
	}
}
