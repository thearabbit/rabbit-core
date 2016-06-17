import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {AutoForm} from 'meteor/aldeed:autoform';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import 'meteor/theara:autoprint';

// Component
import '../../../../core/imports/ui/layouts/report/content.html';
import '../../../../core/imports/ui/layouts/report/sign-footer.html';
import '../../../../core/client/components/loading.js';
import '../../../../core/client/components/form-footer.js';

// Method
import {customerReport} from '../../../common/methods/reports/customer.js';

// Schema
import {CustomerSchema} from '../../api/collections/reports/customer.js';

// Page
import './customer.html';

// Declare template
let formTmpl = Template.SimplePos_customerReport,
    genTmpl = Template.SimplePos_customerReportGen;

// Form
formTmpl.onCreated(function () {
    let user = Meteor.user();
    this.autorun(() => {
        if (user) {
            let rolesBranch = user.rolesBranch;
            this.subscribe('core.branch', {_id: {$in: rolesBranch}});
        }
    });
});

formTmpl.helpers({
    schema(){
        return CustomerSchema;
    }
});

// Form hook
let hooksObject = {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
        this.event.preventDefault();

        // You must call this.done()!
        //this.done(); // submitted successfully, call onSuccess
        //this.done(new Error('foo')); // failed to submit, call onError with the provided error
        this.done(null, insertDoc); // submitted successfully, call onSuccess with `result` arg set to "foo"
        //return false;
    },
    onSuccess: function (formType, result) {
        let params = {};
        let queryParams = result;
        let path = FlowRouter.path("simplePos.customerReportGen", params, queryParams);

        window.open(path, '_blank');
    },
    onError: function (formType, error) {
        sAlert.error(error.message);
    }
};

AutoForm.addHooks('SimplePos_customerReport', hooksObject);

// Generate
genTmpl.onCreated(function () {
    let self = this;
    self.dataState = new ReactiveVar(false);

    self.autorun(()=> {
        let query = FlowRouter.current().queryParams;
        customerReport.callPromise(query)
            .then(function (result) {
                self.dataState.set(result);
            }).catch(function (err) {
                console.log(err.message);
            }
        );
    })
});
genTmpl.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            //fontSize: 'bg',
            paper: 'a4',
            orientation: 'portrait'
        };
    },
    data: function () {
        let instance = Template.instance();
        return instance.dataState.get();
    }
});