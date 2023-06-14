import AsyncStorage from '@react-native-async-storage/async-storage'
import { Group_COLLECTION } from '@storage/storageConfig';
import { getGroupAll } from './getGroupAll';
import { AppError } from '@utils/AppError';

export async function groupCreate(newGroup: string) {
  try {
    const starageGroups = await getGroupAll();

    const groupAllreadyExists = starageGroups.includes(newGroup)

    // Criando exessoes de erro
    if(groupAllreadyExists) {
      throw new AppError('Ja existe um grupo cadastrado com esse nome');
    }

    const storage = JSON.stringify([...starageGroups, newGroup ])
    
    await AsyncStorage.setItem(Group_COLLECTION, storage);

  } catch (error) {
    throw error;
  }
}