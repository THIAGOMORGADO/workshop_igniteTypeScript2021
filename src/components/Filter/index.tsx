import { View, Text, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { Container, FilterStyleProps, Title } from './styles'

type Props = TouchableOpacityProps & FilterStyleProps & {
  title: string;

}

export default function Filter({title, isActve = false, ...rest}: Props) {
  return (
    <Container 
      {...rest} 
      isActve={isActve}
    >
      <Title>
        {title}
      </Title>
    </Container>
  )
}