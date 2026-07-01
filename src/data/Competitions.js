import uiux from "../assets/images/uiux.jpg";
import graphic from "../assets/images/graphic.jpg";
import architecture from "../assets/images/architecture.jpg";

const competitions = [
  {
    id: 1,
    title: "National UI/UX Design Challenge",
    category: "UI/UX",
    prize: "₹50,000",
    deadline: "30 June 2026",
    image: uiux,

    description:"Showcase your UI/UX skills by designing innovative and user-friendly digital experiences.",

    eligibility:"Open for all students across India.",
  },

  {
    id: 2,
    title: "Creative Poster Design Contest",
    category: "Graphic Design",
    prize: "₹30,000",
    deadline: "15 July 2026",
    image: graphic,

    description:"Create creative posters based on social awareness and innovation.",

    eligibility:"Students from any college can participate.",
  },

  {
    id: 3,
    title: "Sustainable Architecture Ideas",
    category: "Architecture",
    prize: "₹1,00,000",
    deadline: "20 August 2026",
    image: architecture,

    description:"Present sustainable architectural ideas for future smart cities.",

    eligibility:"Architecture and Civil Engineering students.",
  },
];

export default competitions;