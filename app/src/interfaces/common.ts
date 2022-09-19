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
}
