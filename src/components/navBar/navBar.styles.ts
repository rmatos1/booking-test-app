import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  HORIZONTAL_PADDING_DESKTOP,
  HORIZONTAL_PADDING_MOBILE,
} from '../../constants';

export const TopBar = styled.nav<{ $backgroundColor?: string }>`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 20px;
  padding: 0 ${HORIZONTAL_PADDING_DESKTOP};
  background-color: ${(props) => props.$backgroundColor || 'rgb(0, 117, 196)'};
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  z-index: 5;

  @media (max-width: 750px) {
    padding: 0 ${HORIZONTAL_PADDING_MOBILE};
  }
`;

export const StyledLink = styled(NavLink)<{ $isActive: boolean }>`
  color: ${(props) => (props.$isActive ? '#ffff4d' : '#fff')};
  opacity: ${(props) => (props.$isActive ? 1 : 0.7)};
  text-decoration: none;
  transition: opacity 0.15s;

  &:hover,
  &:active {
    opacity: 1;
  }
`;
