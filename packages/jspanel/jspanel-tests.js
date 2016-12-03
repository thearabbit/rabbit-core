// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by jspanel.js.
import { name as packageName } from "meteor/theara:jspanel";

// Write your tests here!
// Here is an example.
Tinytest.add('jspanel - example', function (test) {
  test.equal(packageName, "jspanel");
});
