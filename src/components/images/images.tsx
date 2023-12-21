import styled from 'styled-components';

const StyledImage = styled.img<{ $width?: string; $height?: string }>`
  width: ${(props) => props.$width || 'min(100%, 300px)'};
  height: ${(props) => props.$height || 'auto'};
  object-fit: cover;
`;

export interface IImage {
  width?: string;
  height?: string;
  imgSrc: string;
  alt?: string;
}

export const Image = ({ width, height, imgSrc, alt = '' }: IImage) => {
  return (
    <StyledImage
      $width={width}
      $height={height}
      src={imgSrc}
      alt={alt}
      data-testid="image"
    />
  );
};
