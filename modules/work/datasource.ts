import type { StaticImageData } from 'next/image'

import dunlinLogo from './images/dunlin_ai_logo-workex.jpg'
import engineerScradleLogo from './images/engineer_s_cradle-workex.jpg'
// import envsyncLogo from "./images/envsync-workex.jpg"
import gdsclpuLogo from './images/gdsclpu_logo-workex.jpg'
import sharpsellLogo from './images/sharpsellai_logo-workex.jpg'
import hybr1dLogo from './images/usehybr1d_logo-workex.jpg'
import vulnconLogo from './images/vulncon_logo-workex.jpg'
import loginradiusLogo from './images/loginradius_logo-workex.jpg'

export interface WorkExperience {
  company: {
    name: string
    url: string
    logo: StaticImageData
  }
  timeline: {
    from: string
    to: string
  }
  position: string
  description: string
  techstack: string[]
  isVolunteering?: boolean
  location: {
    city: string
    isRemote: boolean
  }
}

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    company: {
      logo: loginradiusLogo,
      name: 'LoginRadius',
      url: 'https://www.loginradius.com/',
    },
    description:
      'As a Software Engineer in Implementations as a part of Customer Success Team, I am responsible for the development and maintenance of the LoginRadius Docs, SDKs, API References and PoCs. I also help customers with their implementation of the LoginRadius platform and provide support to the customers.',
    position: 'Software Engineer / Implementations',
    timeline: {
      from: 'July, 2025',
      to: 'Present',
    },
    location: {
      city: 'Hyderabad, India',
      isRemote: false,
    },
    techstack: ['TypeScript', 'React', 'Node.js', 'Docker', 'Jira', 'Confluence', 'GitHub Actions'],
  },
  {
    company: {
      logo: engineerScradleLogo,
      name: "Engineer's Cradle",
      url: 'https://engineerscradle.com',
    },
    description:
      'As a Founding Engineer, established CI/CD best practices and deployment strategies, reducing onboarding time by 40%. Architected a fault-tolerant M2M authentication service in Rust ensuring 99.9% uptime. Built a scalable GraphQL gateway in Go with intelligent caching, reducing P95 latency by 30%.',
    position: 'Senior Software Engineer',
    timeline: {
      from: 'July, 2024',
      to: 'May, 2025',
    },
    location: {
      city: 'Pune, India',
      isRemote: false,
    },
    techstack: [
      'Rust',
      'Go',
      'TypeScript',
      'AWS',
      'GitHub Actions',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Actix',
      'GraphQL',
    ],
  },
  {
    company: {
      logo: dunlinLogo,
      name: 'Dunlin AI',
      url: 'https://dunlin.ai/',
    },
    description:
      'Built and containerized a resilient microservice in Rust (Tokio) for critical API token refreshes, preventing authentication failures and ensuring system reliability. Implemented automated CI/CD workflows with GitHub Actions, increasing deployment frequency by 50%.',
    position: 'Backend Engineer',
    timeline: {
      from: 'July, 2023',
      to: 'Nov, 2023',
    },
    location: {
      city: 'Pillani, India',
      isRemote: true,
    },
    techstack: ['Rust', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'TypeScript'],
  },
  {
    company: {
      logo: sharpsellLogo,
      name: 'SharpSell AI',
      url: 'https://sharpsell.ai/',
    },
    description:
      'Led infrastructure migration from EC2 to containerized AWS ECS, reducing monthly costs by 76% (from $19K to $4.5K). Designed robust CI/CD pipelines using AWS CodePipeline for zero-downtime blue-green deployments.',
    position: 'Site Reliability Engineer',
    timeline: {
      from: 'Feb, 2023',
      to: 'Apr, 2023',
    },
    location: {
      city: 'Bangalore, India',
      isRemote: false,
    },
    techstack: ['GitHub Actions', 'AWS ECS', 'AWS Fargate', 'AWS CodePipeline', 'AWS CodeBuild', 'Docker'],
  },
  {
    company: {
      logo: hybr1dLogo,
      name: 'ZenAdmin',
      url: 'https://www.zenadmin.ai/',
    },
    description:
      'Contributed to backend migration from Ruby to TypeScript, streamlining CI/CD processes and significantly improving application stability and deployment speed.',
    position: 'SDE Intern',
    timeline: {
      from: 'July, 2022',
      to: 'Dec, 2022',
    },
    location: {
      city: 'Singapore',
      isRemote: true,
    },
    techstack: ['Rust', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'TypeScript'],
  },
  {
    company: {
      logo: gdsclpuLogo,
      name: 'Google Developer Student Clubs, Lovely Professional University',
      url: 'https://www.linkedin.com/company/gdsclpu/',
    },
    description:
      'Organized workshops on web development and cloud technologies as Technical Lead, enhancing technical skills of 200+ club members through hands-on training sessions.',
    position: 'Tech Lead',
    timeline: {
      from: 'Sep, 2022',
      to: 'June, 2024',
    },
    isVolunteering: true,
    location: {
      city: 'Jalandhar, India',
      isRemote: false,
    },
    techstack: ['Javascript', 'MongoDB', 'Node.js', 'Express'],
  },
  {
    company: {
      logo: vulnconLogo,
      name: 'Vulncon',
      url: 'https://vulncon.in/',
    },
    description:
      'Create challenging CTF problems for cybersecurity events and competitions, focusing on cryptography, web security, and system exploitation challenges.',
    position: 'CTF Team Member',
    timeline: {
      from: 'Jan, 2024',
      to: 'Present',
    },
    isVolunteering: true,
    location: {
      city: 'Bangalore, India',
      isRemote: true,
    },
    techstack: ['C++', 'Python', 'Docker', 'TypeScript', 'Go', 'Crypto'],
  },
]

export const LATEST_WORK_EXPERIENCE = WORK_EXPERIENCES[0]
