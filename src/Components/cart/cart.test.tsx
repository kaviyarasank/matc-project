import { render as rtlrender, cleanup, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../Redux/Store';
import { BrowserRouter } from 'react-router-dom';
import Cart from './cart';

const render = (component: any) => rtlrender(<Provider store={store}>{component}</Provider>);
afterEach(cleanup);

describe('Cart', () => {
  test('render Cart component Without crashing', () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
  });

  test('increment-button', () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );
    const primaryButton = screen.getByRole('button');
    expect(primaryButton).toHaveClass();
  });
});
