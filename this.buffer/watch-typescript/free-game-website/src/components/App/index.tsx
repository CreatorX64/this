import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeWithError as Home } from "components/Home";

export const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
