
export interface Tool {
  id: string;
  path: string;
  name: string;
  description: string;
  category: ToolCategory;
  longDescription: string;
  faqs: FAQ[];
  examples: string[];
  howToSteps?: string[];
  mathLogic?: string;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

export type ToolCategory = 'Date' | 'Time' | 'Work' | 'Converter' | 'Countdown';

export interface FAQ {
  question: string;
  answer: string;
}

export interface CategoryData {
  name: ToolCategory;
  icon: string;
  slug: string;
}
