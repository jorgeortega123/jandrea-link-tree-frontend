import { apiFetch } from './client';
import type { SocialLink, AdminSocialLink } from '../types';

export function getPublicSocialLinks(): Promise<SocialLink[]> {
  return apiFetch<SocialLink[]>('/api/social-links');
}

export function getAdminSocialLinks(): Promise<AdminSocialLink[]> {
  return apiFetch<AdminSocialLink[]>('/api/admin/social-links');
}

export function createSocialLink(data: { label: string; icon: string; url: string }): Promise<AdminSocialLink> {
  return apiFetch<AdminSocialLink>('/api/admin/social-links', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export function updateSocialLink(id: number, data: { label?: string; icon?: string; url?: string }): Promise<AdminSocialLink> {
  return apiFetch<AdminSocialLink>(`/api/admin/social-links/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export function deleteSocialLink(id: number): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(`/api/admin/social-links/${id}`, {
    method: 'DELETE',
  });
}

export function reorderSocialLinks(orders: { id: number; sort_order: number }[]): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>('/api/admin/social-links/reorder', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orders }),
  });
}
