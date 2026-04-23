export const maskPhone = (value) => {
  if (!value) return "";
  const digits = String(value);
  if (digits.length <= 4) return "****";
  return `${digits.slice(0, 3)}XXXXX${digits.slice(-2)}`;
};

export const withMaskedPhone = (items, key, shouldMask) =>
  items.map((item) => {
    const object = item.toObject ? item.toObject() : { ...item };
    object[key] = shouldMask ? maskPhone(object[key]) : object[key];
    return object;
  });
