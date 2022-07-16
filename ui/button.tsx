import styled from "styled-components";

type ButtonType = {
  text: string;
  className?: string;
  color?: string;
};

function Button({ text, className, color }: ButtonType) {
  return (
    <button
      style={{ color: color, fontFamily: "var(--fontFamily)" }}
      className={className}
    >
      {text}
    </button>
  );
}

export const HomeButton = styled(Button)`
  background-color: var(--blue);
  border-radius: 8px;
  border: none;
  padding: 6px;
  width: 335px;
  padding: 10px;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

export const LogInButton = styled(HomeButton)`
  background-color: var(--pink);
  @media (min-width: 1280px) {
    width: 150px;
  }
`;

export const SearchButton = styled(HomeButton)`
  background-color: var(--yellow);
  @media (min-width: 1280px) {
    width: 110px;
  }
`;
export const ProfileButton = styled(HomeButton)`
  background-color: var(--yellow);
`;
export const PurchaseButton = styled(HomeButton)`
  background-color: var(--cyan);
  padding: 15px;
  font-weight: bold;
`;
export const MakeOrderButton = styled(HomeButton)`
  background-color: var(--pink);
  width: 250px;
  border: solid 2px black;
  border-radius: 6px;
`;
