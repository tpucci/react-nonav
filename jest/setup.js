import { configure } from 'mobx';

configure({
  enforceActions: 'always',
});

Date.now = jest.fn(() => 0);
