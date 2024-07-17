import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DeleteUserDialog } from './deleteUserDialog';
import { User } from '../data/users';
import { vitest } from 'vitest';

describe('DeleteUserDialog', () => {
  const user = {
    id: 1,
    name: 'John Doe',
  } as User;

  test('should render the DeleteUserDialog component with the user name', async () => {
    render(
      <DeleteUserDialog
        open={true}
        user={user}
        onCancel={() => {}}
        onDelete={() => {}}
        onEscapeKey={() => {}}
      />,
    );
    const dialogTitle = screen.getByText(`Delete User ${user.name}`);
    await waitFor(() => expect(dialogTitle).toBeInTheDocument());
  });

  test('should call the onDelete function when the delete button is clicked', async () => {
    const onDelete = vitest.fn();
    render(
      <DeleteUserDialog
        open={true}
        user={user}
        onCancel={() => {}}
        onDelete={onDelete}
        onEscapeKey={() => {}}
      />,
    );
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    await waitFor(() => expect(onDelete).toHaveBeenCalledWith(user.id));
  });

  test('should call the onCancel function when the cancel button is clicked', async () => {
    const onCancel = vitest.fn();
    render(
      <DeleteUserDialog
        open={true}
        user={user}
        onCancel={onCancel}
        onDelete={() => {}}
        onEscapeKey={() => {}}
      />,
    );
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    await waitFor(() => expect(onCancel).toHaveBeenCalled());
  });
});
