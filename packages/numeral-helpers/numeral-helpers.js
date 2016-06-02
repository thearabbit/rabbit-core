if (Meteor.isClient) {
    // Format
    Template.registerHelper('numFormat', function (number, format) {
        return numeral(number).format(format);
    });

    // Unformat
    Template.registerHelper('numUnformat', function (string) {
        return numeral().unformat(string);
    });
}
