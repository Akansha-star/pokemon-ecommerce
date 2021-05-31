import React from "react";
import styled from "styled-components";
import leftBtn from "./images/leftButton.png";
import rightBtn from "./images/rightButton.png"; 


const Button = styled.img`
  position: absolute;
  top: 50%;
  z-index: 10;
  height: 70px;
  width: 70px;
  padding: 20px;
  cursor: pointer;
  font-size: 15px;
  transform: translateY(-50%);
  left: ${(props) => props.side === "prev" && 5}px;
  right: ${(props) => props.side === "next" && 5}px;
`;
function Buttons({ handleClickPrev, handleClickNext }) {
  return (
    <>
      <Button src={leftBtn} side="prev" onClick={handleClickPrev} />
      <Button src={rightBtn} side="next" onClick={handleClickNext} />
    </>
  );
}
export default Buttons;
