import { View, Text } from 'react-native'
import React from 'react'

type Props = {
  title: string,
  subttitle: string,
}

import { Container, SubTitle, Title } from './styles'

export default function HighLight({title, subttitle} : Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subttitle}</SubTitle>
    </Container>
  )
}