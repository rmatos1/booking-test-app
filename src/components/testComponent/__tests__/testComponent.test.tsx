import { describe, test } from '@jest/globals';
import { render } from '@testing-library/react';

import { TestComponent } from '..';

const defaultProps = {
  children: <div data-testid="test-element" />,
};

const setup = (): JSX.Element => {
  return <TestComponent {...defaultProps} />;
};

describe('<TestComponent />', () => {
  test('should render correctly', () => {
    const wrapper = render(setup());

    expect(wrapper).toMatchSnapshot();
  });

  test('should render the defined children element', () => {
    const wrapper = render(setup());

    const children = wrapper.getByTestId('test-element');

    expect(children).toBeDefined();
  });
});
