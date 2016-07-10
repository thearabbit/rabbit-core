// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by round2.js.
import { name as packageName } from "meteor/theara:round2";

// Write your tests here!
// Here is an example.
Tinytest.add('round2 - example', function (test) {
  test.equal(packageName, "round2");
});
