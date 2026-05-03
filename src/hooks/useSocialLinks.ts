import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPublicSocialLinks,
  getAdminSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
  reorderSocialLinks,
} from '../api/social-links';

export function usePublicSocialLinks() {
  return useQuery({
    queryKey: ['social-links'],
    queryFn: getPublicSocialLinks,
  });
}

export function useAdminSocialLinks() {
  return useQuery({
    queryKey: ['admin-social-links'],
    queryFn: getAdminSocialLinks,
  });
}

export function useCreateSocialLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-social-links'] });
      queryClient.invalidateQueries({ queryKey: ['social-links'] });
    },
  });
}

export function useUpdateSocialLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { label?: string; icon?: string; url?: string } }) =>
      updateSocialLink(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-social-links'] });
      queryClient.invalidateQueries({ queryKey: ['social-links'] });
    },
  });
}

export function useDeleteSocialLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-social-links'] });
      queryClient.invalidateQueries({ queryKey: ['social-links'] });
    },
  });
}

export function useReorderSocialLinks() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reorderSocialLinks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-social-links'] });
      queryClient.invalidateQueries({ queryKey: ['social-links'] });
    },
  });
}
