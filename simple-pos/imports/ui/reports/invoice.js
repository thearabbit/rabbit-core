import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {AutoForm} from 'meteor/aldeed:autoform';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import 'meteor/theara:autoprint';
import 'printthis';

// Lib
import {displaySuccess, displayError} from '../../../../core/client/libs/display-alert.js';


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
import './invoice.html';

// Declare template
let indexTmpl = Template.SimplePos_invoiceReport,
    genTmpl = Template.SimplePos_invoiceReportGen;


// Form
indexTmpl.onCreated(function () {
    this.autorun(() => {
        // Subscribe data for form filter
    });
});

indexTmpl.helpers({
    schema(){
        return OrderSchema;
    },
});

// Form hook
let hooksObject = {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
        this.event.preventDefault();
        this.done(null, insertDoc);
    },
    onSuccess: function (formType, result) {
        let params = {};
        let queryParams = result;
        let path = FlowRouter.path("simplePos.invoiceReportGe", params, queryParams);

        window.open(path, '_blank');
    },
    onError: function (formType, error) {
        displayError(error.message);
    }
};

AutoForm.addHooks('SimplePos_invoiceReport', hooksObject);

// Generate
genTmpl.onCreated(function () {
    this.rptDataState = new ReactiveVar();

    this.autorun(()=> {
        let queryParams = FlowRouter.current().queryParams;

        orderReport.callPromise(queryParams)
            .then((result)=> {
                this.rptDataState.set(result);
            }).catch((err)=> {
                console.log(err.message);
            }
        );
    });
});
genTmpl.helpers({
    rptData(){
        return Template.instance().rptDataState.get();
    }
});