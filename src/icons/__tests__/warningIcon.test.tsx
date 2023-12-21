import { describe, test } from '@jest/globals';
import { render } from '@testing-library/react';

import { WarningIcon } from '..';

const setup = (): JSX.Element => {
  return <WarningIcon />;
};

describe('<WarningIcon />', () => {
  test('should render correctly', () => {
    const wrapper = render(setup());

    expect(wrapper).toMatchSnapshot();
  });
});
