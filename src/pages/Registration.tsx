import { useDispatch } from "react-redux";
import React, { useState, useMemo, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Input, ContainerInput } from "components/UI/Inputs/styled";
import { CustomBtn } from "components/UI/Buttons/styled";
import { restError } from "store/actions/Error";
import {
  isAuthorizationUser as isAuthorization,
  registrationUserAPI,
} from "store/actions/User";
import { Background, Form, P } from "./styled";
import { Buttons } from "components/UI/modal/styled";
import { useTypeSelector } from "HOOK/useTypeSelector";
import { ModalWindow } from "components/UI/modal/Modal";

export const Registration = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(isAuthorization({ isAuthorization: true }));
    }
    return () => {
      dispatch(restError({ restError: "" }));
      dispatch(isAuthorization({ isAuthorization: false }));
    };
  }, []);
  const { error, isAuthorizationUser } = useTypeSelector((state) => state);

  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorName, setIsErrorName] = useState(false);

  const dispatch = useDispatch();
  const [value, setValue] = useState({
    email: "",
    name: "",
    password: "",
  });

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, email: event.target.value });
  };

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, password: event.target.value });
  };

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, name: event.target.value });
  };

  const isValidEmail = useMemo(() => value.email.length < 7, [value.email]);

  const isPasswordValid = useMemo(
    () => value.password.length < 7,
    [value.password]
  );

  const isNameValid = useMemo(() => value.name.length < 2, [value.name]);

  const isDisabled = useMemo(
    () => isValidEmail || isPasswordValid || isNameValid,
    [isValidEmail, isPasswordValid, isNameValid]
  );

  const blurNameHandler = () => {
    if (isNameValid) {
      setIsErrorName(true);
    } else {
      setIsErrorName(false);
    }
  };

  const blurEmailHandler = () => {
    if (isValidEmail) {
      setIsErrorEmail(true);
    } else {
      setIsErrorEmail(false);
    }
  };

  const blurPasswordHandler = () => {
    if (isPasswordValid) {
      setIsErrorPassword(true);
    } else {
      setIsErrorPassword(false);
    }
  };

  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const user = {
      email: value.email,
      name: value.name,
      password: value.password,
    };

    dispatch(registrationUserAPI(user));

    setValue({
      email: "",
      name: "",
      password: "",
    });
  };

  const closeModal = () => {
    dispatch(restError({ restError: "" }));
  };

  return (
    <Background>
      {isAuthorizationUser && <Redirect to="/todos" />}

      <Form onSubmit={handlerSubmit}>
        <ContainerInput>
          <label htmlFor="name">User Name</label>
          <Input
            placeholder="user name"
            id="name"
            value={value.name}
            onChange={nameHandler}
            onBlur={blurNameHandler}
            data-testid="nameInput"
          />
        </ContainerInput>

        {isErrorName && <P>Name must be at least 2 characters long</P>}

        <ContainerInput>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            placeholder="email"
            id="email"
            value={value.email}
            onChange={emailHandler}
            onBlur={blurEmailHandler}
            data-testid="emailInput"
          />
        </ContainerInput>

        {isErrorEmail && <P>Email must be at least 7 characters long</P>}
        {error.emailError && <P>{error.emailError}</P>}

        <ContainerInput>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            placeholder="Password"
            id="password"
            value={value.password}
            onChange={passwordHandler}
            onBlur={blurPasswordHandler}
          />
        </ContainerInput>

        {isErrorPassword && <P>Password must be at least 7 characters long</P>}
        {error.passwordError && <P>{error.passwordError}</P>}

        <Buttons>
          <CustomBtn type="submit" disabled={isDisabled}>
            Register
          </CustomBtn>

          <Link to="login">
            <CustomBtn>Go Login</CustomBtn>
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
