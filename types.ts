export interface Skill {
  name: string;
  icon: string;
}

export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
  icon: string;
}

export interface NavItem {
  label: string;
  sectionId: string;
}

export interface NewsItem {
  id: number;
  text: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactForm, string>>;
