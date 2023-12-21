import { describe, test } from '@jest/globals';
import { render } from '@testing-library/react';
import { TestComponent } from '../../../components';

import { BaseDrawer } from '..';

const defaultProps = {
  children: <div data-testid="test-element" />,
};

const setup = (): JSX.Element => {
  return (
    <TestComponent>
      <BaseDrawer {...defaultProps} />
    </TestComponent>
  );
};

describe('<BaseDrawer />', () => {
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
