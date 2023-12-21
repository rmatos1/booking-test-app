import { describe, test } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NavBar } from '..';

const setup = (): JSX.Element => {
  return (
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
};

describe('<NavBar />', () => {
  test('should render correctly', () => {
    const wrapper = render(setup());

    expect(wrapper).toMatchSnapshot();
  });

  test('link should become active on click', async () => {
    const wrapper = render(setup());

    const myBookingsLink = wrapper.getByText('My Bookings');

    fireEvent.click(myBookingsLink);

    await waitFor(() => {
      expect(myBookingsLink.classList.contains('active')).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
