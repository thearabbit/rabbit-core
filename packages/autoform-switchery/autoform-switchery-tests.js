// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by autoform-switchery.js.
import { name as packageName } from "meteor/theara:autoform-switchery";

// Write your tests here!
// Here is an example.
Tinytest.add('autoform-switchery - example', function (test) {
  test.equal(packageName, "autoform-switchery");
});
