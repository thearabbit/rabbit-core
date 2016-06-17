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
import {orderReport} from '../../../common/methods/reports/oreder.js';

// Schema
import {OrderSchema} from '../../api/collections/reports/order.js';

// Page
import './order.html';

// Declare template
let formTmpl = Template.SimplePos_orderReport,
    genTmpl = Template.SimplePos_orderReportGen;

// Form
formTmpl.onCreated(function () {
});

formTmpl.helpers({
    schema(){
        return OrderSchema;
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
        let path = FlowRouter.path("simplePos.orderReportGen", params, queryParams);

        window.open(path, '_blank');
    },
    onError: function (formType, error) {
        sAlert.error(error.message);
    }
};

AutoForm.addHooks('SimplePos_orderReport', hooksObject);

// Generate
genTmpl.onCreated(function () {
    let self = this;
    self.dataState = new ReactiveVar(false);

    self.autorun(()=> {
        let query = FlowRouter.current().queryParams;
        orderReport.callPromise(query)
            .then(function (result) {
                self.dataState.set(result);
            }).catch(function (err) {
                console.log(err.message);
            }
        );
    })
});
genTmpl.helpers({
    i18nLabel(){

    },
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            // fontSize: 'bg',
            paper: 'mini',
            orientation: 'portrait'
        };
    },
    data: function () {
        let instance = Template.instance();
        return instance.dataState.get();
    }
});