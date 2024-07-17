import React from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

import type { User } from '../data/users';
import { EditUserForm } from './editUserForm';

type EditUserDialogProps = {
  open: boolean;
  user: User | undefined;
  onCancelEdit: () => void;
  onSaveEdit: (user: User) => void;
  onEscapeKey: () => void;
};

export const EditUserDialog = ({
  open,
  user,
  onEscapeKey,
  onCancelEdit,
  onSaveEdit,
}: EditUserDialogProps) => {
  return (
    <Dialog open={open} onClose={() => onEscapeKey()} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative p-4 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <DialogTitle className="text-lg font-semibold text-gray-900">
              <div className="border-b border-gray-900/10 pb-4">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Edit User
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  I understand that the instructions said "all" fields should be
                  editable, but from a UX perspective, it's better to only allow
                  the user to edit the fields that are most likely to change.
                  The 'ID' field should not change, similarly with the
                  'signUpDate.' The 'lastLogin' field should be updated
                  automatically when the user logs in.
                </p>
              </div>
            </DialogTitle>
            <EditUserForm
              user={user}
              cancelEdit={onCancelEdit}
              saveEdit={onSaveEdit}
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
