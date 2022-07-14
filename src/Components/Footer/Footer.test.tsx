import { render as rtlrender, cleanup, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../Redux/Store';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

const render = (component: any) => rtlrender(<Provider store={store}>{component}</Provider>);
afterEach(cleanup);

describe('Footer', () => {
  test('render footer component Without crashing', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  });

  test('Logo must have src = "/logo.svg" and alt = "Logo"', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const subject = screen.getByTestId('footer-image');
    expect(subject).toBeInTheDocument();
  });

  test('renders footer about button', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const mockOnClick = jest.fn();
    const SubmitButton = screen.getByTestId('footer-aboutBtn');
    fireEvent.click(SubmitButton);
    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });

  test('renders footer Contact button', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const mockOnClick = jest.fn();
    const SubmitButton = screen.getByTestId('footer-contactbtn');
    fireEvent.click(SubmitButton);
    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });
});
