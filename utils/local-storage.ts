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
        }
    } catch (e) {
        console.log("Feil med storeData()" + e);
    }
  }