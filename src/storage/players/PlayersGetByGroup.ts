import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "./PlayersStorageDTO";
import { Players_COLLECTION } from "@storage/storageConfig";

export async function PlayerGetByGroup(group: string) {
  try {
    const storage = await AsyncStorage.getItem(`${Players_COLLECTION}-${group}`);

    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];

    return players;
    
  } catch (error) {
    throw error;
  }
}