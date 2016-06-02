Meteor.publish('files', function () {
    if (this.userId) {
        return Files.find();
    }
});