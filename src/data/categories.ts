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
    ]
  },
  {
    name: "Islamic Studies",
    description: "Deepen your awareness of the Quranic history, revelations, and authentic Ahadith.",
    icon: "BookMarked",
    subCategories: [
      {
        name: "600 Most Repeated Islamic Study MCQs",
        description: "600 Most Repeated Islamic Study MCQs",
        icon: "Heart"
      },
    ]
  },
  {
    name: "Pakistan Studies",
    description: "Review major historical movements, leaders, constitutional changes, and geographic borders.",
    icon: "Globe",
    subCategories: [
      {
        name: "355 Most Repeated MCQs of Pakistan Study",
        description: "355 Most Repeated MCQs of Pakistan Study",
        icon: "History"
      },
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
    ]
  }
];
