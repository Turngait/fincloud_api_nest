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
  account_id: number;
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
  account_id: number;
}

export interface ICostGroup {
  id?: number;
  title: string;
  description: string;
  order?: number;
  created_at?: Date;
  user_id?: number;
  account_id: number;
}

export interface IIncomeSources {
  id?: number;
  title: string;
  description: string;
  order?: number;
  created_at?: Date;
  user_id?: number;
  account_id: number;
}

export interface IAccount {
  id?: number;
  title: string;
  description: string;
  created_at: Date;
  user_id?: number;
  balance: number;
  currency: string;
  is_active?: boolean;
}

export interface IBudget {
  id?: number;
  title: string;
  description: string;
  user_id?: number;
  balance: number;
  is_calculating: boolean;
  created_at: string;
  account_id: number;
}

export enum TypeOfOps {
  INCREASE,
  DECREASE,
}

export enum NotifyTypes {
  signUp = 'reg_complete',
  pwdChanged = 'new_pass',
  restorePwd = 'pass_is_changed',
  msgToUs = 'msg_to_admin',
}
