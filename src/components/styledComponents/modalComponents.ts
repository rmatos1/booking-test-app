import styled from "styled-components";

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
`;

export const Overlay = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
`;

export const Modal = styled.div`
  width: min(100%, 450px);
  border-radius: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px 25px;
  margin: 0 10px;
  position: relative;
  z-index: 11;
  background-color: #fff;
`;

export const TopModal = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b9b9b9;
  border: 1px solid #b9b9b9;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 13px;
  background-color: transparent;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.6;
  }
`;
