import styled from 'styled-components';

export const Form = styled.form<{
  $backgroundColor?: string;
  $borderRadius?: number;
}>`
  width: min(100%, 350px);
  background: ${(props) => props.$backgroundColor || 'transparent'};
  border-radius: ${(props) =>
    props.$borderRadius ? `${props.$borderRadius}px` : 0};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
  padding: 20px 20px 30px;
  box-sizing: border-box;
  flex-shrink: 0;
`;

export const TitleForm = styled.h3`
  font-size: 20px;
  line-height: 1;
  color: #545454;
`;
