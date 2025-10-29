# 指示

- RESTに従ってAPIを設計せよ
- RESTで表現できないものについてはカスタムメソッド(リソースに:を付けてメソッド名を付ける)で定義
  - <https://google.aip.dev/136>

- yamlファイルを作成する場合はURLのパス階層に従ってフォルダを作れ
- 変更処理をしたら.vscode/tasks.jsonのタスク`validate`を実行し問題ないか確認せよ
