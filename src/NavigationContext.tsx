import React, { Component, createContext, useContext, ComponentType } from 'react';
import { Navigation } from './Navigation.store';

const NavigationContext = createContext(Navigation.getInstance());

export const useNavigation = () => useContext(NavigationContext);

export const NavigationConsumer = NavigationContext.Consumer;

export const withNavigation = (
  ComponentWithoutNavigation: ComponentType<{ navigation: Navigation }>
) =>
  class ComponentWithNavigation extends Component {
    static displayName = 'withNavigation';
    render() {
      return (
        <NavigationConsumer>
          {navigation => <ComponentWithoutNavigation {...this.props} navigation={navigation} />}
        </NavigationConsumer>
      );
    }
  };
