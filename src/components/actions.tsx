import React from 'react';
import { CellContext } from '@tanstack/react-table';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';

import { User } from '../data/users';

type ActionsButtonProps = {
  onEditUser: (userDetails: User) => void;
  info: CellContext<User, any>;
  onDeleteUser: (userDetails: User) => void;
};

/**
 * Renders a button with actions for editing and deleting a user.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onEditUser - The function to call when the edit button is clicked.
 * @param {Object} props.info - The user information.
 * @param {Function} props.onDeleteUser - The function to call when the delete button is clicked.
 * @returns {JSX.Element} The rendered ActionsButton component.
 */
export const ActionsButton = ({
  onEditUser,
  info,
  onDeleteUser,
}: ActionsButtonProps) => {
  return (
    <div className="text-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="flex items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            <span className="sr-only">Open Table Actions</span>
            <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
          </MenuButton>
        </div>

        <MenuItems
          anchor="bottom end"
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <button
                className="group w-full flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                onClick={() => onEditUser(info.row.original)}
              >
                <PencilSquareIcon
                  aria-hidden="true"
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                />
                Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="group w-full flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                onClick={() => onDeleteUser(info.row.original)}
              >
                <TrashIcon
                  aria-hidden="true"
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                />
                Delete
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};
