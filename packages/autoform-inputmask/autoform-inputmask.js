AutoForm.addInputType("inputmask", {
    template: "afInputmask",
    valueIn: function (val, atts) {
        return val;
    },
    valueOut: function () {
        return this.val();
    }
});

Template.afInputmask.onRendered(function () {
    var $input = this.$('input');

    this.autorun(function () {
        var data = Template.currentData();
        var opts = data.atts.inputmaskOptions || {};

        // Check opts
        if (typeof opts == 'function') {
            opts = opts();
        }

        $input.inputmask(opts);
    });
});

Template.afInputmask.helpers({
    atts: function addFormControlAtts() {
        var atts = _.clone(this.atts);
        // Add bootstrap class
        atts = AutoForm.Utility.addClass(atts, "form-control");
        delete atts.inputmaskOptions;

        return atts;
    }
});

Template.afInputmask.onDestroyed(function () {
    var $input = this.$('input');
    if ($input) {
        $input.inputmask('remove');
    }
});
