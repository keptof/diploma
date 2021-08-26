import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  ContainerFromControls,
  ActionContainer,
  TodoTitle,
  TodoBody,
  TodoContainer,
  TodoText,
} from "./styled";
import { removeTodoAPI, completedTodoAPI } from "store/actions/Todo";
import trashCan from "components/img/delete.svg";
import { TodoModel } from "models/todoModel";

interface ITodo {
  todo: TodoModel;
}

export const Todo = (props: ITodo) => {
  const { todo } = props;
  const dispatch = useDispatch();
  const [openingTodoBody, setOpeningTodoBody] = useState(false);

  const removeHandler = () => {
    dispatch(removeTodoAPI({ id: todo.id! }));
  };

  const completeHandler = () => {
    dispatch(
      completedTodoAPI({
        id: todo.id!,
        completed: !todo.completed,
      })
    );
  };

  const openTodoBody = () => {
    setOpeningTodoBody((previousState) => !previousState);
  };

  return (
    <>
      <TodoContainer>
        <TodoText>
          <TodoTitle
            completed={todo.completed}
            onClick={openTodoBody}
            data-testid="title"
          >
            {todo.name}
          </TodoTitle>
          {openingTodoBody && (
            <TodoBody data-testid="description">{todo.description}</TodoBody>
          )}
        </TodoText>

        <ContainerFromControls>
          <ActionContainer>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={completeHandler}
              data-testid="checkbox"
            />
          </ActionContainer>
          <ActionContainer>
            <img
              src={`${trashCan}`}
              alt="#"
              onClick={removeHandler}
              data-testid="btn"
            />
          </ActionContainer>
        </ContainerFromControls>
      </TodoContainer>
    </>
  );
};
