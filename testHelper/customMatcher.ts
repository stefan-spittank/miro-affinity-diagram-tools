expect.extend({
  toHaveBeenInstantiatedWith(received: jest.SpyInstance, objectContaining) {
    try {
      expect(received).toHaveBeenCalledWith(
        expect.objectContaining(objectContaining),
        expect.anything()
      );
    } catch (e) {
      const actualCall = JSON.stringify(
        received.mock.calls?.[0]?.[0],
        (key, value) => (key !== "children" ? value : undefined)
      );
      return {
        message: () =>
          `Expected component spy to have been instantiated with:
  ${JSON.stringify(objectContaining)}
  
But the parameter were:
  ${actualCall}`,
        pass: false,
      };
    }

    return {
      message: () =>
        `Expected component spy not to have been instantiated with ${JSON.stringify(
          objectContaining
        )}.`,
      pass: true,
    };
  },
});
