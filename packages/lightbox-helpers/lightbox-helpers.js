/**
 * Lightbox helper
 */
lightbox = function (url, name, title, icon, safeString) {
    var safeString = _.isUndefined(safeString) ? false : safeString;

    if (safeString === false) {
        return getLightbox(url, name, title, icon);
    } else {
        return Spacebars.SafeString(getLightbox(url, name, title, icon));
    }
};

if (Meteor.isClient) {
    Template.registerHelper('lightbox', function (options) {
        var optionsVal = options.hash;
        return Spacebars.SafeString(getLightbox(optionsVal.url, optionsVal.name, optionsVal.title, optionsVal.icon));
    });
}

function getLightbox(url, name, title, icon) {
    var nameVal = name;
    var titleVal = title;

    if (_.isUndefined(nameVal) || _.isNull(nameVal) || _.isEmpty(nameVal)) {
        nameVal = Random.id();
    }
    if (_.isUndefined(titleVal) || _.isNull(titleVal)) {
        titleVal = '';
    }

    var lightbox = '<a href="' + url + '" data-lightbox="' + nameVal + '" data-title="' + titleVal + '">' +
        '<img src="' + url + '" class="img-circle" width="50px" height="50px">' +
        '</a>';

    if (!_.isUndefined(icon)) {
        lightbox = '<a href="' + url + '" data-lightbox="' + nameVal + '" data-title="' + titleVal + '">' +
            '<i class="fa fa-' + icon + '"></i>' +
            '</a>';
    }

    return lightbox;
}
