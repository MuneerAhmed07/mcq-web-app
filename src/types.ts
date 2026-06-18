export interface MCQ {
  id: number;
  category: string;
  subCategory: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface SelectedAnswers {
  [mcqId: number]: string;
}

export interface Category {
  name: string;
  description: string;
  icon: string;
  subCategories: {
    name: string;
    description: string;
    icon: string;
  }[];
}
