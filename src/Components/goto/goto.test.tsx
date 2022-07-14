import { render as rtlrender, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../Redux/Store';
import ScrollToTop from './goto';

const render = (component: any) => rtlrender(<Provider store={store}>{component}</Provider>);
afterEach(cleanup);

describe('About', () => {
  it('render About component Without crashing', () => {
    render(<ScrollToTop />);
  });
});
