import React from 'react';
import {Canal, Screen, transition} from 'react-nonav';
import {RemoteControlScreen} from './screens/RemoteControlScreen';
import {OnScreenPlayerScreen} from './screens/OnScreenPlayerScreen';
import {PlayerModule} from '../../module/PlayerModule';
import {ConnectivityModule} from '../../module/ConnectivityModule';

export const PlayerCanal = () => {
  return (
    <Canal style={{flex: 1}}>
      <Screen
        visible={
          PlayerModule.isMoviePlaying &&
          !ConnectivityModule.isConnectedToChromeCast
        }
        name="OnScreenPlayer"
        Component={OnScreenPlayerScreen}
        props={{movie: PlayerModule.movie}}
        Transitioner={transition.Fade}
      />
      <Screen
        visible={
          PlayerModule.isMoviePlaying &&
          ConnectivityModule.isConnectedToChromeCast
        }
        name="RemoteControl"
        Component={RemoteControlScreen}
        props={{movie: PlayerModule.movie}}
        Transitioner={transition.Fade}
      />
    </Canal>
  );
};
