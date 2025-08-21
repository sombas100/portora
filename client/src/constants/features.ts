import portal from '../../public/Screenshot 2025-08-20 183246.png'
import projectPage from '../../public/projects-features-page.png'
import file from '../../public/file-feature.png'
import chat from '../../public/chat-feature.png'
import plan from '../../public/plan-feature.png'
import security from '../../public/security.png'

export interface FeatureItem {
  title: string;
  description: string;
  image: string;
}

export const featuresList: FeatureItem[] = [
  {
    title: "Client Portals",
    description: "Create branded portals for each client to keep communication and project assets in one place.",
    image: portal,
  },
  {
    title: "Project Management",
    description: "Track project timelines, deadlines, and deliverables with ease.",
    image: projectPage,
  },
  {
    title: "File Sharing & Feedback",
    description: "Send files and receive feedback in real time without third-party tools.",
    image: file,
  },
  {
    title: "Built-in Chat",
    description: "Communicate with clients using an integrated chat interface — available on Pro and Enterprise plans.",
    image: chat,
  },
  {
    title: "Subscription Tiers",
    description: "Offer flexibility with scalable plans based on your business size and needs.",
    image: plan,
  },
  {
    title: "Secure Access",
    description: "Token-based login ensures your and your clients’ data remains safe.",
    image: security,
  },
];
