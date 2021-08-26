import styled from "styled-components";

export const ContainerFromControls = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-left: 12px;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;

  img {
    filter: invert(73%) sepia(8%) saturate(556%) hue-rotate(345deg)
      brightness(89%) contrast(89%);
  }
`;

interface ITitleTodo {
  completed: boolean;
}

export const TodoTitle = styled.div<ITitleTodo>`
  ${({ completed }) =>
    completed &&
    `
    text-decoration: line-through;
    opacity: 0.6;
    color: #ccb699;
    `}
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: 12px 0;
`;

export const TodoBody = styled.div`
  word-break: break-all;
  margin-bottom: 12px;
`;

export const TodoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 450px;
  min-height: 50px;
  padding: 0 20px;
  margin: 10px 0;
  border: 1px solid #7b542d;
  border-radius: 15px;
  color: #d7ccc8;
`;

export const TodoText = styled.div``;
