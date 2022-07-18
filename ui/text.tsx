import styled from "styled-components";

type TextType = {
  text: string;
  className?: string;
  color?: string;
  cursor?: "on" | "off";
};

function Title({ text, className, color }: TextType) {
  return (
    <h1
      className={className}
      style={{ color: color, fontFamily: "var(--fontFamily)" }}
    >
      {text}
    </h1>
  );
}

export const MainTitle = styled(Title)`
  font-size: 48px;
  font-family: var(--fontFamily);
`;

function Subtitle({ text, className, color }: TextType) {
  return (
    <h4
      className={className}
      style={{ color: color, fontFamily: "var(--fontFamily)" }}
    >
      {text}
    </h4>
  );
}

export const MainSubtitle = styled(Subtitle)`
  font-size: 32px;
  margin: 0;
`;

function LargeText({ text, className, color, cursor }: TextType) {
  return (
    <p
      className={className}
      style={{
        color: color,
        margin: 0,
        cursor: cursor === "on" ? "pointer" : "initial",
        fontFamily: "var(--fontFamily)",
      }}
    >
      {text}
    </p>
  );
}

export const MainLargeText = styled(LargeText)`
  font-size: 20px;
`;

export const BoldLargeText = styled(LargeText)`
  font-size: 20px;
  font-weight: 700;
`;
export const MediumLargeText = styled(LargeText)`
  font-size: 16px;
`;
export const TinyLargeText = styled(LargeText)`
  font-size: 12px;
`;

function TextArea({ text, className }: TextType) {
  return <textarea className={className}>{text}</textarea>;
}

export const MainTextArea = styled(TextArea)`
  resize: none;
  font-size: 16px;
`;

export const BoldTextArea = styled(TextArea)`
  resize: none;
  font-size: 16px;
  font-weight: 700;
`;

export const TinyTextArea = styled(TextArea)`
  font-size: 12px;
  resize: none;
`;
