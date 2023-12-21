import styled from 'styled-components';

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: clamp(320px, 100%, 600px);
  margin: 0 auto;
`;

export const Image = styled.img`
  width: min(100%, 300px);
  height: auto;
`;

export const Icon = styled.img<{ $customWidth?: number }>`
  width: 80px;
  height: auto;
`;
