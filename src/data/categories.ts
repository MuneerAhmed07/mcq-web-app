import { Category } from "../types";

export const categoriesData: Category[] = [
  {
    name: "English",
    description: "Amplify your grammar accuracy, sentence construction, and vocabulary power.",
    icon: "Languages",
    subCategories: [
      {
        name: "Grammar",
        description: "Master parts of speech, syntax, active/passive voice, conditional structures, and verb tenses.",
        icon: "FileText"
      },
      {
        name: "Vocabulary",
        description: "Deepen your understanding of synonyms, antonyms, idioms, correct spellings, and definitions.",
        icon: "BookOpen"
      }
    ]
  },
  {
    name: "Islamic Studies",
    description: "Deepen your awareness of the Quranic history, revelations, and authentic Ahadith.",
    icon: "BookMarked",
    subCategories: [
      {
        name: "Quran",
        description: "Explore the compilation of the Holy Quran, Makki and Madni Surahs, and prominent revelations.",
        icon: "Heart"
      },
      {
        name: "Hadith",
        description: "Test your awareness of compilers of Sihah-e-Sittah, chains of narrators, and text definitions.",
        icon: "MessageSquareText"
      }
    ]
  },
  {
    name: "Pakistan Studies",
    description: "Review major historical movements, leaders, constitutional changes, and geographic borders.",
    icon: "Globe",
    subCategories: [
      {
        name: "History",
        description: "Review independence leaders, the Lahore Resolution, important timelines, and constitutions.",
        icon: "History"
      },
      {
        name: "Geography",
        description: "Explore mountain ranges (K2), prominent rivers, deserts, coastlines, passes, and provinces.",
        icon: "Compass"
      }
    ]
  },
  {
    name: "Computer Science",
    description: "Challenge your fundamentals in computer programming, packet networking, and operating systems.",
    icon: "Laptop",
    subCategories: [
      {
        name: "Programming",
        description: "Evaluate core concepts in programming, algorithms, OOP concepts, JavaScript, Python, and SQL.",
        icon: "Code"
      },
      {
        name: "Networking",
        description: "Revise packet routing, DNS, DHCP, standard ports (HTTPS, etc.), and the 7-layer OSI Model.",
        icon: "Network"
      },
      {
        name: "Operating Systems",
        description: "Examine kernel structures, process deadlocks, CPU scheduling, paging, virtual memory, and Linux.",
        icon: "Cpu"
      }
    ]
  },
  {
    name: "Mathematics",
    description: "Practice your problem-solving in linear algebra, calculus, and statistical probability.",
    icon: "Percent",
    subCategories: [
      {
        name: "Algebra",
        description: "Solve linear systems, quadratic discriminants, matrix coordinates, logarithms, sets, and series.",
        icon: "Divide"
      },
      {
        name: "Calculus",
        description: "Differentiate and integrate algebraic curves, limits, exponential rates, and FTC principles.",
        icon: "TrendingUp"
      },
      {
        name: "Probability",
        description: "Acquire rolling chances, coin tosses, independent joint events, distributions, and factorials.",
        icon: "Dices"
      }
    ]
  }
];
