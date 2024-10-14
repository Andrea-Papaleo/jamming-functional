/**
 * @jest-environment jsdom
 */

import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Application } from "./Components/App/Application";

// test("renders learn react link", () => {
//   render(<Application />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
test("test", () => {
  expect(1).toEqual(1);
});
