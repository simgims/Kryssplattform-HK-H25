import { db } from "@/firebaseConfig";
import { PostComment } from "@/types/post";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";


export async function createComment(comment: PostComment) {
    try {
        const docRef = await addDoc(collection(db, "comments"), comment);
        console.log("Document written with ID: ", docRef.id);
    } catch(e) {
        console.log("Error creating post", e);
    }
}

export async function getCommentsByIds(ids: string[]) {
    try {
        // Hent absolutt alle kommentarer og plukk ut de som matcher id-ene i parameteren
        const queryResult = await getDocs(collection(db, "comments"));
        const targetComments = queryResult.docs.filter((doc) => ids.includes(doc.id)); // Returnerer en array med alle dokumenter som matcher id-ene i parameteren
        const comments = targetComments.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        } as PostComment));
        console.log("Successfully fetched comments: ", comments);
        return comments;
    } catch(e) {
        console.log("Error getting all comments", e)
        return [] as PostComment[];
    }
}

export async function deleteComment(id: string) {
    try {
        await deleteDoc(doc(db, "comments", id));
    } catch(e) {
        console.log("Error deleting comment", e);
    }
}