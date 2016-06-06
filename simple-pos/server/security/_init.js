import {Security} from 'meteor/ongoworks:security';
import {Roles} from 'meteor/alanning:roles';

// Setting
Security.defineMethod("SimplePos_ifSetting", {
    fetch: [],
    transform: null,
    allow (type, arg, userId) {
        return Roles.userIsInRole(userId, ['setting'], 'SimplePos');
    }
});

// Data Entry
Security.defineMethod("SimplePos_ifDataInsert", {
    fetch: [],
    transform: null,
    allow (type, arg, userId) {
        return Roles.userIsInRole(userId, ['data-insert'], 'SimplePos');
    }
});

Security.defineMethod("SimplePos_ifDataUpdate", {
    fetch: [],
    transform: null,
    allow (type, arg, userId) {
        return Roles.userIsInRole(userId, ['data-update'], 'SimplePos');
    }
});

Security.defineMethod("SimplePos_ifDataRemove", {
    fetch: [],
    transform: null,
    allow (type, arg, userId) {
        return Roles.userIsInRole(userId, ['data-remove'], 'SimplePos');
    }
});

// Report
Security.defineMethod("SimplePos_ifReporter", {
    fetch: [],
    transform: null,
    allow (type, arg, userId) {
        return Roles.userIsInRole(userId, ['reporter'], 'SimplePos');
    }
});
