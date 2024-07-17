import { useEffect, useState } from 'react';

export const userRoles = ['Admin', 'User', 'Manager'] as const;
export const userStatuses = ['Active', 'Inactive', 'Pending'] as const;
type Role = (typeof userRoles)[number];
type Status = (typeof userStatuses)[number];

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: Status;
  signUpDate: string;
  lastLogin: string;
};

export const initialUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    signUpDate: '2023-01-15',
    lastLogin: '2024-07-01',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'Inactive',
    signUpDate: '2023-03-22',
    lastLogin: '2023-12-15',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'User',
    status: 'Active',
    signUpDate: '2023-05-10',
    lastLogin: '2024-06-30',
  },
  {
    id: 4,
    name: 'Bob Brown',
    email: 'bob.brown@example.com',
    role: 'Manager',
    status: 'Pending',
    signUpDate: '2023-07-01',
    lastLogin: '2023-07-01',
  },
  {
    id: 5,
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    role: 'User',
    status: 'Active',
    signUpDate: '2023-08-14',
    lastLogin: '2024-06-28',
  },
];

export const useUsers = () => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    setData(initialUsers);
  }, []);

  const updateUser = (updatedUser: User) => {
    setData(
      data.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
  };

  const removeUser = (userId: number) => {
    setData(data.filter((user) => user.id !== userId));
  };

  return { users: data, updateUser, removeUser };
};
