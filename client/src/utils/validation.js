export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());

export const normalizePhone = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  return digits;
};

export const isValidIndianPhone = (value) => /^[6-9]\d{9}$/.test(normalizePhone(value));

export const isStrongEnoughPassword = (value) => String(value || "").length >= 6;
