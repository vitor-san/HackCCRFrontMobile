import React from 'react';
import { MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';

export default function TeamIcon({ team, color, size }) {
  if (team === 'Geral')
    return <FontAwesome5 name="crown" color={color} size={size} />;
  if (team === 'Infraestrutura')
    return <FontAwesome5 name="box-open" color={color} size={size} />;
  if (team === 'Entidades')
    return (
      <MaterialIcons name="people-outline" color={color} size={size + 4} />
    );
  if (team === 'Divulgação')
    return <Entypo name="megaphone" color={color} size={size} />;
  return <FontAwesome5 name="money-bill-alt" color={color} size={size} />;
}
