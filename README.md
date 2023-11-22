# CapStore-api-definition

 電子部品在庫管理のWebAPI定義

## Github.comに公開

1. 以下のgithubのコードをダウンロード
    <https://github.com/swagger-api/swagger-ui.git>

2. ルートに`docs`ディレクトリを作成

3. 先ほどダウンロードしたソースの`dist`の中身を`docs`にコピー

4. `index.html`を以下のように修正

```html:index.html
<!-- HTML for static distribution bundle build -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Swagger UI</title>
  <link rel="stylesheet" type="text/css" href="./swagger-ui.css" />
  <link rel="stylesheet" type="text/css" href="index.css" />
  <link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="./favicon-16x16.png" sizes="16x16" />
</head>

<body>
  <div id="swagger-ui"></div>
  <script src="./swagger-ui-bundle.js" charset="UTF-8"> </script>
  <script src="./swagger-ui-standalone-preset.js" charset="UTF-8"> </script>
  <script src="./swagger-initializer.js" charset="UTF-8"> </script>

+  <script>
+   window.onload = () => {
+     window.ui = SwaggerUIBundle({
+       url: '../cap-store/reference/akizuki/openapi.v1.yaml',
+       dom_id: '#swagger-ui',
+       presets: [
+         SwaggerUIBundle.presets.apis,
+         SwaggerUIStandalonePreset
+       ],
+       layout: "StandaloneLayout",
+     });
+    };
+  </script>
</body>

</html>
```

5. GithubPagesの設定

- Settings > Pages

### Source

- `deploy from a branch`

### branch

- branch > `main`
- folder > `docs`
- `save`ボタンを押し、数分すると同じページの上部にURLが表示される

### 参考

<https://zenn.dev/yuki_tu/articles/11618e3bd6fcf2>
