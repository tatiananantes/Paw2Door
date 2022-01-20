import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { render, screen } from "@testing-library/react";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("page has a title", () => {
  render(<App />);
  expect(screen.getByText("Pets available for adoption")).toBeInTheDocument();
});

it("page has postcode field", () => {
  const { container } = render(<App />);
  expect(
    screen.getByText("Enter your postcode to find pets near you:")
  ).toBeInTheDocument();
});

it("page has species field", () => {
  render(<App />);
  expect(screen.getByText("Species")).toBeInTheDocument();
});

it("find pets near me button is on homepage", () => {
  const { getByRole } = render(<App />);
  expect(getByRole('button', {name: 'Find pets near me'})).toBeInTheDocument();
});
