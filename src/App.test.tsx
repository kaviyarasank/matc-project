import { render as rtlrender, cleanup } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import { BrowserRouter } from 'react-router-dom';

const render = (component: any) => rtlrender(<Provider store={store}>{component}</Provider>);
afterEach(cleanup);

describe('App', () => {
  it('render App component Without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});
