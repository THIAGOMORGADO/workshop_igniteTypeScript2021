import React, { useEffect, useState, useRef } from 'react'
import { useRoute } from '@react-navigation/native'
import { Alert, FlatList, Keyboard, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Container, Form, HeaderList, NumberofPlayers, } from './styles'

import Header from '@components/Header'
import HighLight from '@components/HighLight'
import ButtonIcon from '@components/ButtonIcon'
import { Input } from '@components/TextInput'
import Filter from '@components/Filter';


import PlayerCard from '@components/PlayerCard'
import ListEmpty from '@components/ListEmpty'
import { Button } from '@components/Button'
import { AppError } from '@utils/AppError'

import { playersAddByGroup } from '@storage/players/playersAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/players/playersGetBygroupAndTeam'
import { PlayerStorageDTO } from '@storage/players/PlayersStorageDTO'
import { playerRemoveByGroup } from '@storage/players/PlayersRemoveByGroup'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'
import { Loading } from '@components/Loading'


type RoutesParams = {
  group:string 
}

export default function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayersName, setNewPlayersName] = useState('')
  const navigation = useNavigation()
  const route = useRoute();

  const {group} = route.params as RoutesParams;
  const newPlayersNameInputRef = useRef<TextInput>(null)

  async function handleNewPlayers() {
    if(newPlayersName.trim().length === 0){
      return Alert.alert("Novo player", "Informe o nome da pessoa para adicionar no time")
    }
    const newPlayer = {
      name: newPlayersName,
      team
    }
    try {
      await playersAddByGroup(newPlayer, group);
      
      setNewPlayersName('')
      fetchPlayersByTeam();
    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
      }else {
        console.log(error);
        Alert.alert("Nova pessoa", 'Nao foi possivel adicionar')
      }
    }
  }
  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
      
    } catch (error) {
      console.log(error);
      Alert.alert("Nova pessoa", 'Nao foi possivel carregar as pessoas filtradas')
    } finally {
      setIsLoading(false);
    }
  }
  async function handleRemovePlayers(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error)
      Alert.alert("Remover pessoa", 'Nao foi remover pessoa')
    }
  }
  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups')
    } catch (error) {
      console.log(error);
      Alert.alert('Remover Grupo', "Nao foi possivel Remover o grupo")
    }
  }
  async function handleGroupRemove() {
    Alert.alert(
      'Remover',
      'Deseja Remover p grupo?',
      [
        {text: 'Nao', style: 'cancel'},
        {text: 'Sim', onPress: () => groupRemove()}
      ]
    )
  }
  useEffect(() => {
    fetchPlayersByTeam();
  }, [team])

  return (
    <Container>
      <Header  showBackButton />
      <HighLight 
        title={group} 
        subttitle='adicione a galera e separe os times'
      />
      <Form>
      <Input
        inputRef={newPlayersNameInputRef} 
        placeholder='Nome da pessoa' 
        autoCorrect={false}
        onChangeText={setNewPlayersName}
        value={newPlayersName}
        keyboardAppearance='dark'
        onSubmitEditing={handleNewPlayers}
        returnKeyType='done'
      />
      <ButtonIcon icon="add" onPress={handleNewPlayers}/>
      </Form>
      <HeaderList>
      <FlatList 
        data={['Time A', 'Time B']}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Filter  
            title={item}  
            isActve={item === team} 
            onPress={() => setTeam(item)}
          />
        )}
        horizontal
      />
      <NumberofPlayers>{players.length}</NumberofPlayers>

      
      </HeaderList>
      {
        isLoading ? <Loading /> : 
      
      <FlatList 
        data={players}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <PlayerCard  
            name={item.name}
            onRemove={() => handleRemovePlayers(item.name)}
            />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {paddingBottom: 100},
          players.length === 0 && {flex: 1}
        ]}
        ListEmptyComponent={() => (
          <ListEmpty message="Time Vazio"/>
        )}
        
      />
    }
      <Button  title='Remover Turma' type='secondary' onPress={handleGroupRemove}/>
    </Container>
  )
}