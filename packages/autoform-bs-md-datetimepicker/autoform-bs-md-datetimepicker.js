AutoForm.addInputType("bootstrap-material-datetimepicker", {
    template: "afBootstrapMaterialDateTimePicker",
    valueIn: function (val, atts) {
        // Check is function
        if (typeof val == 'function') {
            val = val();
        }

        if (val instanceof Date) {
            val = moment(val).format('DD-MM-YYYY HH:mm:ss');
        }
        atts.opts.currentDate = val;

        return val;
    },
    valueOut: function () {
        var val = this.val();
        if (typeof val == 'string') {
            val = moment(val, 'DD-MM-YYYY HH:mm:ss').toDate();
        }

        return val;
    }
});

Template.afBootstrapMaterialDateTimePicker.onRendered(function () {
    var $input = this.$('input');
    var data = this.data;
    var opts = data.atts.opts || {};
    if (typeof opts == 'function') {
        opts = opts();
    }

    $input.bootstrapMaterialDatePicker(opts);
});

Template.afBootstrapMaterialDateTimePicker.helpers({
    atts: function addFormControlAtts() {
        var atts = _.clone(this.atts);
        // Add bootstrap class
        atts = AutoForm.Utility.addClass(atts, "form-control");
        delete atts.opts;
        return atts;
    }
});

Template.afBootstrapMaterialDateTimePicker.onDestroyed(function () {
    var $input = this.$('input');
    if ($input) {
        $input.bootstrapMaterialDatePicker('destroy');
    }
});
