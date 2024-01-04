export interface Advice {
  id: number;
  question: string;
  answer: string;
}

export interface NewAdvice extends Omit<Advice, 'id'> {}
