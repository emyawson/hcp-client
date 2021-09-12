const express = require("express");
var serveStatic = require("serve-static");

const { join } = require("path");
const { readFileSync } = require("fs");

const app = express();
require("dotenv").config();

const generateConfig = env => {
  const prefixRegexp = /^REACT_APP_/;
  return Object.keys(env)
    .filter(key => prefixRegexp.test(key))
    .reduce(
      (c, key) => ({
        ...c,
        [key]: env[key],
      }),
      {},
    );
};

const configureIndex = (path, env, variable) => {
  const config = generateConfig(env);
  const originalHtml = readFileSync(path, "utf8");
  const html = originalHtml.replace(variable, JSON.stringify(config));
  return Buffer.from(html);
};

app.use(serveStatic(join(__dirname, "build"), { index: false }));

app.get("*", function(req, res) {
  const path = join(__dirname, "build", "index.html");
  const configuredIndex = configureIndex(path, process.env, "__REACT_APP__");
  const configuredIndexLength = configuredIndex.length.toString();
  res
    .type("html")
    .header("Content-Length", configuredIndexLength)
    .status(200)
    .send(configuredIndex);
});

app.listen(3000);
