import styled from "styled-components";

export const Input = styled.input`
  padding: 5px 10px;
  color: white;
  border-radius: 10px;
  background-color: rgba(255, 224, 236, 0.15);

  &:focus::placeholder {
    opacity: 0;
    transition: opacity 0.7s ease;
  }
`;

export const Textarea = styled.textarea`
  padding: 5px 10px;
  color: white;
  border-radius: 10px;
  background-color: rgba(255, 224, 236, 0.15);
  width: 250px;
  height: 90px;
`;

export const ContainersInput = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-top: 12px;
  }
`;

export const ContainerInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
`;
