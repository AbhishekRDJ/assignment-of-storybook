import { type Meta, type StoryObj } from "@storybook/react-vite";
import { DataTable } from "./DataTable";
import type { Column } from "./DataTable.types";

type Row = { id: string; name: string; email: string; age: number; role?: string };

const meta: Meta<typeof DataTable<Row>> = {
    title: "Components/DataTable",
    component: DataTable<Row>,
    tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof DataTable<Row>>;

const columns: Column<Row>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "age", label: "Age", sortable: true },
    {
        key: "role",
        label: "Role",
        render: (value) => <span className="text-gray-600 text-sm">{value ?? "—"}</span>,
    },
];

const sampleData: Row[] = [
    { id: "1", name: "Aisha Khan", email: "aisha@example.com", age: 28, role: "Designer" },
    { id: "2", name: "Rohit Sharma", email: "rohit@example.com", age: 32, role: "Engineer" },
    { id: "3", name: "Maya Rao", email: "maya@example.com", age: 24 },
    { id: "4", name: "John Mathew", email: "john@example.com", age: 40, role: "Manager" },
];

export const Default: Story = {
    args: {
        data: sampleData,
        columns,
    },
};

export const Sortable: Story = {
    args: {
        data: sampleData,
        columns,
        sortable: true,
    },
};

export const WithCustomStyling: Story = {
    args: {
        data: sampleData,
        columns,
        sortable: true,
        className: "border-2 border-blue-200 rounded-lg",
    },
};
