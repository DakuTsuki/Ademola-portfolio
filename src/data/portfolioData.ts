import { PortfolioData } from '../types';

/**
 * Ademola Adebayo - Portfolio Data
 * 
 * Edit this single file to update your personal details,
 * add new projects, or adjust your skills list.
 */
export const portfolioData: PortfolioData = {
  personal: {
    name: "Ademola Adebayo",
    role: "Web developer",
    headline: "I build websites and get them online.",
    location: "Nigeria",
    photoSlotPath: "/src/assets/ademola.jpg",
    about: "I build full websites: the front end, the backend, the MySQL database, and the hosting. I work with Node.js, PHP, and modern web tooling. I have set up domains, subdomains, SSL, and cPanel myself, and I have moved a live site between hosts without losing its content. Beyond writing code, I value team building and project management: coordinating deliverables, communicating clearly with clients, and keeping projects on schedule.",
    githubUrl: "https://github.com/DakuTsuki",
    linkedinUrl: "https://www.linkedin.com/in/ademola-adebayo-98b286380",
    email: "demomega9@gmail.com",
    phone: "07035697280",
    cvUrl: "/ademola-adebayo-cv.pdf",
    codeInvite: "I keep my active repositories, code experiments, and side projects on GitHub. Take a look at how I write and structure code.",
  },

  skillGroups: [
    {
      category: "Front end",
      skills: ["React", "TypeScript", "Tailwind CSS", "Responsive design", "HTML5/CSS3"],
    },
    {
      category: "Back end",
      skills: [
        "Node.js",
        "Express",
        "REST APIs",
        "PHP",
        "MySQL",
        "Authentication",
        "Sessions & JWT",
        "Middleware",
        "Environment configuration",
      ],
    },
    {
      category: "Hosting",
      skills: ["Vercel", "cPanel", "Domains and subdomains", "SSL", "phpMyAdmin", "Database migration"],
    },
    {
      category: "Tools",
      skills: ["Git", "GitHub", "npm", "Postman", "VS Code"],
    },
    {
      category: "Team & Management",
      skills: [
        "Team building",
        "Project management",
        "Task planning",
        "Code reviews",
        "Technical documentation",
        "Client communication",
      ],
      note: "Coordinating development cycles and keeping projects organized from planning to deployment.",
    },
  ],

  projects: [
    {
      id: "helps-counsellors",
      title: "HELPS Counsellors",
      siteUrl: "https://www.helpscounsellors.com/",
      imageOverride: "",
      codeUrl: "https://github.com/DakuTsuki",
      roleHighlight: "Front end on Vercel, custom PHP API on cPanel, MySQL database, and article admin panel",
      year: "2024",
      description: "A website for a UK relationship and marriage counselling charity. I built the front end, a custom PHP API, MySQL database, and an admin panel so the team can publish articles and manage resources. The front end runs on Vercel and the API connects to cPanel hosting.",
      techTags: ["React", "PHP", "MySQL", "Vercel", "cPanel", "REST API", "Tailwind CSS"],
    },
    {
      id: "moremi-techstars",
      title: "Moremi Techstars",
      siteUrl: "https://www.moremitechstars.org/",
      imageOverride: "",
      codeUrl: "https://github.com/DakuTsuki",
      roleHighlight: "Public non-profit website, cohort discovery, and community intake",
      year: "2024",
      description: "An official website for a Nigerian non-profit that trains young women and girls in technology skills. It showcases their bootcamps, workshops, mentorship programs, and impact stories. I built a responsive, accessible layout to help visitors register for cohorts and support their mission.",
      techTags: ["Web Development", "Responsive Layout", "CSS", "UI/UX", "Hosting Setup"],
    },
    {
      id: "life-and-relationship-matters",
      title: "Life & Relationship Matters",
      siteUrl: "https://www.lifeandrelationshipmatters.com/",
      imageOverride: "",
      codeUrl: "https://github.com/DakuTsuki",
      roleHighlight: "Content architecture, publications catalog, and coaching inquiry flow",
      year: "2024",
      description: "A website for a relationship coaching and education platform featuring book guides, articles, and coaching resources. It presents their core framework and helps readers find guidance for dating, marriage, and family life. The site is structured for easy reading, resource discovery, and direct consultation inquiries.",
      techTags: ["Web Development", "Responsive Design", "Content Structure", "Digital Publishing"],
    },
  ],
};
