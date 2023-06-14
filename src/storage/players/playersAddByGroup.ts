import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { Players_COLLECTION } from "@storage/storageConfig";

import {PlayerGetByGroup} from './PlayersGetByGroup'
import { PlayerStorageDTO } from "./PlayersStorageDTO";

export async function playersAddByGroup(newPlayers: PlayerStorageDTO, group: string) {
  try {
    const storagePlayers = await PlayerGetByGroup(group)

    const playerAlreadyExists = storagePlayers.filter(player => player.name === newPlayers.name);

    if(playerAlreadyExists.length > 0) {
      throw new AppError('Pessoa ja cadastrada em um time ')
    }
    const storage = JSON.stringify([...storagePlayers, newPlayers]); 
    
    await AsyncStorage.setItem(`${Players_COLLECTION}-${group}`, storage);

  } catch (error) {
    throw(error)
  }
}
