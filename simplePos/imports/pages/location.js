import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import {lightbox} from 'meteor/theara:lightbox-helpers';
import {TAPi18n} from 'meteor/tap:i18n';
import {_} from 'meteor/erasaur:meteor-lodash';

// Lib
import {createNewAlertify} from '../../../core/client/libs/create-new-alertify.js';
import {renderTemplate} from '../../../core/client/libs/render-template.js';
import {destroyAction} from '../../../core/client/libs/destroy-action.js';
import {displaySuccess, displayError} from '../../../core/client/libs/display-alert.js';
import {__} from '../../../core/common/libs/tapi18n-callback-helper.js';

// Component
import '../../../core/client/components/loading.js';
import '../../../core/client/components/column-action.js';
import '../../../core/client/components/form-footer.js';

// Collection
import {Location} from '../../common/collections/location.js';

// Tabular
import {LocationTabular} from '../../common/tabulars/location.js';

// Method
import {lookupLocation} from '../../common/methods/lookupLocation';

// Page
import './location.html';

// Declare template
let indexTmpl = Template.SimplePos_location,
    actionTmpl = Template.SimplePos_locationAction,
    formTmpl = Template.SimplePos_locationForm,
    showTmpl = Template.SimplePos_locationShow;


// Index
indexTmpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify('location');
    createNewAlertify('locationShow');
});

indexTmpl.helpers({
    tabularTable(){
        return LocationTabular;
    }
});

indexTmpl.events({
    'click .js-create' (event, instance) {
        alertify.location(fa('plus', 'Location'), renderTemplate(formTmpl));
    },
    'click .js-update' (event, instance) {
        alertify.location(fa('pencil', 'Location'), renderTemplate(formTmpl, {
            locationId: this._id,
            type: this.type
        }));
    },
    'click .js-destroy' (event, instance) {
        destroyAction(
            Location,
            {_id: this._id},
            {title: 'Location', locationTitle: this.code}
        );
    },
    'click .js-display' (event, instance) {
        alertify.locationShow(fa('eye', 'Location'), renderTemplate(showTmpl, {locationId: this._id}));
    }
});

// Form
formTmpl.onCreated(function () {
    this.typeState = new ReactiveVar('P');

    this.autorun(() => {
        // Lookup value
        this.subscribe('simplePos.lookupValue', ['Unit', 'Location Type']);

        let currentData = Template.currentData();
        if (currentData) {
            this.typeState.set(currentData.type);
            this.subscribe('simplePos.locationById', currentData.locationId);
        }
    });
});

formTmpl.helpers({
    collection(){
        return Location;
    },
    data () {
        let data = {
            formType: 'insert',
            doc: {}
        };
        let currentData = Template.currentData();

        if (currentData) {
            data.formType = 'update';
            data.doc = Location.findOne(currentData.locationId);
        }

        return data;
    },
    showParent(){
        let type = Template.instance().typeState.get();
        return type !== 'P' ? true : false;
    }
});
formTmpl.events({
    'change [name="type"]'(event, instance){
        instance.typeState.set(instance.$(event.currentTarget).val());
    }
});

// Show
showTmpl.onCreated(function () {
    this.state = new ReactiveVar();

    this.autorun(() => {
        $.blockUI();

        let currentData = Template.currentData();
        lookupLocation.callPromise({
            locationId: currentData.locationId
        }).then((result) => {
            console.log(result);

            this.state.set(result);

            $.unblockUI();
        }).catch((err) => {
            console.log(err);
        });
    });
});

showTmpl.helpers({
    data () {
        return Template.instance().state.get();
    },
    jsonViewOpts () {
        return {collapsed: true};
    }
});

// Hook
let hooksObject = {
    before: {
        insert: function (doc) {
            if (doc.code && doc.parent) {
                let parentCode = _.trim(_.split($('[name="parent"] option:selected').text(), " : ")[0]);
                doc.code = parentCode + doc.code;
            }

            return doc;
        },
        update: function (doc) {
            if (doc.$set.code && doc.$set.parent) {
                let parentCode = _.trim(_.split($('[name="parent"] option:selected').text(), " : ")[0]);
                doc.$set.code = parentCode + doc.$set.code;
            }

            return doc;
        }
    },
    onSuccess (formType, result) {
        if (formType == 'update') {
            alertify.location().close();
        }
        displaySuccess();

        clearForm();
    },
    onError (formType, error) {
        displayError(error.message);
    },
    docToForm: function (doc, ss) {
        doc.code = _.last(doc.code.match(/\d{2}/g));
        return doc;
    },
};

AutoForm.addHooks(['SimplePos_locationForm'], hooksObject);

// Clear form
function clearForm() {
    let increaseCode = _.padStart(parseFloat($('[name="code"]').val()) + 1, 2, '0');

    $('[name="code"]').val(increaseCode);
    $('[name="khName"]').val('');
    $('[name="khName"]').focus();
    $('[name="enName"]').val('');
}