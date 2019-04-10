import React from 'react';
import { Provider } from 'mobx-react/native';

interface IProps {
  children: React.ReactNode;
}
export const NavigationProvider = ({ children }: IProps) => (
  <Provider navigation={{}}>{React.Children.only(children)}</Provider>
);
