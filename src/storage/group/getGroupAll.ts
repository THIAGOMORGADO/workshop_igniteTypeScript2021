import AsyncStorage from '@react-native-async-storage/async-storage'
import { Group_COLLECTION } from '@storage/storageConfig';

export async function getGroupAll() {
  try {
    const storage = await AsyncStorage.getItem(Group_COLLECTION)
    
    const groups: string[] = storage ? JSON.parse(storage) : [];
    return groups
  } catch (error) {
    throw error;
  }
}
