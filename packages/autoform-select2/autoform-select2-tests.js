// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by autoform-select2.js.
import { name as packageName } from "meteor/autoform-select2";

// Write your tests here!
// Here is an example.
Tinytest.add('autoform-select2 - example', function (test) {
  test.equal(packageName, "autoform-select2");
});
