import { render as rtlrender, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../Redux/Store';
import { BrowserRouter } from 'react-router-dom';
import Profile from './Profile';

const render = (component: any) => rtlrender(<Provider store={store}>{component}</Provider>);
afterEach(cleanup);

describe('Profile', () => {
  test('render profile component Without crashing', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
  });
});
