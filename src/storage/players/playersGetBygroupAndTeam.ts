import {PlayerGetByGroup} from './PlayersGetByGroup'
import { playersAddByGroup } from './playersAddByGroup'

export async function playersGetByGroupAndTeam(group: string, team: string) {
  try {
    const storage =  await PlayerGetByGroup(group);

    const players = storage.filter(player => player.team === team);

    return players;

  } catch (error) {
    throw error
  }
}