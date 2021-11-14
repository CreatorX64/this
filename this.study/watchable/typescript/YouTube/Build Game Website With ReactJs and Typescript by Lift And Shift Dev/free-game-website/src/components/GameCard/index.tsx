import React, { FC } from "react";
import { Game } from "types";
import {
  StyledLink,
  Img,
  Title,
  Details,
  Description,
  Genre,
  Icon
} from "./styles";
import browserIcon from "assets/icons/browser.svg";
import windowsIcon from "assets/icons/windows.svg";
import { BROWSER, WINDOWS } from "./constants";

type Props = {
  content: Game;
};

export const GameCard: FC<Props> = ({ content }) => {
  const { id, title, thumbnail, short_description, genre, platform } = content;
  const icons = platform.split(",").map((p) => {
    let icon = null;

    switch (p.trim()) {
      case BROWSER:
        icon = (
          <Icon key={`${id}-browser`} src={browserIcon} alt="Browser icon" />
        );
        break;
      case WINDOWS:
        icon = (
          <Icon key={`${id}-windows`} src={windowsIcon} alt="Windows icon" />
        );
        break;
      default:
        break;
    }

    return icon;
  });

  return (
    <StyledLink to={`/game/${id}`}>
      <Img alt={`${title} logo`} src={thumbnail} />
      <Details>
        <Title>{title}</Title>
        <Description>{short_description}</Description>
        <Genre>{genre}</Genre>
        {icons}
      </Details>
    </StyledLink>
  );
};
