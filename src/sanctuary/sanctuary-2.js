const { create, env } = require("sanctuary");
const S = create({ checkTypes: false, env: env });

console.log(S.add("hello", 3));
