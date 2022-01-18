import { RiComputerLine } from "react-icons/ri";
import { FaServer } from "react-icons/fa";
import { AiOutlineAntDesign, AiOutlineApi } from "react-icons/ai";
import { MdDeveloperMode } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";
import type { IProject, IService, ISkill } from "./types";

export const services: IService[] = [
  {
    title: "Frontend Development",
    about:
      "I can build a beautiful and scalable SPA using <b>HTML</b>,<b>CSS</b> and <b>React.js</b> ",
    Icon: RiComputerLine
  },
  {
    title: "Backend Development",
    about:
      "handle database, server, api using <b>Express</b> & other popular frameworks",
    Icon: FaServer
  },
  {
    title: "API Development",
    about:
      "I can develop robust REST API using <b>django-rest-api</b> & <b>Node API</b>",
    Icon: AiOutlineApi
  },
  {
    title: "Competitive Coder",
    about: "A daily problem solver in <b>HackerRank</b> and <b>Leet Code</b>",
    Icon: MdDeveloperMode
  },
  {
    title: "UI/UX designer",
    about:
      "Stunning user interface designer using <b>Figma</b> and <b>Framer</b>",
    Icon: AiOutlineAntDesign
  },
  {
    title: "Whatever",
    about:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quis minima autem!",
    Icon: RiComputerLine
  }
];

export const languages: ISkill[] = [
  {
    name: "Python",
    level: "45",
    Icon: BsCircleFill
  },
  {
    name: "JavaScript",
    level: "60",
    Icon: BsCircleFill
  },
  {
    name: "React Native",
    level: "80",
    Icon: BsCircleFill
  },
  {
    name: "React",
    level: "70",
    Icon: BsCircleFill
  },
  {
    name: "Django",
    level: "80",
    Icon: BsCircleFill
  },
  {
    name: "Bootstrap",
    level: "80",
    Icon: BsCircleFill
  }
];

export const tools: ISkill[] = [
  {
    name: "Figma",
    level: "85",
    Icon: BsCircleFill
  },
  {
    name: "Photoshop",
    level: "45",
    Icon: BsCircleFill
  },
  {
    name: "Illustrator",
    level: "60",
    Icon: BsCircleFill
  },
  {
    name: "Framer",
    level: "45",
    Icon: BsCircleFill
  }
];

export const projects: IProject[] = [
  {
    id: 1,
    name: "COVID Tracker",
    description:
      "This app shows a statistical view about corona virus over the world",
    imagePath: "/images/covid.jpg",
    deployedUrl: "https://covid-19-tracker-by-sumit.web.app/",
    githubUrl: "https://github.com/Dey-Sumit/covid-19-tracker",
    categories: ["react"],
    keyTechs: ["React", "Chart.js", "Material UI"]
  },
  {
    id: 2,
    name: "Algorithm Visualizer",
    imagePath: "/images/algoVisual.png",
    deployedUrl: "https://visual-algorithm.web.app/",
    githubUrl: "https://github.com/Dey-Sumit/algorithm-visualizer",
    categories: ["react"],
    description:
      "An web app which shows how an algorithm (path finding or sorting) works with cool animation",
    keyTechs: ["React", "firebase", "Framer Motion"]
  },
  {
    id: 3,
    name: "Dev Talks",
    imagePath: "/images/dev.jpg",
    deployedUrl: "https://dev-talks.herokuapp.com/",
    githubUrl: "https://github.com/Dey-Sumit/Dev-talks",
    categories: ["node", "mongo", "react"],
    description:
      "Social Media app for developers who can share project,create posts,etc...",
    keyTechs: [
      "React",
      "Redux",
      "Node",
      "Express",
      "Mongo",
      "REST API",
      "Bootstrap"
    ]
  },
  {
    id: 4,
    name: "Realtime Chat App",
    imagePath: "/images/chatapp.jpg",
    deployedUrl: "https://sumit-chat.netlify.app/",
    githubUrl: "https://github.com/Dey-Sumit/chat-app-socket.io-react-node",
    categories: ["node", "react"],
    description:
      "Basic Realtime Chat App where one can create a room can talk to each other",
    keyTechs: ["React", "Node", "Express", "Socket", "Bootstrap"]
  },
  {
    id: 5,
    name: "Tweeter Clone",
    imagePath: "/images/tweetme.jpg",
    deployedUrl: "http://sumaxtweetme.pythonanywhere.com/",
    githubUrl: "https://github.com/Dey-Sumit/tweetme",
    categories: ["django", "react"],
    description:
      "First Django Project :) | Typical Social Media App where one can post,like ,comment etc",
    keyTechs: ["React", "Django", "Django REST API"]
  },
  {
    id: 6,
    name: "Color Classification using tf.js",
    imagePath: "/images/color.jpg",
    deployedUrl: "!#",
    githubUrl: "https://github.com/Dey-Sumit/color-classification",
    categories: ["express"],
    description:
      "Tried ML with JS :) | this app classifies a color using CNN algorithm in browser",
    keyTechs: ["Express", "TensorFlow.js", "Vanilla js"]
  },
  {
    id: 7,
    name: "YouTube using YouTube ",
    imagePath: "/images/youtubeClone.png",
    deployedUrl: "https://not-utube.web.app/",
    githubUrl: "https://github.com/Dey-Sumit/youtube-clone-tutorial-up",
    categories: ["express"],
    description:
      'Full(almost) Functional YouTube replica where one can login with his/her youtube account to enjoy "not-YouTube".User can like a video,comment on a video & Much More ',
    keyTechs: [
      "React",
      "Redux",
      "Firebase Auth",
      "YouTube API",
      "Sass",
      "Bootstrap"
    ]
  },
  {
    id: 8,
    name: "Football App",
    imagePath: "/images/football.png",
    deployedUrl: "https://o-my-goal.web.app/",
    githubUrl: "https://github.com/Dey-Sumit/football-app",
    categories: ["react"],
    description:
      "o my goal replica where an user can keep an eye on his favorite club.This app will keep providing \n all the statistics of that club.all the fans can also chat ",
    keyTechs: ["React", "Redux", "Firebase Auth", "API", "Sass", "Bootstrap"]
  }
];
