import styled from 'styled-components';

export const ListContainer = styled.ul<{ $isRowOriented?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: ${(props) => (props.$isRowOriented ? 'row' : 'column')};
  flex-wrap: wrap;
  gap: 20px;
  padding-left: 0;
`;

export const ListItem = styled.li<{ $isColumnOriented?: boolean }>`
  width: ${(props) => (props.$isColumnOriented ? 'min(100%, 400px)' : '100%')};
  padding: 10px 15px 20px;
  display: flex;
  flex-direction: ${(props) => (props.$isColumnOriented ? 'column' : 'row')};
  gap: 15px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 12px;
  height: fit-content;
  flex-wrap: wrap;
`;
