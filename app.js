const {data} = require('./data.js');
const {main} = require("./src/infrastructure/shared/entrypoint/index.js");

(function() {
    main(data);
})();
