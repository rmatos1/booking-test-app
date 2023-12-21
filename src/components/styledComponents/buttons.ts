import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface IButton {
  $height?: number;
  $width?: number;
  $backgroundColor?: string;
  $isDisabled?: boolean;
  $fontSize?: number;
  $borderColor?: string;
  $color?: string;
  $hideBoxShadow?: boolean;
}

export const Button = styled.button<IButton>`
  width: ${(props) => (props.$width ? `${props.$width}px` : '100%')};
  height: ${(props) => (props.$height ? `${props.$height}px` : '50px')};
  border-radius: 10px;
  border: ${(props) =>
    props.$borderColor ? `1px solid ${props.$borderColor}` : 0};
  color: ${(props) => props.$color || '#fff'};
  cursor: pointer;
  transition: filter 0.15s, box-shadow 0.15s;
  background-color: ${(props) => props.$backgroundColor || '#0f71b3'};
  font-size: ${(props) => (props.$fontSize ? `${props.$fontSize}px` : '16px')};
  box-shadow: ${(props) =>
    props.$hideBoxShadow ? 0 : '0 2px 5px rgba(0, 0, 0, 0.15)'};
  box-sizing: border-box;

  &:not(:disabled) {
    &:hover,
    &:focus {
      filter: opacity(85%);
      box-shadow: ${(props) =>
        props.$hideBoxShadow ? 0 : '0 3.5px 9px rgba(0, 0, 0, 0.25)'};
    }
  }

  ${(props) =>
    props.$isDisabled &&
    css`
      background-color: #ddd;
      color: #868686;
      box-shadow: none;
      cursor: not-allowed;
      pointer-events: none;

      &:hover,
      &:focus,
      &:active {
        filter: none;
        box-shadow: none;
      }
    `}
`;

/**
 * component to show two or more buttons in line
 */
export const RowButtons = styled.div<{ $width?: number }>`
  width: ${(props) => (props.$width ? `${props.$width}px` : '100%')};
  display: flex;
  gap: 15px;
  justify-content: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #1395ec;
`;
