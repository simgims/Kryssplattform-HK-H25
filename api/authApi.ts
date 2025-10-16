import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, User, updateProfile } from "firebase/auth";

export async function signIn(email: string, password: string) {
	await signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			console.log("User signed in ", userCredential);
		})
		.catch((error) => console.log("Oops, kunne ikke logge inn", error));
}

export async function signOut() {
	await auth.signOut();
}

export async function createUser(email: string, password: string) {
	console.log("Epost: ", email)
	console.log("Passord: ", password)
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
        return userCredential.user
	} catch (error) {
		console.error("Error creating user", error);
	}
}

export async function setUserDisplayName(user: User, displayName: string) {
    try {
        await updateProfile(user, { displayName });
    } catch (error) {
        console.error("Error setting user display name", error);
    }

}