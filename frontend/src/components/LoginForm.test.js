import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { render, screen } from "@testing-library/react";

it("page has a title", () => {
  render(<App />);
  expect(screen.getByText("Login")).toBeInTheDocument();
});

it("page has sign up link", () => {
  render(<App />);
  expect(screen.getByText("Sign up")).toBeInTheDocument();
});

it("page has a title", () => {
  render(<App />);
  expect(screen.getByText("Paw2Door")).toBeInTheDocument();
});
