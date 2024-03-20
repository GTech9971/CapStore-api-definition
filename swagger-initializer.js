window.onload = function () {
  //<editor-fold desc="Changeable Configuration Block">

  function get_url() {
    // @see https://stackoverflow.com/questions/35914069/how-can-i-get-query-parameters-from-a-url-in-vue-js
    let uri = window.location.href.split('?');
    if (uri.length === 2) {
      let vars = uri[1].split('&');
      let getVars = {};
      let tmp = '';
      vars.forEach(function (v) {
        tmp = v.split('=');
        if (tmp.length === 2)
          getVars[tmp[0]] = tmp[1];
      });
      return getVars.url;
    }
  }

  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  window.ui = SwaggerUIBundle({
    url: get_url(),
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
