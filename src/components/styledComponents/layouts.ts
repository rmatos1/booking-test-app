import styled from 'styled-components';
import {
  HORIZONTAL_PADDING_DESKTOP,
  HORIZONTAL_PADDING_MOBILE,
  SMALL_DESKTOP,
  TABLET,
} from '../../constants';

export const CenteredContentWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 40px ${HORIZONTAL_PADDING_DESKTOP};
  gap: 20px;

  @media (max-width: ${TABLET}) {
    flex-direction: column;
    padding: 40px ${HORIZONTAL_PADDING_MOBILE};
  }
`;

export const TwoColumnsGrid = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 100px ${HORIZONTAL_PADDING_DESKTOP} 40px;
  display: grid;
  grid-template-columns: minmax(0, 350px) auto;
  column-gap: 25px;
  box-sizing: border-box;

  @media (max-width: ${SMALL_DESKTOP}) {
    padding: 100px ${HORIZONTAL_PADDING_MOBILE} 40px;
    grid-template-columns: 1fr;
  }
`;
