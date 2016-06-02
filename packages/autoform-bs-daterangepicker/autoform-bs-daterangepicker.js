AutoForm.addInputType('bootstrap-daterangepicker', {
    template: 'afBootstrapDateRangePicker',
    valueIn: function (val, attrs) {
        if (_.isArray(val)) {
            var startDate = moment(val[0]).format(attrs.dateRangePickerOptions.format);
            var endDate = moment(val[1]).format(attrs.dateRangePickerOptions.format);
            return startDate + " - " + endDate;
        }
        //console.log('In');
        //console.log(val);

        return val;
    },
    valueOut: function () {
        var range = this.data('daterangepicker');
        var startDate = range.startDate.toDate();
        var endDate = range.startDate.toDate();

        //console.log('Out');
        //console.log(startDate);
        //console.log(endDate);

        return [startDate, endDate];
    },
    valueConverters: {
        "dateArray": function (val) {
            //console.log('convert');
            //console.log(val);

            if (!val) {
                return [];
            }

            var startDate = val[0] ? val[0] : null;
            var endDate = val[1] ? val[1] : null;
            return [startDate, endDate];
        }
    }
});

Template.afBootstrapDateRangePicker.onRendered(function () {
    var $input = this.$('input');
    var data = this.data;
    var opts = data.atts.dateRangePickerOptions || {};

    //console.log('render');
    //console.log(data);

    // instanciate daterangepicker
    $input.daterangepicker(opts);
});

Template.afBootstrapDateRangePicker.helpers({
    atts: function addFormControlAtts() {
        var atts = _.clone(this.atts);
        // Add bootstrap class
        atts = AutoForm.Utility.addClass(atts, "form-control");
        delete atts.dateRangePickerOptions;
        return atts;
    }
});

Template.afBootstrapDateRangePicker.onDestroyed(function () {
    var $input = this.$('input');
    var drp = $input.data('daterangepicker');
    if(drp){
        drp.remove()
    }
});

//var range = {};
//
//AutoForm.addInputType('bootstrap-daterangepicker', {
//    template: 'afBootstrapDateRangePicker',
//    valueOut: function () {
//        if (range.startDate && range.endDate)
//            return [range.startDate.toDate(), range.endDate.toDate()];
//        else
//            return [];
//    },
//    valueConverters: {
//        "dateArray": function (val) {
//            if (range.startDate && range.endDate)
//                return [range.startDate.toDate(), range.endDate.toDate()];
//            else
//                return [];
//        }
//    }
//});
//
//Template.afBootstrapDateRangePicker.helpers({
//    atts: function addFormControlAtts() {
//        var atts = _.clone(this.atts);
//        // Add bootstrap class
//        atts = AutoForm.Utility.addClass(atts, "form-control");
//        delete atts.dateRangePickerOptions;
//        return atts;
//    },
//    dateRangePickerValue: function() {
//        return this.atts['dateRangePickerValue'];
//    }
//});
//
//Template.afBootstrapDateRangePicker.rendered = function () {
//
//    var $input = this.$('input');
//    var data = this.data;
//
//    if (data.atts.dateRangePickerOptions.startDate)
//        range.startDate = data.atts.dateRangePickerOptions.startDate;
//
//    if (data.atts.dateRangePickerOptions.endDate)
//        range.endDate = data.atts.dateRangePickerOptions.endDate;
//
//    // instanciate datepicker
//    $input.daterangepicker(
//        data.atts.dateRangePickerOptions,
//        function(start, end) {
//            range.startDate = start;
//            range.endDate = end;
//        }
//    );
//};
//
//Template.afBootstrapDateRangePicker.destroyed = function () {
//    var $input = this.$('input');
//    $input.daterangepicker('remove');
//};