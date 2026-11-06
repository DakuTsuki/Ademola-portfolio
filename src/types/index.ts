export interface Project {
  id: string;
  title: string;
  description: string;
  siteUrl: string;
  codeUrl?: string; // If empty string or undefined, the "View code" button is hidden
  imageOverride?: string; // Optional custom uploaded screenshot path (e.g., '/projects/custom.jpg')
  techTags: string[];
  roleHighlight?: string;
  year?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
  note?: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  headline: string;
  location: string;
  photoSlotPath: string;
  about: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  phone: string;
  cvUrl: string;
  codeInvite: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skillGroups: SkillGroup[];
  projects: Project[];
}
