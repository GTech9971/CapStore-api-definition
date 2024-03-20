# CapStore-api-definition

 電子部品在庫管理のWebAPI定義

## localhostでSwagger UI 起動

### Swagger UIダウンロード

```bash
git clone https://github.com/swagger-api/swagger-ui.git
```

`dist`フォルダの`swagger-initializer.js`を以下のように変更

swagger-initializer.js

```javascript
  window.onload = function () {
    //<editor-fold desc="Changeable Configuration Block">

+    function get_url() {
+      // @see https://stackoverflow.com/questions/35914069/how-can-i-get-query-parameters-from-a-url-in-vue-js
+      let uri = window.location.href.split('?');
+      if (uri.length === 2) {
+        let vars = uri[1].split('&');
+        let getVars = {};
+        let tmp = '';
+        vars.forEach(function (v) {
+          tmp = v.split('=');
+          if (tmp.length === 2)
+            getVars[tmp[0]] = tmp[1];
+        });
+        return getVars.url;
+      }
+    }

    // the following lines will be replaced by docker/configurator, when it runs in a docker-container
    window.ui = SwaggerUIBundle({
-     url: "https://petstore.swagger.io/v2/swagger.json",
+     url: get_url(),
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout"
    });

    //</editor-fold>
  };
```

### openapiファイル配置

`index.html`があるファイルと同じ場所にyamlファイルまたはそれらが格納されているフォルダを配置する

### ローカルhttp server起動

以下のコマンドを実行

```bash
python3 -m http.server 8000
```

### Swagger UIをブラウザで閲覧

以下のURLをブラウザで開く

<http://localhost:8000>

ファイルを指定して開く場合は以下
<http://localhost:8000?url=http://localhost:8000/akizuki/akizuki.v1.yaml>

## 参考
<https://qiita.com/hidao/items/d13e7dda3da02d37dd45>
