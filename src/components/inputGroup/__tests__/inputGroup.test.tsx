import { describe, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';

import { IInputGroup, InputGroup } from '..';

const defaultProps: IInputGroup = {
  label: 'name',
  name: 'name',
  value: '',
  onChange: jest.fn(),
};

const setup = (componentProps?: IInputGroup): JSX.Element => {
  const baseProps = componentProps || defaultProps;

  return <InputGroup {...baseProps} />;
};

describe('<InputGroup />', () => {
  test('should render correctly the specified label', () => {
    const wrapper = render(setup());

    const label = wrapper.getByTestId('label');

    expect(label.textContent).toContain(defaultProps.label);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the specified value and call onChange', () => {
    const wrapper = render(setup());

    const input = wrapper.getByTestId('input-group') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input.value).toBe(defaultProps.value);
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the error text', () => {
    const wrapper = render(setup());

    const input = wrapper.getByTestId('input-group') as HTMLInputElement;

    fireEvent.focus(input);
    fireEvent.blur(input);

    const errorText = wrapper.getByTestId('error-text');

    expect(errorText).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test('should have the attributes min and max when type is number', () => {
    const min = 1;
    const max = 5;

    const wrapper = render(
      setup({ ...defaultProps, type: 'number', min, max })
    );

    const input = wrapper.getByTestId('input-group') as HTMLInputElement;

    expect(input.type).toBe('number');
    expect(input.getAttribute('min')).toBe(min.toString());
    expect(input.getAttribute('max')).toBe(max.toString());
  });
});
