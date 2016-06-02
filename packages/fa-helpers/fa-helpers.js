/**
 * Font Awesome helper
 */
fa = function (name, title, safeString) {
    var title = _.isUndefined(title) ? "" : (" " + title);
    var safeString = _.isUndefined(safeString) ? false : safeString;

    if (safeString === false) {
        return '<i class="fa fa-' + name + '"></i>' + title;
    } else {
        return Spacebars.SafeString('<i class="fa fa-' + name + '"></i>' + title);
    }
};

if (Meteor.isClient) {
    Template.registerHelper('fa', function (name) {
        return Spacebars.SafeString('<i class="fa fa-' + name + '"></i>');
    });
}
