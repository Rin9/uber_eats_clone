import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";

import banner from "./banner";
import marketing from "./marketing";

export default createSchema({
  // We name our schema
  name: "default",
  types: schemaTypes.concat([banner, marketing]),
});
