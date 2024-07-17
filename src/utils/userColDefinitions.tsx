import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '../data/users';
import { ActionsButton } from '../components/actions';
import { StatusPill } from '../components/statusPill';

export type ColumnDefinitions = ColumnDef<User>[];
export type ColumnDefProps = {
  handleDeleteUser: (userDetail: User) => void;
  handleEditUser: (userDetail: User) => void;
};

export const getUserColumnDefinitions = ({
  handleDeleteUser,
  handleEditUser,
}: ColumnDefProps): ColumnDefinitions => {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (props) => {
        const value = props.getValue() as string;
        return <StatusPill status={value} />;
      },
    },
    {
      accessorKey: 'signUpDate',
      header: 'Sign Up Date',
      cell: (props) => {
        return (
          <div>{new Date(props.getValue() as string).toLocaleDateString()}</div>
        );
      },
    },
    {
      accessorKey: 'lastLogin',
      header: 'Last Login',
      cell: (props) => {
        return (
          <div>{new Date(props.getValue() as string).toLocaleDateString()}</div>
        );
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (info) => {
        return (
          <ActionsButton
            info={info}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        );
      },
    },
  ];
};
