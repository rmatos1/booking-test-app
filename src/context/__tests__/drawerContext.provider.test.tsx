import { describe, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';

import { ReactNode } from 'react';
import { DrawerContext, IDrawerContext } from '..';
import { TestComponent } from '../../components';

const testElement: ReactNode = <div data-testid="test-element" />;

const testConsumerContext = (
  children: (value: IDrawerContext) => ReactNode
) => {
  return <DrawerContext.Consumer>{children}</DrawerContext.Consumer>;
};

const setup = (children: ReactNode): JSX.Element => {
  return <TestComponent>{children}</TestComponent>;
};

describe('<DrawerProvider />', () => {
  test('should render the defined children element correctly', () => {
    const wrapper = render(setup(testElement));

    const children = wrapper.getByTestId('test-element');

    expect(children).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the specified element after the click', () => {
    const context = testConsumerContext((value) => (
      <>
        <button
          onClick={() => value.setIsDrawerVisible(true)}
          data-testid="booking-button"
        ></button>

        {value.isDrawerVisible && <div data-testid="test-element" />}
      </>
    ));

    const wrapper = render(setup(context));

    const testElementNotVisible = wrapper.queryByTestId('test-element');  

    expect(testElementNotVisible).toBeNull();

    const bookingButton = wrapper.getByTestId('booking-button');
    fireEvent.click(bookingButton);

    const testElement = wrapper.getByTestId('test-element');

    expect(testElement).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
