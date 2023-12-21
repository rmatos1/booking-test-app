import styled, { css } from 'styled-components';
import { MOBILE } from '../../constants';

export const Table = styled.table`
  width: 100%;
  margin-bottom: 20px;
`;

export const TableTitle = styled.th`
  border-bottom: 1px solid #ccc;
  text-align: center;
  padding: 8px 0;
`;

const TdLine = css`
  display: block;
  padding: 8px 0 0;
  text-align: left;
`;

export const TdDescription = styled.td<{ $isLeftAligned?: boolean }>`
  text-align: ${(props) => (props.$isLeftAligned ? 'left' : 'right')};
  font-weight: 600;
  padding: 8px 0 0;
  width: 120px;

  @media (max-width: ${MOBILE}) {
    ${TdLine}
  }
`;

export const TdData = styled.td`
  padding: 8px 0 0 10px;
  text-align: left;

  @media (max-width: ${MOBILE}) {
    ${TdLine}
  }
`;
