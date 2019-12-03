import React from 'react';
import {Canal, Screen, transition} from 'react-nonav';
import {RemoteControlScreen} from './screens/RemoteControlScreen';

export const PlayerCanal = () => {
  return (
    <Canal style={{flex: 1}}>
      <Screen
        visible
        name="RemoteControl"
        Component={RemoteControlScreen}
        Transitioner={transition.Fade}
      />
    </Canal>
  );
};
