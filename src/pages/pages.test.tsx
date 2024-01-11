import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import BankMap from './BankMap';
import Contacts from './Contacts';
import Home from './Home';
import NotFound from './NotFound';
import Root from './Root';
import TimeLine from './TimeLine';

describe('TimeLine', () => {
  it('Renders', async () => {
    act(() => {
      render(
        <MemoryRouter>
          <TimeLine />
        </MemoryRouter>,
      );
    });
    const elem = await screen.findByText(/Build currency rate chart/);
    expect(elem).toBeInTheDocument();
  });
});

describe('BankMap', () => {
  it('Renders', async () => {
    act(() => {
      render(
        <MemoryRouter>
          <BankMap />
        </MemoryRouter>,
      );
    });
    const elem = await screen.findByText(/Search currency in the bank/);
    expect(elem).toBeInTheDocument();
  });
});

describe('Contacts', () => {
  it('Renders', async () => {
    act(() => {
      render(
        <MemoryRouter>
          <Contacts />
        </MemoryRouter>,
      );
    });
    const elem = await screen.findByText(/Contacts/);
    expect(elem).toBeInTheDocument();
  });
});

describe('Home', () => {
  it('Renders', async () => {
    act(() => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>,
      );
    });
    const elem = await screen.findByText(/Quotes for/);
    expect(elem).toBeInTheDocument();
  });
});

describe('NotFound', () => {
  it('renders 404 error message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const errorMessage = screen.getByText(/Seems like the page you are looking for does not exist/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders back home button', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const backButton = screen.getByRole('link', { name: /Back Home/i });
    expect(backButton).toBeInTheDocument();
  });

  it('back home button links to home page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const backButton = screen.getByRole('link', { name: /Back Home/i });
    expect(backButton).toHaveAttribute('href', '/');
  });
  it('Redirects to NotFound for invalid path', async () => {
    render(
      <MemoryRouter initialEntries={['/wrong']}>
        <Root />
      </MemoryRouter>,
    );

    const notFoundText = screen.findByText(/Seems like the page you are looking for does not exist/i);
    expect(notFoundText).not.toBeNull();
  });
});
