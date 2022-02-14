declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenInstantiatedWith(objectContaining: Record<string, unknown>): R;
    }
  }
}
export {};
