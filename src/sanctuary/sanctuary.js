R = require("ramda");
const { create, env } = require("sanctuary");
const S = create({ checkTypes: false, env: env });

S.add("hello", 3);
