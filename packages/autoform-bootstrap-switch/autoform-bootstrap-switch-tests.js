// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by autoform-bootstrap-switch.js.
import { name as packageName } from "meteor/theara:autoform-bootstrap-switch";

// Write your tests here!
// Here is an example.
Tinytest.add('autoform-bootstrap-switch - example', function (test) {
  test.equal(packageName, "autoform-bootstrap-switch");
});
