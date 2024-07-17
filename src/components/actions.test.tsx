import { render, screen, fireEvent } from '@testing-library/react';
import { ActionsButton } from './actions';
import { vitest } from 'vitest';
import React from 'react';

describe('ActionsButton', () => {
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  test('should render the ActionsButton component', () => {
    render(
      <ActionsButton
        onEditUser={vitest.fn()}
        info={{ row: { original: user } } as any}
        onDeleteUser={vitest.fn()}
      />,
    );

    const actionsButton = screen.getByRole('button', {
      name: 'Open Table Actions',
    });
    expect(actionsButton).toBeInTheDocument();
  });

  test('should call onEditUser when Edit action is clicked', () => {
    const onEditUser = vitest.fn();
    render(
      <ActionsButton
        onEditUser={onEditUser}
        info={{ row: { original: user } } as any}
        onDeleteUser={vitest.fn()}
      />,
    );

    const actionsButton = screen.getByRole('button', {
      name: 'Open Table Actions',
    });
    fireEvent.click(actionsButton);
    const editButton = screen.getByRole('menuitem', { name: 'Edit' });

    fireEvent.click(editButton);
    expect(onEditUser).toHaveBeenCalledWith(user);
  });

  test('should call onDeleteUser when Delete action is clicked', () => {
    const onDeleteUser = vitest.fn();
    render(
      <ActionsButton
        onEditUser={vitest.fn()}
        info={{ row: { original: user } } as any}
        onDeleteUser={onDeleteUser}
      />,
    );

    const actionsButton = screen.getByRole('button', {
      name: 'Open Table Actions',
    });
    fireEvent.click(actionsButton);
    const deleteButton = screen.getByRole('menuitem', { name: 'Delete' });

    fireEvent.click(deleteButton);
    expect(onDeleteUser).toHaveBeenCalledWith(user);
  });
});
