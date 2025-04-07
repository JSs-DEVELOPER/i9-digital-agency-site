
export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  appointment_date: string;
  status: 'pending' | 'confirmed' | 'canceled' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image?: string;
  author?: string;
  featured: boolean;
  published: boolean;
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  created_at: string;
  updated_at: string;
  categories?: BlogCategory[];
  tags?: BlogTag[];
}

export interface BlogCategory {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface BlogTag {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position?: string;
  content: string;
  full_testimonial?: string;
  image?: string;
  rating?: number;
  display_order?: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  category_id: string;
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  display_order?: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  display_order?: number;
  created_at: string;
  updated_at: string;
}

export interface BrazilianHoliday {
  id: string;
  holiday_date: string;
  name: string;
  is_national: boolean;
  created_at: string;
  updated_at: string;
}
