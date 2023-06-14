import React from 'react';


import { Container, Title, buttonTypeStyleProps } from './styles';
import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  title: string;
  type?: buttonTypeStyleProps;
}

export function Button({title, type = 'primary', ...rest} : Props){
  return(
    <Container 
      type={type}
      {...rest}
    >
      <Title>{title}</Title>
    </Container>
  );
}
