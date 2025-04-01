# CapStore-api-definition

 電子部品在庫管理のWebAPI定義

<https://gtech9971.github.io/CapStore-api-definition/>

## 📘 API 概要（OpenAPI 定義より）

このリポジトリの `root.yaml` に定義された API は、電子部品の在庫管理と秋月電子との連携機能を提供します。

### 提供機能の概要

- 📦 電子部品（components）の CRUD
- 📂 カテゴリー（categories）の登録・取得
- 🏭 メーカー（makers）の登録・取得
- 📈 在庫情報（inventories）の取得・追加・削除
- 🔗 秋月電子カタログとの連携（catalog ID 経由で部品情報を取得）

### 主なエンドポイント

- `GET /components`：電子部品一覧取得（検索・ソート・フィルタ可能）
- `POST /components`：電子部品の新規登録
- `GET /components/{componentId}`：部品詳細の取得
- `GET /categories` / `POST /categories`：カテゴリー一覧・登録
- `GET /makers` / `POST /makers`：メーカー一覧・登録
- `GET /makers/{makerId}/components`：指定メーカーの部品一覧
- `GET /categories/{categoryId}/components`：指定カテゴリーの部品一覧
- `GET /akizuki/catalogs/{catalogId}`：秋月電子から情報取得し、未登録情報も返却
- `GET /components/inventories`：指定部品群の在庫情報取得（クエリ指定）
- `POST /components/{componentId}/inventories:add`：在庫を追加
- `POST /components/{componentId}/inventories:remove`：在庫を削除（イベント種別付き）

### 特徴的な設計

- レスポンスはすべて `baseResponse` または `pageResponse` を継承した構造
- `schema` 名の付け方が明確（例：`fetchComponentResponse`, `registryMakerResponse` など）
- ページネーション情報を含む共通レスポンス設計あり
- 秋月電子からのデータ取得結果に「未登録情報」フィールドあり（`unRegistered`）

この API は電子部品管理業務に特化した堅牢かつ拡張性のある設計となっています。

---

## 📦 GitHub Actions による TypeScript クライアントの自動生成と NPM 公開

このリポジトリでは、OpenAPI 定義（root.yaml）をもとに、GitHub Actions 上で `typescript-fetch` を使って TypeScript クライアントを自動生成し、NPM にパブリッシュするワークフローが構築されています。

### 実行のトリガー

- バージョンタグ（例：`v1.2.3`）が push されたとき
- または GitHub 上から手動で workflow_dispatch により実行可能

### 主な処理ステップ

1. Redocly CLI による OpenAPI YAML のバンドル（`openapi.v1.yaml` → `root.yaml`）
2. OpenAPI Generator によるクライアントコード生成（`typescript-fetch`）
3. `package.json` を CI 上で手動挿入
4. `tsconfig.json` も CI 上で挿入（ビルドのため）
5. `npm publish --provenance --access public` による公開

### なぜ package.json を CI で生成するのか？

`typescript-fetch` は `withNpmPackage=true` に非対応で、`package.json` が自動生成されません。よって GitHub Actions 内で手動で生成する必要があります。

### なぜ repository 情報が必要なのか？

NPM の provenance 機能では、`repository.url` が GitHub Actions の provenance 情報と一致していなければエラー（422）になります。これを防ぐため、次のように記述します：

```json
"repository": {
  "type": "git",
  "url": "https://github.com/GTech9971/CapStore-api-definition"
}
```

---

## 🧪 GitHub Actions による ASP.NET Core WebAPI (NuGet) パッケージの自動生成と公開

このリポジトリでは、OpenAPI 定義から ASP.NET Core 用の WebAPI サーバーコード（C#）を生成し、GitHub Actions 上で NuGet パッケージとして公開する CI を提供しています。

### 主な処理ステップ

1. Git タグ（例：`v1.2.3`）の push をトリガーにバージョンを自動抽出
2. Redocly CLI による OpenAPI のバンドル（`openapi.v1.yaml` → `root.yaml`）
3. OpenAPI Generator による `aspnetcore` コードの生成（バージョンやモデル接尾辞指定）
4. `dotnet pack` による NuGet パッケージ作成（対象: `generated-server/src/CapStore.Models`）
5. `dotnet nuget push` によって NuGet.org に公開（`NUGET_API_KEY` シークレットが必要）

### ポイント

- 自動で生成されるパッケージのバージョンは Git タグ `vX.Y.Z` に準拠
- `--model-name-suffix=Model` を付与してクラス名衝突を防止
- CLI 版 OpenAPI Generator を `curl` 経由でダウンロードして使用
        - `NUGET_API_KEY` は GitHub Secrets に登録しておく必要があります

---
