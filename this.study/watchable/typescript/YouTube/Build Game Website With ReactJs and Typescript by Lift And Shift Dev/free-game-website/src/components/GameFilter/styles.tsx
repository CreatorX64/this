import styled from "styled-components";
import { breakpoints } from "styles/breakpoints";
import { backgroundColor, secondaryTextColor } from "styles/theme";

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  max-width: 542px;
  margin: 24px auto;
  padding: 0 16px;
  color: ${secondaryTextColor};

  @media (min-width: ${breakpoints.tablet}) {
    max-width: ${breakpoints.tablet};
  }

  @media (min-width: ${breakpoints.desktop}) {
    max-width: 1010px;
  }
`;

export const Label = styled.label`
  margin-right: 16px;
  flex-basis: 25%;

  &:last-of-type {
    margin-right: 0;
  }
`;

export const Select = styled.select`
  width: 100%;
  margin-top: 0;
  color: white;
  background-color: ${backgroundColor};
`;
