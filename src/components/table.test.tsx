import React from 'react';
import { render, screen } from '@testing-library/react';
import { Table } from './table';
import { vitest } from 'vitest';

describe('Table', () => {
  test('should render the table component with header and rows', () => {
    const tableMock = {
      getHeaderGroups: vitest.fn().mockReturnValue([
        {
          id: 'headerGroup1',
          headers: [
            {
              id: 'header1',
              column: {
                columnDef: {
                  header: 'Header 1',
                },
              },
              isPlaceholder: false,
              getContext: vitest.fn().mockReturnValue({}),
            },
            {
              id: 'header2',
              column: {
                columnDef: {
                  header: 'Header 2',
                },
              },
              isPlaceholder: false,
              getContext: vitest.fn().mockReturnValue({}),
            },
          ],
        },
      ]),
      getRowModel: vitest.fn().mockReturnValue({
        rows: [
          {
            id: 'row1',
            getVisibleCells: vitest.fn().mockReturnValue([
              {
                id: 'cell1',
                column: {
                  columnDef: {
                    cell: 'Cell 1',
                  },
                },
                getContext: vitest.fn().mockReturnValue({}),
              },
              {
                id: 'cell2',
                column: {
                  columnDef: {
                    cell: 'Cell 2',
                  },
                },
                getContext: vitest.fn().mockReturnValue({}),
              },
            ]),
          },
        ],
      }),
    };

    render(<Table table={tableMock} />);

    // Assert header rendering
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Header 2')).toBeInTheDocument();

    // Assert row rendering
    expect(screen.getByText('Cell 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 2')).toBeInTheDocument();
  });
});
