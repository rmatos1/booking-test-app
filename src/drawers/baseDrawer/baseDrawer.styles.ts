import styled from "styled-components";
import { MOBILE } from "../../constants";

export const Drawer = styled.div<{ $showDrawer: boolean }>`
  width: min(100%, 450px);
  min-height: 100vh;
  background-color: #fff;
  border-radius: 20px 0 0 20px;
  position: fixed;
  z-index: 11;
  top: 0;
  right: 0;
  transition: transform 0.25s;
  transform: ${(props) =>
    props.$showDrawer ? "translateX(0)" : "translateX(450px)"};
  box-sizing: border-box;
  padding: 20px 15px;

  @media (max-width: ${MOBILE}) {
    width: 100%;
    border-radius: 0;
    transform: ${(props) =>
      props.$showDrawer ? "translateX(0)" : "translateX(100%)"};
  }
`;
