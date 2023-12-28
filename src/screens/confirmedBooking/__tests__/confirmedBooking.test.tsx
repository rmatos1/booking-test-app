import { describe, test } from '@jest/globals';
import { render } from "@testing-library/react";

import { ConfirmedBooking } from "..";
import { TestComponent } from '../../../components';

const setup = (): JSX.Element => {
  return(
    <TestComponent>
      <ConfirmedBooking />
    </TestComponent>
  )
};

describe('<ConfirmedBooking />', () => {
  test('should render correctly', () => {

    const wrapper = render(setup());

    expect(wrapper).toMatchSnapshot();
  });


});
