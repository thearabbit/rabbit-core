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
import {invoiceReport} from '../../../common/methods/reports/invoice.js';

// Schema
import {InvoiceSchema} from '../../api/collections/reports/invoice.js';

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
        return InvoiceSchema;
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

        invoiceReport.callPromise(queryParams)
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
    },
    increaseIndex(index){
        return index += 1;
    }
});

genTmpl.events({
    'click .btn-print-this'(event, instance){
        // Print This Package
        let opts = {
            // debug: true,               // show the iframe for debugging
            // importCSS: true,            // import page CSS
            // importStyle: true,         // import style tags
            // printContainer: true,       // grab outer container as well as the contents of the selector
            // loadCSS: "path/to/my.css",  // path to additional css file - us an array [] for multiple
            // pageTitle: "",              // add title to print page
            // removeInline: false,        // remove all inline styles from print elements
            // printDelay: 333,            // variable print delay; depending on complexity a higher value may be necessary
            // header: null,               // prefix to html
            // formValues: true            // preserve input/form values
        };

        $('#print-data').printThis(opts);
    },
    'click .btn-print-area'(event, instance){
        // Print Area Package
        let opts = {
            //
        };

        $('#print-data').printArea(opts);
    }
});
