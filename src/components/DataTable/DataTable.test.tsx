import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import DataTable from "./DataTable";

type Row = { id: string; name: string; age: number }; // Define the Row type

const columns = [
    { key: "name", header: "Name", accessor: "name", sortable: true }, // accessor is keyof Row
    { key: "age", header: "Age", accessor: "age", sortable: true }, // accessor is keyof Row
];

const data: Row[] = [
    { id: "1", name: "B", age: 20 },
    { id: "2", name: "A", age: 30 },
];

test("renders rows", () => {
    render(<DataTable data={data} columns={columns} rowKey="id" />);
    expect(screen.getByText(/B/)).toBeInTheDocument();
    expect(screen.getByText(/A/)).toBeInTheDocument();
});

test("sorts when header clicked", () => {
    render(<DataTable data={data} columns={columns} rowKey="id" sortable />);
    const nameHeader = screen.getByText("Name");
    fireEvent.click(nameHeader); // asc
    // first row should be A after asc
    const firstCell = screen.getAllByText(/A|B/)[0];
    expect(firstCell.textContent).toBe("A");
});

test("selection toggles", () => {
    const handleSelection = vi.fn();
    render(
        <DataTable data={data} columns={columns} rowKey="id" selectable selectionMode="multiple" onSelectionChange={handleSelection} />
    );
    const checkboxes = screen.getAllByRole("checkbox");
    // First checkbox is select-all; second/third are rows
    expect(checkboxes.length).toBeGreaterThanOrEqual(3);
    // click first row checkbox
    fireEvent.click(checkboxes[1]);
    expect(handleSelection).toHaveBeenCalled();
});
