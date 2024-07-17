import { render, screen } from '@testing-library/react';
import { StatusPill } from './statusPill';
import React from 'react';

describe('StatusPill', () => {
  test('should render the StatusPill component with "Active" status', () => {
    render(<StatusPill status="Active" />);
    const statusPill = screen.getByText('Active');
    expect(statusPill).toBeInTheDocument();
    expect(statusPill).toHaveClass('bg-green-100 text-green-800');
  });

  test('should render the StatusPill component with "Inactive" status', () => {
    render(<StatusPill status="Inactive" />);
    const statusPill = screen.getByText('Inactive');
    expect(statusPill).toBeInTheDocument();
    expect(statusPill).toHaveClass('bg-red-100 text-red-800');
  });

  test('should render the StatusPill component with "Pending" status', () => {
    render(<StatusPill status="Pending" />);
    const statusPill = screen.getByText('Pending');
    expect(statusPill).toBeInTheDocument();
    expect(statusPill).toHaveClass('bg-yellow-100 text-yellow-800');
  });
});
