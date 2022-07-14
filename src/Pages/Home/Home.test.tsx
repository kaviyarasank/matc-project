import { render as rtlrender, cleanup, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../Redux/Store';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

const render = (component: any) => rtlrender(<Provider store={store}>{component}</Provider>);
afterEach(cleanup);

describe('Home', () => {
  test('render Home component Without crashing', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  test('first shop button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const SubmitButton = screen.getByTestId('firstShop-button');
    fireEvent.click(SubmitButton);
  });

  test('Fetch api calls', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const text = await screen.findByText('Popular Items');
    expect(text).toBeInTheDocument();
  });
});
