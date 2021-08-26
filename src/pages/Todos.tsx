import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Todo } from "components/Todo/Todo";
import { CustomBtn } from "components/UI/Buttons/styled";
import { Buttons } from "components/UI/modal/styled";
import { Header, TitleStrong, Main, P } from "./styled";
import { ContainerForBtnAdd } from "./styled";
import { AddTodo } from "components/Todo/AddTodo";
import { fetchTodo } from "store/actions/Todo";
import { restError } from "store/actions/Error";
import {
  isNotAuthorizationUser as isNotAuthorization,
  logOutUser,
} from "store/actions/User";
import { useTypeSelector } from "HOOK/useTypeSelector";
import { ModalWindow } from "components/UI/modal/Modal";
import crossAdd from "components/img/crossAdd.svg";

const user = () => localStorage.getItem("userName");

export const Todos = () => {
  const dispatch = useDispatch();
  const { todos, error, isNotAuthorizationUser } = useTypeSelector(
    (state) => state
  );
  const [isClose, setIsClose] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      dispatch(isNotAuthorization({ isNotAuthorization: true }));
    } else {
      dispatch(fetchTodo());
    }
    return () => {
      dispatch(isNotAuthorization({ isNotAuthorization: false }));
    };
  }, [dispatch]);

  const logOutHandler = () => {
    dispatch(logOutUser());
  };

  const closeModalWindowAddingTodo = (value: boolean) => {
    setIsClose(value);
  };

  const closeErrorModal = () => {
    dispatch(restError({ restError: "" }));
  };

  const addTodoHandler = () => {
    setIsClose(true);
  };

  const closeFormAddingTodo = (value: boolean) => {
    setIsClose(value);
  };

  return (
    <Main>
      {isNotAuthorizationUser && <Redirect to="login" />}
      <div>
        <Header data-testid="header">
          <TitleStrong>Hello {user()}</TitleStrong>, what are you up to ?
        </Header>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
        <Buttons>
          <CustomBtn onClick={logOutHandler}>LogOut</CustomBtn>

          <ContainerForBtnAdd onClick={addTodoHandler}>
            <img src={`${crossAdd}`} alt="#" />
          </ContainerForBtnAdd>
        </Buttons>

        {isClose && (
          <ModalWindow onCloseButtonClick={closeModalWindowAddingTodo}>
            <AddTodo onTodoAdded={closeFormAddingTodo} />
          </ModalWindow>
        )}

        {error.restError && (
          <ModalWindow onCloseButtonClick={closeErrorModal}>
            <P>{error.restError}</P>
          </ModalWindow>
        )}
      </div>
    </Main>
  );
};
