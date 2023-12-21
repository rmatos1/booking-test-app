import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const Label = styled.label`
  color: #757575;
  font-size: 14px;
  line-height: 0.9;
  margin-left: 5px;
  text-transform: capitalize;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  border: ${(props) =>
    props.$hasError ? '1px solid #ff3333' : '1px solid #ccc'};
  height: 50px;
  padding: 0 10px;
  width: calc(100% - 24px);

  &:focus {
    border-color: rgba(0, 117, 196, 1);
    outline: 1px solid rgba(0, 117, 196, 1);
  }
`;
