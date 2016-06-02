import {Security} from 'meteor/ongoworks:security';
import {Roles} from 'meteor/alanning:roles';

// Super
Security.defineMethod("core_ifSuper", {
    fetch: [],
    transform: null,
    allow (type, arg, userId) {
        return Roles.userIsInRole(userId, ['super'], 'Core');
    }
});

// Admin
Security.defineMethod("core_ifAdmin", {
    fetch: [],
    transform: null,
    allow (type, arg, userId) {
        return Roles.userIsInRole(userId, ['admin'], 'Core');
    }
});

// Super or admin
Security.defineMethod("core_ifSuperOrAdmin", {
    fetch: [],
    transform: null,
    allow (type, arg, userId) {
        return Roles.userIsInRole(userId, ['super', 'admin'], 'Core');
    }
});
