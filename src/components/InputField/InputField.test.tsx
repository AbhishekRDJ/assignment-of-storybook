import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./InputField";
import "@testing-library/jest-dom";

test("renders label and helper", () => {
    render(<InputField label="Email" helperText="we'll email you" />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/we'll email you/i)).toBeInTheDocument();
});

test("clear button clears value", () => {
    const handleChange = jest.fn();
    render(
        <InputField showClear label="Search" defaultValue="hello" onChange={handleChange} />
    );
    const button = screen.getByRole("button", { name: /clear input/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    // onChange receives empty value (fake event) for controlled patterns
    expect(handleChange).toHaveBeenCalled();
});
