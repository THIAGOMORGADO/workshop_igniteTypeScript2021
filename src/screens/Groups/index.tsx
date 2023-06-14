import React, {useState, useEffect, useCallback} from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getGroupAll } from '@storage/group/getGroupAll';

import {Container,} from './styles'
import Header from '@components/Header';
import HighLight from '@components/HighLight';
import GroupsCard from '@components/GroupsCard';
import ListEmpty from '@components/ListEmpty';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';



export default function Groups(){
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNewGroup() {
   navigation.navigate('new')
  }
  async function fetchGroups() {
    try {
      setIsLoading(true)
      const data = await getGroupAll();
      setGroups(data)
      
    } catch (error) {
      console.log(error) 
    } finally {
      setIsLoading(false)
    }
  }
  function handleOpenGroup(group: string) {
    navigation.navigate('players', {group})
  }
  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []))

  return(
    <Container>
      <Header />
      <HighLight title='turmas' subttitle='Joge com seu time'/>
      {
        isLoading ? <Loading /> :
    
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({item})=> (
          <GroupsCard 
            title={item}
            onPress={() => handleOpenGroup(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() =>  (
        <ListEmpty 
        message='Ainda nenhuma Turma Cadastrada' 
          />
        )}
      />
    }
      <Button title='CRIAR NOVA TURMA' onPress={handleNewGroup}/>

        

    </Container>
  )
}