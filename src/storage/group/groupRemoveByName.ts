import { groupCreate } from '@storage/group/groupCreate';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Group_COLLECTION, Players_COLLECTION } from "@storage/storageConfig";

import {getGroupAll} from './getGroupAll'

export async function groupRemoveByName(groupDeleted: string) {
  try {
    const storageGroups = await getGroupAll();

    const groups = storageGroups.filter(group => group != groupDeleted)

    await AsyncStorage.setItem(Group_COLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${Players_COLLECTION}-${groupDeleted}`)

  } catch (error) {
    throw error;
  }
}