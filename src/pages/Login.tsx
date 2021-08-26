import React, { useEffect, useMemo, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input, ContainerInput } from "components/UI/Inputs/styled";
import { CustomBtn } from "components/UI/Buttons/styled";
import { restError } from "store/actions/Error";
import {
  isAuthorizationUser as isAuthorization,
  loginUserAPI,
} from "../store/actions/User";
import { Background, Form, P } from "./styled";
import { Buttons } from "components/UI/modal/styled";
import { useTypeSelector } from "HOOK/useTypeSelector";
import { ModalWindow } from "components/UI/modal/Modal";

export const Login = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(isAuthorization({ isAuthorization: true }));
    }
    return () => {
      dispatch(restError({ restError: "" }));
      dispatch(isAuthorization({ isAuthorization: false }));
    };
  }, []);

  const dispatch = useDispatch();
  const { error, isAuthorizationUser } = useTypeSelector((state) => state);
  const [stateEmail, setStateEmail] = useState(false);
  const [statePassword, setStatePassword] = useState(false);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue({ ...value, email: e.target.value });

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue({ ...value, password: e.target.value });

  const isEmailValid = useMemo(() => value.email.length < 7, [value.email]);

  const isPasswordValid = useMemo(
    () => value.password.length < 7,
    [value.password]
  );

  const blurEmailHandler = () => {
    if (isEmailValid) {
      setStateEmail(true);
    } else {
      setStateEmail(false);
    }
  };

  const blurPasswordHandler = () => {
    if (isPasswordValid) {
      setStatePassword(true);
    } else {
      setStatePassword(false);
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const user = {
      email: value.email,
      password: value.password,
    };

    dispatch(loginUserAPI(user));

    setValue({
      email: "",
      password: "",
    });
  };

  const closeModal = () => {
    dispatch(restError({ restError: "" }));
  };

  return (
    <Background>
      {isAuthorizationUser && <Redirect to="/todos" />}

      <Form onSubmit={submitHandler}>
        <ContainerInput>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="email"
            id="email"
            value={value.email}
            onBlur={blurEmailHandler}
            onChange={emailHandler}
            data-testid="email"
          />
        </ContainerInput>
        {stateEmail && <P>Email must be at least 7 characters long</P>}
        {error.emailError && <P>{error.emailError}</P>}

        <ContainerInput>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            placeholder="Password"
            id="password"
            onChange={passwordHandler}
            value={value.password}
            onBlur={blurPasswordHandler}
            data-testid="inputPassword"
          />
        </ContainerInput>
        {statePassword && <P>Password must be at least 7 characters long</P>}
        {error.passwordError && <P>{error.passwordError}</P>}

        <Buttons>
          <CustomBtn
            type="submit"
            disabled={isEmailValid || isPasswordValid}
            data-testid="btn"
          >
            Login
          </CustomBtn>

          <Link to="/registration">
            <CustomBtn>Go register</CustomBtn>
          </Link>
        </Buttons>

        {error.restError && (
          <ModalWindow onCloseButtonClick={closeModal}>
            <P>{error.restError}</P>
          </ModalWindow>
        )}
      </Form>
    </Background>
  );
};
