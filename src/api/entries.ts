import { apiFetch } from './client';
import type { PublicEntry, AdminEntry } from '../types';

export function getPublicEntries(): Promise<PublicEntry[]> {
  return apiFetch<PublicEntry[]>('/api/entries');
}

export function getAdminEntries(): Promise<AdminEntry[]> {
  return apiFetch<AdminEntry[]>('/api/admin/entries');
}

export function createEntry(formData: FormData): Promise<AdminEntry> {
  return apiFetch<AdminEntry>('/api/admin/entries', {
    method: 'POST',
    body: formData,
  });
}

export function updateEntry(id: number, formData: FormData): Promise<AdminEntry> {
  return apiFetch<AdminEntry>(`/api/admin/entries/${id}`, {
    method: 'PUT',
    body: formData,
  });
}

export function deleteEntry(id: number): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(`/api/admin/entries/${id}`, {
    method: 'DELETE',
  });
}

export function reorderEntries(orders: { id: number; sort_order: number }[]): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>('/api/admin/entries/reorder', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orders }),
  });
}
