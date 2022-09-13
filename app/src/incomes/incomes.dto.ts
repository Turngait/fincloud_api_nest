export class IncomeDTO {
  title: string;
  period: string;
  description: string;
  amount: number;
  source_id: number;
  budget_id: number;
  user_id: number;
  timestamp: string;
}

export class IncomeSourceDTO {
  title: string;
  order: number;
  description: string;
  created_at?: string;
  user_id: string;
}
