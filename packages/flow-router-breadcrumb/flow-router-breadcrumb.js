Breadcrumb = {};

// Register
var data = {};
Breadcrumb.register = function (route) {
    route.options.breadcrumb.title = route.options.breadcrumb.title || 'No Title';

    data[route.name] = route;
};

// Render
var dataArray = [];
Breadcrumb.render = function (routeName) {
    dataArray = []; // Clear data array for the first time

    var routeName = routeName || FlowRouter.getRouteName();
    var getRouter = data[routeName];

    // Gen route url
    var paramAndQuery = genParamAndQuery(getRouter.options.breadcrumb);
    var url = FlowRouter.url(routeName, paramAndQuery.params, paramAndQuery.queryParams);

    // Push data
    dataArray.push({
        title: getRouter.options.breadcrumb.title,
        url: url,
        icon: getRouter.options.breadcrumb.icon,
        isActive: 'active'
    });

    // Check parent
    if (getRouter.options.breadcrumb.parent) {
        getParent(getRouter.options.breadcrumb.parent)
    }

    return dataArray.reverse();
};

// Get parent router
var getParent = function (route) {
    var getRouter = data[route];

    // Gen route url
    var paramAndQuery = genParamAndQuery(getRouter.options.breadcrumb);
    var url = FlowRouter.url(route, paramAndQuery.params, paramAndQuery.queryParams);

    // Push data
    dataArray.push({
        title: getRouter.options.breadcrumb.title,
        url: url,
        icon: getRouter.options.breadcrumb.icon,
        isActive: false
    });

    // Check parent parent
    if (getRouter.options.breadcrumb.parent) {
        getParent(getRouter.options.breadcrumb.parent)
    }

    return false;
};

// Generate param and query
var genParamAndQuery = function (breadcrumb) {
    // Check is array
    breadcrumb.params = _.isArray(breadcrumb.params) ? breadcrumb.params : [breadcrumb.params];
    breadcrumb.queryParams = _.isArray(breadcrumb.queryParams) ? breadcrumb.queryParams : [breadcrumb.queryParams];

    var params = {};
    _.each(breadcrumb.params, function (o) {
        params[o] = FlowRouter.getParam(o);
    });
    var queryParams = {};
    _.each(breadcrumb.queryParams, function (o) {
        queryParams[o] = FlowRouter.getQueryParam(o);
    });

    return {params: params, queryParams: queryParams};
};

/**
 * Register to flow router
 */
FlowRouter.onRouteRegister(function (route) {
    if (route.options.breadcrumb) {
        Breadcrumb.register(route);
    }
});

/**
 * Template helper
 */
Template.registerHelper('breadcrumb', function () {
    return Breadcrumb.render();
});
