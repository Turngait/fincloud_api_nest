export class BudgetDTO {
  id?: number;
  title: string;
  description: string;
  user_id?: number;
  balance: number;
  is_calculating: boolean;
  created_at: string;
  account_id: number;
}
