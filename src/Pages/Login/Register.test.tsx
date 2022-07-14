import { render as rtlrender, cleanup, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../Redux/Store';
import Register from './Register';

const render = (component: any) => rtlrender(<Provider store={store}>{component}</Provider>);
afterEach(cleanup);

describe('Login Form Component', () => {
  test('renders "Login Form" as a text', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const loginForm = screen.getByText('Please Sign in now');
    expect(loginForm).toBeInTheDocument();
  });

  test('renders Username, password input field', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const inputEl = screen.getByTestId('email-input');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('type', 'text');

    const inputPassword = screen.getByTestId('email-Password');
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveAttribute('type', 'password');

    const SubmitButton = screen.getByTestId('submit-button');
    fireEvent.click(SubmitButton);
  });
});
