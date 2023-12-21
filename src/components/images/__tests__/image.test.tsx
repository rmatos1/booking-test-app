import { describe, test } from '@jest/globals';
import { render } from '@testing-library/react';

import { IImage, Image } from '..';

const defaultProps: IImage = {
  imgSrc: './test.jpg',
  alt: 'alt-text',
};

const setup = (componentProps?: IImage): JSX.Element => {
  const baseProps = componentProps || defaultProps;

  return <Image {...baseProps} />;
};

describe('<Image />', () => {
  test('should render correctly', () => {
    const wrapper = render(setup());

    expect(wrapper).toMatchSnapshot();
  });

  test('should render an image with the defined src and alt attributes', () => {
    const wrapper = render(setup());

    const img = wrapper.getByTestId('image');

    expect(img.getAttribute('src')).toBe(defaultProps.imgSrc);
    expect(img.getAttribute('alt')).toBe(defaultProps.alt);
  });
});
