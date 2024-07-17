import React from 'react';

export const StatusPill = ({ status }: { status: string }) => {
  return (
    <div>
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
    </div>
  );
};
