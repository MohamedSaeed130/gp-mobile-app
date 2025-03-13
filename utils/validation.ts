export const validateName = (name: string): boolean => {
  // Allow names in any language, including spaces and hyphens
  // Must be at least 2 characters long
  const nameRegex = /^[\p{L}\s-]{2,}$/u;
  return nameRegex.test(name.trim());
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
}; 