export type EntryType = 'catalog' | 'link';

export interface PublicEntry {
  id: number;
  title: string;
  description: string;
  type: EntryType;
  url: string | null;
  r2_key: string | null;
  file_name: string | null;
  sort_order: number;
}

export interface AdminEntry extends PublicEntry {
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: number;
  label: string;
  icon: string;
  url: string;
  sort_order: number;
}

export interface AdminSocialLink extends SocialLink {
  created_at: string;
  updated_at: string;
}
