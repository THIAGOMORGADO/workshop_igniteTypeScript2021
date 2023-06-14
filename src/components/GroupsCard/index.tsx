
import React from 'react'
import { Container, Icon, Title } from './styles'

import {TouchableOpacityProps} from "react-native"

type Props = TouchableOpacityProps & {
  title: string
}

export default function GroupsCard({title, ...rest} : Props) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  )
}