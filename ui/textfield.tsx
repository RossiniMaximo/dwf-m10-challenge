import styled from "styled-components";

type TextFieldType = {
  text?: string;
  type: string;
  placeholder: string;
  name: string;
  inputClass?: string;
};

const Input = styled.input`
  outline: none;
  border-radius: 8px;
  border: solid 2px;
  font-size: 16px;
  width: 335px;
  padding: 10px;
`;
export const PurchaseInput = styled(Input)`
  width: 250px;
`;

const Parrafo = styled.p`
  margin: 0;
  font-size: 14px;
`;

export function TextField({
  text,
  type,
  placeholder,
  inputClass,
  name,
}: TextFieldType) {
  return (
    <label>
      <Parrafo>{text}</Parrafo>
      <Input type={type} placeholder={placeholder} name={name} />
    </label>
  );
}
export function TextFieldNoAutocomplete({
  text,
  type,
  placeholder,
  inputClass,
  name,
}: TextFieldType) {
  return (
    <label style={{ fontFamily: "var(--fontFamily)" }}>
      <Parrafo>{text}</Parrafo>
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        autoComplete="off"
      />
    </label>
  );
}
