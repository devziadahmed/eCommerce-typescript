import { CategoryPrefix } from "./category";

export const isString = (value: unknown) => {
  return typeof value === "string";
};

export const isCategoryPrefix = (value: string): value is CategoryPrefix => {
  return ["men", "women", "kids", "baby", "sport"].includes(value);
};
