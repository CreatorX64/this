import React, { FC } from "react";
import { GameList } from "components/GameList";
import { withErrorBoundary } from "hoc/withErrorBoundary";

const Home: FC = () => <GameList />;

export const HomeWithError = withErrorBoundary(Home);
