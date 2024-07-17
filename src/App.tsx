import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { useUsers } from './data/users';
import type { User } from './data/users';
import { getUserColumnDefinitions } from './utils/userColDefinitions';
import { EditUserDialog } from './components/editUserDialog';
import { Table } from './components/table';
import { DeleteUserDialog } from './components/deleteUserDialog';

function App() {
  const { users, updateUser, removeUser } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [tableData, setTableData] = useState(users);

  const handleEditUser = useCallback(
    (userDetails?: User) => {
      setSelectedUser(userDetails);
      setIsEditing(true);
    },
    [setIsEditing, setSelectedUser],
  );

  const handleDeleteUser = useCallback(
    (userDetail: User) => {
      setSelectedUser(userDetail);
      setIsDelete(true);
    },
    [setIsDelete, setSelectedUser],
  );

  const handleCancel = useCallback(() => {
    setSelectedUser(undefined);
    setIsDelete(false);
    setIsEditing(false);
  }, [setIsEditing, setSelectedUser, setIsDelete]);

  const handleSaveEdit = useCallback(
    (data: User) => {
      updateUser(data);
      setIsEditing(false);
      setSelectedUser(undefined);
    },
    [setIsEditing, setSelectedUser, updateUser],
  );

  const handleDelete = useCallback(
    (userId: number) => {
      removeUser(userId);
      setIsDelete(false);
      setSelectedUser(undefined);
    },
    [setIsDelete, setSelectedUser, removeUser],
  );

  /**
   * The `columnDef` variable is a memoized value that is computed using the `getUserColumnDefinitions` function.
   * It determines the columns to be displayed in the table and specifies the actions to be performed when
   * interacting with each column.
   *
   * @param handleDeleteUser - The function to handle user deletion.
   * @param handleEditUser - The function to handle user editing.
   *
   * @returns The column definitions for the table.
   */
  const columnDef = useMemo(
    () =>
      getUserColumnDefinitions({
        handleDeleteUser,
        handleEditUser,
      }),
    [handleDeleteUser, handleEditUser],
  );

  const usersTable = useReactTable({
    data: tableData,
    columns: columnDef,
    getCoreRowModel: getCoreRowModel(),
  });

  /**
   * The `useEffect` hook is used to update the table data when the users change.
   */
  useEffect(() => {
    setTableData(users);
  }, [users]);

  return (
    <>
      <div className="container mx-auto mt-8 z-0">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                Users
              </h1>
              <p className="mt-2 max-w-4xl text-sm text-gray-500">
                A list of all the users in the account including their name,
                email, role, status, and dates for when created and last login.
              </p>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <Table table={usersTable} />
                {/* Empty Table */}
                {users.length === 0 && (
                  <h3 className="text-center mt-8 text-gray-500">
                    No users found.
                  </h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {Boolean(isEditing) && selectedUser && (
        <EditUserDialog
          open={isEditing}
          user={selectedUser}
          onCancelEdit={handleCancel}
          onSaveEdit={handleSaveEdit}
          onEscapeKey={handleCancel}
        />
      )}
      {Boolean(isDelete) && selectedUser && (
        <DeleteUserDialog
          open={isDelete}
          user={selectedUser}
          onCancel={handleCancel}
          onDelete={handleDelete}
          onEscapeKey={handleCancel}
        />
      )}
    </>
  );
}

export default App;
