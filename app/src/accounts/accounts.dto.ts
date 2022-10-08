export class AccountDTO {
  title: string;
  description: string;
  created_at: Date;
  balance: number;
  currency: string;
  is_active?: boolean;
}
