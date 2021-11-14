import React, { FC } from "react";
import { GameList } from "components/GameList";
import { withErrorBoundary } from "hoc/withErrorBoundary";

const Home: FC = () => (
  <main>
    <GameList />
  </main>
);

export const HomeWithErrorBoundary = withErrorBoundary(Home);
