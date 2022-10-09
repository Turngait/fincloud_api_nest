export class IncomeDTO {
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
  account_id: number;
}
