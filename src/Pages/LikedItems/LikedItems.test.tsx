import React from 'react';
import { render as rtlrender, cleanup, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../Redux/Store';
import { BrowserRouter } from 'react-router-dom';
import LikedItems from './LikedItems';

const render = (component: any) => rtlrender(<Provider store={store}>{component}</Provider>);
afterEach(cleanup);

describe('LikedItems', () => {
  test('render LikedItems component Without crashing', () => {
    render(
      <BrowserRouter>
        <LikedItems />
      </BrowserRouter>
    );
  });

  test('submit-button', () => {
    render(
      <BrowserRouter>
        <LikedItems />
      </BrowserRouter>
    );
    const titleElement = screen.getByText('LikedItems');
    expect(titleElement).toBeInTheDocument();
  });
});
