import React from 'react';
import {Canal, Screen, transition} from 'react-nonav';
import {observer} from 'mobx-react';
import {SearchScreen} from './screens/SearchScreen';
import {SearchModule} from '../../module/SearchModule';

export const Search = observer(() => {
  return (
    <Canal>
      <Screen
        isFullScreen
        name="Search"
        key="Search"
        visible={SearchModule.isSearching}
        Component={SearchScreen}
        Transitioner={transition.FadeDown}
        onBack={SearchModule.cancel}
      />
    </Canal>
  );
});
