# お問い合わせ管理アプリ

お問い合わせの送信と取得を行える管理アプリ

## 作成した目的

- お問い合わせの管理を簡単に行えるようにする為

## 主要技術

| 技術スタック | バージョン |
|------------|-----------|
| Next.js | 15.3.0 |
| React | 19.0.0 |
| TypeScript | 5.x |
| PHP | 8.2 |
| Laravel | 11.31 |
| Docker | - |
| Nginx | 1.21.1 |
| MySQL | 8.0.26 |
| phpMyAdmin | - |

## API 設計

### 認証 API

| エンドポイント    | メソッド | 説明         | リクエスト         | レスポンス     |
| ----------------- | -------- | ------------ | ------------------ | -------------- |
| `/api/register`   | POST     | ユーザー登録 | ユーザー情報       | 登録結果       |
| `/api/login`      | POST     | ログイン     | メール・パスワード | 認証結果       |
| `/api/logout`     | POST     | ログアウト   | -                  | ログアウト結果 |
| `/api/auth/check` | GET      | 認証状態確認 | -                  | 認証状態       |

### お問い合わせ API

| エンドポイント               | メソッド | 説明                 | リクエスト         | レスポンス         |
| ---------------------------- | -------- | -------------------- | ------------------ | ------------------ |
| `/api/contacts`              | GET      | お問い合わせ一覧取得 | -                  | お問い合わせリスト |
| `/api/contacts/{id}`         | DELETE   | お問い合わせ削除     | -                  | 削除結果           |
| `/api/contact/temp-store`    | POST     | 一時保存             | お問い合わせデータ | 保存結果           |
| `/api/contact/session-data`  | GET      | セッションデータ取得 | -                  | 保存済みデータ     |
| `/api/contact/contact-store` | POST     | お問い合わせ保存     | お問い合わせデータ | 保存結果           |

## アプリケーションURL

- お問い合わせ入力画面：https://localhost
- お問い合わせ確認画面：https://localhost/confirm
- サンクス画面　　　　：https://localhost/thanks
- ユーザー登録画面　　：https://localhost/register
- ユーザーログイン画面：https://localhost/login
- お問い合わせ管理画面：https://localhost/admin
  - 管理画面でお問い合わせの詳細をモーダルウィンドウで表示する

## 使用コンポーネント

- `Header`：ロゴとログイン／登録リンクを表示（特定ページではロゴのみ）
- `Input`：フォーム共通のテキスト入力コンポーネント（type, name, checked など対応）
- `Button`：バリアント（primary など）とサイズの指定が可能