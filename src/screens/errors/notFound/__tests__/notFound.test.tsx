import { describe, test } from '@jest/globals';
import { render } from "@testing-library/react";

import { NotFound } from "..";

import { MemoryRouter } from "react-router-dom";


const setup = (): JSX.Element => {
  return(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  )
};

describe('<NotFound />', () => {
  test('should render correctly', () => {
    const wrapper = render(setup());

    expect(wrapper).toMatchSnapshot();
  });
});
