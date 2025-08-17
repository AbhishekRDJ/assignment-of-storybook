import { useState } from 'react'
import { DataTable } from './components/DataTable/DataTable'
import { InputField } from './components/InputField/InputField'
import type { Column } from './components/DataTable/DataTable.types'
import './App.css'

// Sample data for the DataTable
type User = {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  lastLogin: string
}

const sampleUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', lastLogin: '2024-01-10' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', lastLogin: '2024-01-13' },
]

const columns: Column<User>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
        {value}
      </span>
    )
  },
  { key: 'lastLogin', label: 'Last Login', sortable: true },
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  const handleSort = (key: keyof User, direction: 'asc' | 'desc') => {
    console.log(`Sorting by ${String(key)} in ${direction} order`)
  }

  const filteredUsers = sampleUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = !selectedRole || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-bold text-gray-900 text-4xl">
            My UI Component Library
          </h1>
          <p className="mx-auto max-w-3xl text-gray-600 text-xl">
            A modern React component library built with TypeScript, Vite, Tailwind CSS, and Storybook.
            Explore the components below or check out the Storybook documentation.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white shadow-sm mb-8 p-6 rounded-lg">
          <h2 className="mb-4 font-semibold text-gray-900 text-2xl">Search & Filter</h2>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <InputField
              label="Search Users"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              size="lg"
            />
            <InputField
              label="Filter by Role"
              placeholder="Select role..."
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              variant="outlined"
              size="lg"
            />
          </div>
        </div>

        {/* DataTable Demo */}
        <div className="bg-white shadow-sm mb-8 p-6 rounded-lg">
          <h2 className="mb-4 font-semibold text-gray-900 text-2xl">User Management</h2>
          <p className="mb-4 text-gray-600">
            Interactive data table with sorting capabilities. Click on column headers to sort.
          </p>
          <DataTable
            data={filteredUsers}
            columns={columns}
            sortable={true}
            onSort={handleSort}
            className="border border-gray-200 rounded-lg"
          />
        </div>

        {/* Component Showcase */}
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
          {/* InputField Examples */}
          <div className="bg-white shadow-sm p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 text-xl">Input Field Variants</h3>
            <div className="space-y-4">
              <InputField
                label="Default Input"
                placeholder="Enter text..."
                helperText="This is a helper text"
              />
              <InputField
                label="Outlined Input"
                placeholder="Outlined style..."
                variant="outlined"
                helperText="Outlined variant with helper text"
              />
              <InputField
                label="Filled Input"
                placeholder="Filled style..."
                variant="filled"
                helperText="Filled variant with helper text"
              />
              <InputField
                label="Input with Error"
                placeholder="Error state..."
                errorMessage="This field has an error"
                helperText="Error message will override helper text"
              />
            </div>
          </div>

          {/* Features */}
          <div className="bg-white shadow-sm p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-900 text-xl">Features</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="bg-blue-500 mr-3 rounded-full w-2 h-2"></span>
                TypeScript support with strict type checking
              </li>
              <li className="flex items-center">
                <span className="bg-blue-500 mr-3 rounded-full w-2 h-2"></span>
                Tailwind CSS for modern styling
              </li>
              <li className="flex items-center">
                <span className="bg-blue-500 mr-3 rounded-full w-2 h-2"></span>
                Storybook for component documentation
              </li>
              <li className="flex items-center">
                <span className="bg-blue-500 mr-3 rounded-full w-2 h-2"></span>
                Vite for fast development and building
              </li>
              <li className="flex items-center">
                <span className="bg-blue-500 mr-3 rounded-full w-2 h-2"></span>
                ESLint for code quality
              </li>
              <li className="flex items-center">
                <span className="bg-blue-500 mr-3 rounded-full w-2 h-2"></span>
                Responsive design
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-gray-200 border-t text-center">
          <p className="text-gray-500">
            Built with ❤️ using React, TypeScript, Vite, Tailwind CSS, and Storybook
          </p>
          <div className="space-x-4 mt-4">
            <a
              href="http://localhost:6006"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              View Storybook →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
