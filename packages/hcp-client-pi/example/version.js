const { version } = require("./package.json");

const fs = require("fs");

fs.appendFileSync(".env", `REACT_APP_VERSION=${version}`);
