// 共通部分
export type BaseContact = {
  first_name: string;
  last_name: string;
  gender: number;
  email: string;
  address: string;
  building: string;
  category_id: number;
  detail: string;
};

// フォーム入力用
export type FormData = BaseContact & {
  tell_1: string;
  tell_2: string;
  tell_3: string;
};

// 確認画面用
export type ConfirmData = BaseContact & {
  tell: string;
};
