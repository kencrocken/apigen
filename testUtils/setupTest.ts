import { afterEach, vitest } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

const ResizeObserverMock = vitest.fn(() => ({
  observe: vitest.fn(),
  unobserve: vitest.fn(),
  disconnect: vitest.fn(),
}));
vitest.stubGlobal('ResizeObserver', ResizeObserverMock);

afterEach(() => {
  cleanup();
});
