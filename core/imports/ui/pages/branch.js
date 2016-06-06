import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import {TAPi18n} from 'meteor/tap:i18n';

// Lib
import '../../../client/components/loading.js';
import '../../../client/components/column-action.js';
import '../../../client/components/form-footer.js';
import {createNewAlertify} from '../../../client/libs/create-new-alertify.js';
import {renderTemplate} from '../../../client/libs/render-template.js';
import {destroyAction} from '../../../client/libs/destroy-action.js';
import {displaySuccess, displayError} from '../../../client/libs/display-alert.js';

// Collection
import {Branch} from '../../api/collections/branch.js';

// Tabular
import {BranchTabular} from '../../../common/tabulars/branch.js';

// Page
import './branch.html';

// Declare template
let indexTmpl = Template.Core_branch,
    actionTmpl = Template.Core_branchAction,
    newTmpl = Template.Core_branchNew,
    editTmpl = Template.Core_branchEdit,
    showTmpl = Template.Core_branchShow;


// Index
indexTmpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify('branch', {size: 'lg'});
    createNewAlertify('branchShow');
});

indexTmpl.helpers({
    tabularTable(){
        return BranchTabular;
    }
});

indexTmpl.events({
    'click .js-create' (event, instance) {
        alertify.branch(fa('plus', TAPi18n.__('core.branch.title')), renderTemplate(newTmpl));
    },
    'click .js-update' (event, instance) {
        alertify.branch(fa('pencil', TAPi18n.__('core.branch.title')), renderTemplate(editTmpl, this));
    },
    'click .js-destroy' (event, instance) {
        destroyAction(
            Branch,
            {_id: this._id},
            {title: TAPi18n.__('core.branch.title'), itemTitle: this._id}
        );
    },
    'click .js-display' (event, instance) {
        alertify.branchShow(fa('eye', TAPi18n.__('core.branch.title')), renderTemplate(showTmpl, this));
    }
});

// New
newTmpl.helpers({
    collection(){
        return Branch;
    }
});

// Edit
editTmpl.onCreated(function () {
    this.autorun(()=> {
        this.subscribe('core.branch', {_id: this.data._id});
    });
});

editTmpl.helpers({
    collection(){
        return Branch;
    },
    data () {
        let data = Branch.findOne(this._id);
        return data;
    }
});

// Show
showTmpl.onCreated(function () {
    this.autorun(()=> {
        this.subscribe('core.branch', {_id: this.data._id});
    });
});

showTmpl.helpers({
    data () {
        let data = Branch.findOne(this._id);
        return data;
    }
});

// Hook
let hooksObject = {
    onSuccess (formType, result) {
        if (formType == 'update') {
            alertify.branch().close();
        }
        displaySuccess();
    },
    onError (formType, error) {
        displayError(error.message)
    }
};

AutoForm.addHooks([
    'Core_branchNew',
    'Core_branchEdit'
], hooksObject);
