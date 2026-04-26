import { apiFetch } from './client';

export function login(password: string): Promise<{ success: boolean; token: string }> {
  return apiFetch<{ success: boolean; token: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
}
