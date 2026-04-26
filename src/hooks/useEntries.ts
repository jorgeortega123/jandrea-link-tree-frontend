import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPublicEntries,
  getAdminEntries,
  createEntry,
  updateEntry,
  deleteEntry,
  reorderEntries,
} from '../api/entries';

export function usePublicEntries() {
  return useQuery({
    queryKey: ['entries'],
    queryFn: getPublicEntries,
  });
}

export function useAdminEntries() {
  return useQuery({
    queryKey: ['admin-entries'],
    queryFn: getAdminEntries,
  });
}

export function useCreateEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-entries'] });
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
}

export function useUpdateEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateEntry(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-entries'] });
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
}

export function useDeleteEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-entries'] });
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
}

export function useReorderEntries() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reorderEntries,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-entries'] });
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
}
