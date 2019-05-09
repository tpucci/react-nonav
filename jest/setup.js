import { configure } from 'mobx';

configure({
  enforceActions: 'observed',
});

Date.now = jest.fn(() => 0);
