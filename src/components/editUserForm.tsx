import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Listbox,
  Label,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';

import { userRoles, userStatuses } from '../data/users';
import type { User } from '../data/users';

type EditUserFormProps = {
  user: User | undefined;
  saveEdit: (user: User) => void;
  cancelEdit: () => void;
};

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const EditUserForm = ({
  user,
  saveEdit,
  cancelEdit,
}: EditUserFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...user,
    },
  });

  const onSubmit = (data) => {
    saveEdit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-4 border-gray-900/10 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-x-6 gap-y-5">
          <div className="col-span-full pb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                id="name"
                {...register('name', { required: 'Name is required.' })}
                autoComplete="name"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
            {Boolean(errors.name) && (
              <p className="text-sm text-red-600 leading-6 pl-2">
                {errors.name?.message}
              </p>
            )}
          </div>

          <div className="col-span-full pb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email Address
            </label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                id="email"
                {...register('email', {
                  required: 'Email is required.',
                  pattern: {
                    value: emailPattern,
                    message: 'Invalid email address.',
                  },
                })}
                autoComplete="email"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
            {Boolean(errors.email) && (
              <p className="text-sm text-red-600 leading-6 pl-2">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="col-span-1 sm:col-span-2 pb-4">
            <Controller
              name="role"
              control={control}
              rules={{ required: 'Role is required.' }}
              defaultValue={user?.role}
              render={({ field: { onChange, value, name } }) => (
                <Listbox value={value} onChange={onChange}>
                  <Label className="block text-sm font-medium leading-6 text-gray-900 capitalize">
                    {name}
                  </Label>
                  <div className="relative">
                    <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <span className="block truncate">{value}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-gray-400"
                        />
                      </span>
                    </ListboxButton>

                    <ListboxOptions
                      transition
                      className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                    >
                      {userRoles.map((role) => (
                        <ListboxOption
                          key={role}
                          value={role}
                          className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                        >
                          <span className="block truncate font-normal group-data-[selected]:font-semibold">
                            {role}
                          </span>

                          <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                            <CheckIcon aria-hidden="true" className="h-5 w-5" />
                          </span>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              )}
            />

            {Boolean(errors.role) && (
              <p className="text-sm text-red-600 leading-6 pl-2">
                {errors.role?.message}
              </p>
            )}
          </div>

          <div className="col-span-1 sm:col-span-2 pb-4">
            <Controller
              name="status"
              control={control}
              rules={{ required: 'Status is required.' }}
              defaultValue={user?.status}
              render={({ field: { onChange, value, name } }) => (
                <Listbox value={value} onChange={onChange}>
                  <Label className="block text-sm font-medium leading-6 text-gray-900 capitalize">
                    {name}
                  </Label>
                  <div className="relative">
                    <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <span
                        className={`px-2 inline-flex justify-start text-xs leading-5 font-semibold rounded-full ${
                          value === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : value === 'Inactive'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {value}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-gray-400"
                        />
                      </span>
                    </ListboxButton>

                    <ListboxOptions
                      transition
                      className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                    >
                      {userStatuses.map((status) => (
                        <ListboxOption
                          key={status}
                          value={status}
                          className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                        >
                          <span
                            className={`px-2 inline-flex justify-start text-xs leading-5 font-semibold rounded-full ${
                              status === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : status === 'Inactive'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {status}
                          </span>

                          <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                            <CheckIcon aria-hidden="true" className="h-5 w-5" />
                          </span>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              )}
            />
            {Boolean(errors.status) && (
              <p className="text-sm text-red-600 leading-6 pl-2">
                {errors.status?.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={cancelEdit}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};
