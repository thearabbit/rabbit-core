import {Template} from 'meteor/templating';

Template.registerHelper('currentModule', function () {
    return Session.get('currentModule');
});

Template.registerHelper('currentBranch', function () {
    return Session.get('currentBranch');
});
