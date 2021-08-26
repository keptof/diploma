import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ContainersInput, Input, Textarea } from "components/UI/Inputs/styled";
import { CustomBtn } from "components/UI/Buttons/styled";
import { addTodoAPI } from "store/actions/Todo";
import { useTypeSelector } from "HOOK/useTypeSelector";
import { isTaskInList } from "utils/isTaskInList";

interface Props {
  onTodoAdded: (a: boolean) => void;
}

export const AddTodo = (props: Props) => {
  const todos = useTypeSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({
    name: "",
    description: "",
  });
  const [isError, setIsError] = useState(false);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, name: e.target.value });
  };

  const descriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodo({ ...todo, description: e.target.value });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todo.name || !todo.description) {
      setIsDataEmpty(true);
      setIsError(false);
    } else if (!isTaskInList(todos, todo.name)) {
      const newTodo = {
        name: todo.name,
        description: todo.description,
        completed: false,
      };
      dispatch(addTodoAPI(newTodo));
      props.onTodoAdded(false);
    } else {
      setIsError(true);
      setIsDataEmpty(false);
    }

    setTodo({ name: "", description: "" });
  };

  return (
    <>
      <form onSubmit={submitHandler} data-testid="form">
        <ContainersInput>
          <Input
            placeholder="Enter the title"
            value={todo.name}
            data-testid="input"
            onChange={nameHandler}
          />
          <Textarea
            placeholder="Enter the description"
            value={todo.description}
            data-testid="textarea"
            onChange={descriptionHandler}
          />
          <CustomBtn type="submit" data-testid="btn">
            Add Todo
          </CustomBtn>
        </ContainersInput>
      </form>
      {isError && (
        <p data-testid="warningToPlan">
          <strong>We have the same plan already!</strong>
        </p>
      )}
      {isDataEmpty && (
        <p data-testid="emptyFieldWarning">
          <strong>Please fill in all the lines!</strong>
        </p>
      )}
    </>
  );
};
