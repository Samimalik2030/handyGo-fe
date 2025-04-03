export type User = {
  name: string;
  email: string;
  password: string;
  role: "customer" | "mechanic" | "admin";
};
