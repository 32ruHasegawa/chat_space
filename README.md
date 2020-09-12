アプリ名  
  chat_space

概要  
チャットアプリケーション  
・ユーザーを登録しグループを作成。  
・作成したグループ上でチャットする。  
・グループメンバーには、登録したユーザーなら誰でも加入可。一名のみも可。  
  
作成背景  
ゼロからサービスを開発していきながらアプリケーションを開発するために必要な知識や進め方を学ぶため。  

DEMO　　 
[![Image from Gyazo](https://i.gyazo.com/9d879c961b85569ddce68564585c83b5.gif)](https://gyazo.com/9d879c961b85569ddce68564585c83b5)  

工夫したポイント  
・シンプルなデザインにしたこと  
・ajaxを導入したこと  
  
使用技術（開発環境）  



DB設計
## users table
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false|
### Association
 - has_many :groups, through: :groups_users
 - has_many :groups_users
 - has_many :messages
  
## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
 - has_many :users, through: :groups_users
 - has_many :groups_users
 - has_many :messages
  
## messages table
|Column|Type|Options|
|------|----|-------|
|body|text|
|img|string|
|group_id|integer|null: false|
|user_id|integer|null: false|
### Association
 - belongs_to :user
 - belongs_to :group

## groups_users table
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
 - belongs_to :group
 - belongs_to :user

