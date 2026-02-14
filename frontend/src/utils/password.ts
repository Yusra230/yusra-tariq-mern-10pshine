export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

export const PASSWORD_REQUIREMENTS = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'Contains uppercase & lowercase', test: (p: string) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
  { label: 'Contains numbers', test: (p: string) => /\d/.test(p) },
  { label: 'Contains special characters', test: (p: string) => /[^a-zA-Z\d]/.test(p) },
] as const;
