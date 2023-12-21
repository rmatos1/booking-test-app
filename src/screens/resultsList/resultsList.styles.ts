import styled from 'styled-components';

export const ContainerPic = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 15px;
  background-color: #b5b5b5;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
`;

export const BedroomPic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Description = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const BedroomName = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 0.9;
`;

export const PriceGroup = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 10px;
`;

export const PriceText = styled.span`
  font-weight: 600;
  font-size: 20px;
`;
