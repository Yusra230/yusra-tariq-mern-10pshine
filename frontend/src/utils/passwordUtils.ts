import type { PasswordStrength } from "./password";

// -----------------------------
export const calculatePasswordStrength = (password: string): PasswordStrength => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z\d]/.test(password)) score++;

  if (score <= 2) return { score, label: 'Weak', color: 'from-red-500 to-orange-500' };
  if (score <= 3) return { score, label: 'Fair', color: 'from-yellow-500 to-amber-500' };
  if (score <= 4) return { score, label: 'Good', color: 'from-blue-500 to-cyan-500' };
  return { score, label: 'Strong', color: 'from-green-500 to-emerald-500' };
};
