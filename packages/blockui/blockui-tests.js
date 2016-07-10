// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by blockui.js.
import { name as packageName } from "meteor/theara:blockui";

// Write your tests here!
// Here is an example.
Tinytest.add('blockui - example', function (test) {
  test.equal(packageName, "blockui");
});
