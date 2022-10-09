export class CostDTO {
  id?: number;
  title: string;
  year: number;
  month: number;
  description: string;
  date: string;
  group_id: number;
  budget_id: number;
  amount: number;
  period?: string;
  account_id: number;
}

export class CostGroupDTO {
  title: string;
  order: number;
  description: string;
  created_at?: string;
  user_id: string;
}
