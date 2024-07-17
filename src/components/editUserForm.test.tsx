import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EditUserForm } from './editUserForm';
import React from 'react';
import { User } from '../data/users';
import { vitest } from 'vitest';

describe('EditUserForm', () => {
  const user: User = {
    id: 10,
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Admin',
    status: 'Active',
    signUpDate: '2021-01-01',
    lastLogin: '2024-01-01',
  };

  test('should render the form with user data', () => {
    render(
      <EditUserForm
        user={user}
        saveEdit={vitest.fn()}
        cancelEdit={vitest.fn()}
      />,
    );

    expect(screen.getByLabelText('Name')).toHaveValue(user.name);
    expect(screen.getByLabelText('Email Address')).toHaveValue(user.email);
    expect(screen.getByRole('button', { name: /role/i })).toHaveTextContent(
      user.role,
    );
    expect(screen.getByRole('button', { name: /status/i })).toHaveTextContent(
      user.status,
    );
  });

  test('should display error message when name is not provided', async () => {
    render(
      <EditUserForm
        user={user}
        saveEdit={vitest.fn()}
        cancelEdit={vitest.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: '' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() =>
      expect(screen.getByText('Name is required.')).toBeInTheDocument(),
    );
  });

  test('should display error message when email is not provided', async () => {
    render(
      <EditUserForm
        user={user}
        saveEdit={vitest.fn()}
        cancelEdit={vitest.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: '' },
    });
    fireEvent.submit(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() =>
      expect(screen.getByText('Email is required.')).toBeInTheDocument(),
    );
  });

  test('should display error message when email is invalid', async () => {
    render(
      <EditUserForm
        user={user}
        saveEdit={vitest.fn()}
        cancelEdit={vitest.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'invalid-email' },
    });
    fireEvent.submit(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => {
      expect(screen.getByText('Invalid email address.')).toBeInTheDocument();
    });
  });

  // test.only('should display error message when role is not selected', () => {
  //   render(
  //     <EditUserForm
  //       user={user}
  //       saveEdit={vitest.fn()}
  //       cancelEdit={vitest.fn()}
  //     />,
  //   );

  //   fireEvent.change(screen.getByLabelText('Role'), { target: { value: '' } });
  //   fireEvent.submit(screen.getByRole('button', { name: 'Save' }));

  //   expect(screen.getByText('Role is required.')).toBeInTheDocument();
  // });

  // test('should display error message when status is not selected', () => {
  //   render(
  //     <EditUserForm
  //       user={user}
  //       saveEdit={vitest.fn()}
  //       cancelEdit={vitest.fn()}
  //     />,
  //   );

  //   fireEvent.change(screen.getByLabelText('Status'), {
  //     target: { value: '' },
  //   });
  //   fireEvent.submit(screen.getByRole('button', { name: 'Save' }));

  //   expect(screen.getByText('Status is required.')).toBeInTheDocument();
  // });

  test('should call saveEdit function with updated user data', async () => {
    const saveEdit = vitest.fn();
    const updatedUser = {
      ...user,
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      role: 'User',
      status: 'Inactive',
    };

    render(
      <EditUserForm user={user} saveEdit={saveEdit} cancelEdit={vitest.fn()} />,
    );

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: updatedUser.name },
    });
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: updatedUser.email },
    });
    const role = screen.getByRole('button', { name: /role/i });
    fireEvent.click(role);
    const updatedRole = screen.getByRole('option', { name: updatedUser.role });
    fireEvent.click(updatedRole);
    const status = screen.getByRole('button', { name: /status/i });
    fireEvent.click(status);
    const updatedStatus = screen.getByRole('option', {
      name: updatedUser.status,
    });
    fireEvent.click(updatedStatus);
    fireEvent.submit(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => {
      expect(saveEdit).toHaveBeenCalledWith(updatedUser);
    });
  });

  test('should call cancelEdit function when cancel button is clicked', () => {
    const cancelEdit = vitest.fn();

    render(
      <EditUserForm
        user={user}
        saveEdit={vitest.fn()}
        cancelEdit={cancelEdit}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(cancelEdit).toHaveBeenCalled();
  });
});
