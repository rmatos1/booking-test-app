import { describe, test } from '@jest/globals';
import { render } from '@testing-library/react';

import { IImage, Image } from '..';

const defaultProps: IImage = {
  imgSrc: './test.jpg',
};

const setup = (componentProps?: IImage): JSX.Element => {
  const baseProps = componentProps || defaultProps;

  return <Image {...baseProps} />;
};

describe('<Image />', () => {
 
  test('should render correctly an image with the defined src attribute', () => {
    const wrapper = render(setup());

    const img = wrapper.getByTestId('image');

    expect(img.getAttribute('src')).toBe(defaultProps.imgSrc);
   
    expect(wrapper).toMatchSnapshot();
  });

  test('should render correctly an image with the defined alt attributes', () => {

    const ALT = "alt-test";

    const wrapper = render(setup({ ...defaultProps, alt: ALT }));

    const img = wrapper.getByTestId('image');

    expect(img.getAttribute('alt')).toBe(ALT);

    expect(wrapper).toMatchSnapshot();
  });
});
