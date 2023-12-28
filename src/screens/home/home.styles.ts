import styled from 'styled-components';
import { images } from '../../assets';
import {
  HORIZONTAL_PADDING_DESKTOP,
  HORIZONTAL_PADDING_MOBILE,
  TABLET,
} from '../../constants';

export const Wrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: #ccc;
  background-image: url(${images.resort});
  background-position: center;
  background-size: cover;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
  }
`;

export const Container = styled.div`
  width: min(100%, 990px);
  margin: 40px ${HORIZONTAL_PADDING_DESKTOP};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  position: relative;
  z-index: 2;

  @media (max-width: ${TABLET}) {
    flex-direction: column;
    margin: 60px ${HORIZONTAL_PADDING_MOBILE} 40px;
  }
`;
