// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by treegrid.js.
import { name as packageName } from "meteor/theara:treegrid";

// Write your tests here!
// Here is an example.
Tinytest.add('treegrid - example', function (test) {
  test.equal(packageName, "treegrid");
});
