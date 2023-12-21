import styled, { css } from 'styled-components';

export const TextWrapper = styled.div<{
  $color?: string;
  $isAlignedLeft?: boolean;
  $maxWidth?: number;
}>`
  width: 100%;
  max-width: ${(props) => (props.$maxWidth ? `${props.$maxWidth}px` : '600px')};
  color: ${(props) => props.$color || 'rgba(0, 0, 0, 0.87)'};
  text-align: ${(props) => (props.$isAlignedLeft ? 'left' : 'center')};

  @media (max-width: 750px) {
    text-align: center;
  }
`;

const baseText = css`
  font-weight: 600;
  line-height: 1;
`;

export const PageTitle = styled.h1`
  ${baseText};
  font-size: 36px;
`;

export const PageSubtitle = styled.h4`
  ${baseText};
  font-size: 20px;
`;

export const ErrorText = styled.span<{ $isCentered?: boolean }>`
  font-size: 14px;
  color: #ff3333;
  text-align: ${(props) => (props.$isCentered ? 'center' : 'left')};
`;
