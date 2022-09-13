export class CostDTO {
  title: string;
  period: string;
  description: string;
  date: string;
  group_id: number;
  budget_id: number;
  user_id: number;
  amount: number;
}

export class CostGroupDTO {
  title: string;
  order: number;
  description: string;
  created_at?: string;
  user_id: string;
}
