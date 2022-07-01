import { render as rtlrender, cleanup, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../Redux/Store';
import { BrowserRouter } from 'react-router-dom';
import SecondCard from './secondCard';

const render = (component: any) => rtlrender(<Provider store={store}>{component}</Provider>);
afterEach(cleanup);

describe('Cart', () => {
  test('render Cart component Without crashing', () => {
    render(
      <BrowserRouter>
        <SecondCard />
      </BrowserRouter>
    );
  });

  test('renders card button', () => {
    render(
      <BrowserRouter>
        <SecondCard />
      </BrowserRouter>
    );
    const mockOnClick = jest.fn();
    const SubmitButton = screen.getByTestId('card-button');
    fireEvent.click(SubmitButton);
    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });
});
