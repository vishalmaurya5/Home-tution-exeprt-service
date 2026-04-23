export const maskNumber = (number) => {
  const value = String(number || "");
  if (!value) return "";
  if (value.length <= 4) return "****";
  return `${value.slice(0, 3)}XXXXX${value.slice(-2)}`;
};
