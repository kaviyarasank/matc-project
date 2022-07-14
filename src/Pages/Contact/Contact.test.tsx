import { render as rtlrender, cleanup, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../Redux/Store';
import Contact from './Contact';

const render = (component: any) => rtlrender(<Provider store={store}>{component}</Provider>);
afterEach(cleanup);

describe('Contact', () => {
  test('render App component Without crashing', () => {
    render(<Contact />);
  });

  test('renders Contact form input field', () => {
    render(<Contact />);
    const inputName = screen.getByTestId('con-name');
    expect(inputName).toBeInTheDocument();
    expect(inputName).toHaveAttribute('type', 'text');

    const conEmail = screen.getByTestId('con-email');
    expect(conEmail).toBeInTheDocument();
    expect(conEmail).toHaveAttribute('type', 'text');

    const mobileNo = screen.getByTestId('con-mobileNo');
    expect(mobileNo).toBeInTheDocument();
    expect(mobileNo).toHaveAttribute('type', 'text');

    const Address = screen.getByTestId('con-Address');
    expect(Address).toBeInTheDocument();
    expect(Address).toHaveAttribute('type', 'text');

    const subject = screen.getByTestId('con-subject');
    expect(subject).toBeInTheDocument();
    expect(subject).toHaveAttribute('type', 'text');

    const message = screen.getByTestId('con-message');
    expect(message).toBeInTheDocument();

    const SubmitButton = screen.getByTestId('con-button');
    fireEvent.click(SubmitButton);
  });
});
