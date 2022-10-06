export interface ICost {
  id?: number;
  title: string;
  year: number;
  month: number;
  description: string;
  date: string;
  group_id: number;
  budget_id: number;
  user_id?: number;
  amount: number;
  period?: string;
}

export interface IIncome {
  id?: number;
  title: string;
  year: number;
  month: number;
  period?: string;
  description: string;
  date: Date;
  source_id: number;
  budget_id: number;
  user_id?: number;
  amount: number;
}

export interface ICostGroup {
  id?: number;
  title: string;
  description: string;
  order: number;
  created_at: Date;
  user_id?: number;
}
