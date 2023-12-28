import { describe, test } from '@jest/globals';
import { render } from "@testing-library/react";

import { ErrorBoundary, IErrorBoundaryProps } from "..";



const defaultProps: IErrorBoundaryProps = {
    children: <div data-testid="children-element" />
}

const ErrorThrower = () => {
    throw new Error('Test error');
  };

const setup = (componentProps?: IErrorBoundaryProps): JSX.Element => {

    const baseProps = componentProps || defaultProps;

  return(
    <ErrorBoundary {...baseProps} />
  )
};

describe('<ErrorBoundary />', () => {
  test('should render correctly the defined children element', () => {
    const wrapper = render(setup());

    const children = wrapper.getByTestId("children-element");

    expect(children).toBeDefined()
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the error page whenever an error happens",  () => {
   
    const wrapper = render(setup({ children: <div><ErrorThrower  /></div> }));

    const gotErrorTitle = wrapper.getByTestId("got-error-title")

    expect(gotErrorTitle).toBeDefined()
    expect(wrapper).toMatchSnapshot();
  })
});
