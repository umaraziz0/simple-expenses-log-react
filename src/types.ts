export interface Log {
  id: number;
  title: string;
  description: string;
  price: number;
  timestamp: string;
}

export interface FormErrors {
  title: string;
  price: string;
}
