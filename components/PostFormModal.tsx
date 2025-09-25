import { PostData } from "@/types/post";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import * as Location from "expo-location";
import { useState, useRef } from "react";
import {
	Image,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import SelectImageModal from "./SelectImageModal";

export type PostModalProps = {
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
	// Callback funksjon, vi bruker denne til å "flytte" innlegget vårt ut til foreldrekomponenten
	addPost: (post: PostData) => void;
};

export default function PostFormModal({
	isVisible,
	setIsVisible,
	addPost,
}: PostModalProps) {
	const [titleText, setTitleText] = useState("");
	const [descText, setDescText] = useState("");
	const [isCameraOpen, setIsCameraOpen] = useState(false);
	const [image, setImage] = useState<string | null>(null);

	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [location, setLocation] =
		useState<Location.LocationGeocodedAddress | null>(null);

  const postCoordinatesData = useRef<Location.LocationObjectCoords | null >(null);

	async function getLocation() {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied");
		}

		let location = await Location.getCurrentPositionAsync();
    postCoordinatesData.current = location.coords;
		const locationAddress = await Location.reverseGeocodeAsync({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		});
		setLocation(locationAddress[0]);
		console.log(location);
	}

	let locationPlaceholderText = "Her kommer det en kul adresse wow!";
	if (errorMsg) {
		locationPlaceholderText = errorMsg;
	}

	return (
		<Modal transparent visible={isVisible} animationType="slide">
			<Modal visible={isCameraOpen}>
				<SelectImageModal
					closeModal={() => setIsCameraOpen(false)}
					setImage={(image) => {
						setImage(image);
            getLocation();
					}} // Her sendes uri til bildet (filsti til hvor bildet er lagret) og settes i image state
				/>
			</Modal>
			<View style={styles.modalVisible}>
				<Pressable
					onPress={() => setIsCameraOpen(true)}
					style={{
						width: "100%",
						height: 300,
						justifyContent: "center",
						alignItems: "center",
						borderWidth: 1,
						borderRadius: 10,
						overflow: "hidden",
					}}
				>
					{image ? ( //Her sjekker vi om vi har et gyldig bilde, hvis det eksisterer et slikt bilde viser vi det gjennom en <Image> komponent
						<Image
							source={{ uri: image }}
							style={{ resizeMode: "cover", width: "100%", height: 300 }}
						/>
					) : (
						<EvilIcons name="image" size={80} color="black" /> // Hvis ikke viser vi ikonet som vanlig
					)}
				</Pressable>
        <View style={{ marginTop: 8, marginBottom: 16 }}>
						{location ? (
							<Text>{`${location.name} - ${location.city} - ${location.country}`}</Text>
						) : (
							<Text>{locationPlaceholderText}</Text>
						)}
					</View>
				<View style={styles.textInputContainer}>
					<TextInput
						style={styles.textInput}
						value={titleText}
						placeholder="Tittel"
						onChangeText={setTitleText}
					/>
					<TextInput
						style={styles.textInput}
						value={descText}
						placeholder="Beskrivelse"
						onChangeText={setDescText}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Pressable
						style={[styles.button, { borderWidth: 2, borderColor: "gray" }]}
						onPress={() => {
							if (image) {
								const newPost: PostData = {
									id: titleText + descText,
									title: titleText,
									description: descText,
									imageUri: image,
									comments: [],
                  postCoordinates: postCoordinatesData.current,

								};
								// Huske å fjerne innholdet i tekstinput så vi får en ny start neste gang vi vil lage et innlegg
								addPost(newPost);
								setTitleText("");
								setDescText("");
								setIsVisible(false);
							}
						}}
					>
						<Text>Legg til</Text>
					</Pressable>
					<Pressable
						onPress={() => setIsVisible(false)}
						style={[styles.button, { backgroundColor: "gray" }]}
					>
						<Text>Lukk</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalVisible: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: 20,
		paddingHorizontal: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	titleContainer: {
		marginBottom: 20,
	},
	buttonContainer: {
		flexDirection: "row",
		width: "50%",
		justifyContent: "space-between",
		// paddingHorizontal: 30,
		marginTop: 16,
	},
	textInputContainer: {
		gap: 16,
		alignItems: "center",
		width: "100%",
	},
	textInput: {
		borderBottomWidth: 1,
		width: "75%",
		fontSize: 18,
	},
	button: {
		// backgroundColor: "red",
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
});
