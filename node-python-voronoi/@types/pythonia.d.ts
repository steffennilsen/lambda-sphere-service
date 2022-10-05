declare module 'pythonia' {
  export interface Python<T> {
    (path: string): T;
    exit(): void;
  }

  export const python: Python;
}