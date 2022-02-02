jest.mock(
  "env",
  () => ({
    VITE_NAME: "vite-plugin-dotenv",
  }),
  { virtual: true }
);
