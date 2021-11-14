import React, { FC, Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeWithErrorBoundary as Home } from "components/Home";
import { GlobalStyles } from "components/GlobalStyles";

export const App: FC = () => (
  <Fragment>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </Fragment>
);
