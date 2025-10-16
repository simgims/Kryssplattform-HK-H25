import { getStoreageRef } from "@/firebaseConfig";
import { uploadBytesResumable } from "firebase/storage";



export async function uploadImageToFirebase(uri: string) {
    const fetchResponse = await fetch(uri);
    const blob = await fetchResponse.blob();
    // Eksempel på URL:
    // "file:///Users/simengimsoy/Library/Developer/CoreSimulator/Devices/65BBECB1-9CB1-4A1D-9E9D-450969867A39/data/Containers/Data/Application/138DA58E-8D79-446F-8774-03E05001E159/Library/Caches/ExponentExperienceData/@anonymous/Kryssplattform-HK-H25-baffb322-aacd-419f-9462-bc0758790a3f/Camera/43D83D1F-CE65-4B63-B39B-309589B87ED2.jpg"
    // Dette blir unødvending langt, så vi bruker splitt og pop for å hente ut bare filnavnet, eventuelt med et default navn hvis den ikke finnes noe.
    const imageName = uri.split("/").pop()?.split(".")[0] ?? "Anonymous image";
    console.log("Image name: ", imageName); // Sjekk riktig filnavn

    const uploadPath = `images/${imageName}`;
    const imageRef = await getStoreageRef(uploadPath);

    try {
        console.log("Starting upload")
        await uploadBytesResumable(imageRef, blob);
        console.log("Upload complete");
        return uploadPath;
    } catch (e) {
        console.log("Error uploading image: ", e);
        return null;
    }
}