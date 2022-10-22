import React from "react";
import styled from "styled-components";
import Link from "next/link";

interface IButtonProps {
  children: React.ReactNode;
  href: string;
}

const SendButton = styled.div`
  width: 11rem;
  height: 3.1rem;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background-color: #221ca7;
  transition: box-shadow 300ms;
  cursor: pointer;
  margin-right: 2rem;

  :hover {
    /* box-shadow: 0px 3px 15px 2px blue; */
  }
`;

const SButtonText = styled.div`
  color: white;
  font-size: 1.25rem;
  align-items: center;
  font-weight: 500;
`;

const Button: React.FC<IButtonProps> = ({ children, href }) => {
  return (
    <Link passHref={true} href={href}>
      <a>
        <SendButton>
          <SButtonText>{children}</SButtonText>
        </SendButton>
      </a>
    </Link>
  );
};

export default Button;
