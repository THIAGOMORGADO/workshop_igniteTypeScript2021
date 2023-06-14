import { useState } from 'react'
import { Container, Content, Icon } from './styles'

import Header from '@components/Header'
import HighLight from '@components/HighLight'
import { Button } from '@components/Button'
import {Input} from '@components/TextInput'
import { useNavigation } from '@react-navigation/native'
import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'
import { Alert } from 'react-native'



export default function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  async function handleNew() {
    try {
      if(group.trim().length === 0) {
        return  Alert.alert('Novo Grupo', 'Informe nome da turma')
      }
      await groupCreate(group)
      navigation.navigate('players', { group })
      
    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message)
      } else {
        Alert.alert("Nao foi possivel cadastra esse nome de grupo nome ja existente")
        console.log(error)
      }
    }
   

  }
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <HighLight 
          title='Nova Turma' 
          subttitle='Crier uma turma e adicione as pessoas'
        />

          <Input 
            onChangeText={setGroup}
            placeholder='Nome da turma'
            keyboardAppearance='dark'
          />
          <Button 
          title='Criar' 
          style={{marginTop: 20}}
          onPress={handleNew}
          />
        
      
      </Content>

    </Container>
  )
}