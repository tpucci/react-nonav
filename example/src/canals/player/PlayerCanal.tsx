import React from 'react';
import {Canal, Screen} from 'react-nonav';
import {FadeTransitioner} from '../../atoms/FadeTransitioner';
import {RemoteControlScreen} from './screens/RemoteControlScreen';

export const PlayerCanal = () => {
  return (
    <Canal style={{flex: 1}}>
      <Screen
        visible
        name="RemoteControl"
        Component={RemoteControlScreen}
        Transitioner={FadeTransitioner}
      />
    </Canal>
  );
};
