AutoForm.addInputType("switchery", {
    template: "afSwitchery",
    valueOut: function () {
        return !!this.is(":checked");
    },
    contextAdjust: function (context) {
        if (context.value === true) {
            context.atts.checked = "";
        }
        //don't add required attribute to checkboxes because some browsers assume that to mean that it must be checked, which is not what we mean by "required"
        delete context.atts.required;
        return context;
    }
});

Template.afSwitchery.helpers({
    atts: function addFormControlAtts() {
        var atts = _.clone(this.atts);
        // Add bootstrap class
        atts = AutoForm.Utility.addClass(atts, "form-control");
        delete atts.switcheryOptions;

        return atts;
    }
});


Template.afSwitchery.onRendered(function () {
    var elem = this.find('input');

    this.autorun(function () {
        var data = Template.currentData();
        var opts = data.atts.switcheryOptions || {};
        var init = new Switchery(elem, opts);
    });
});

Template.afSwitchery.onDestroyed(function () {
    var elem = this.find('input');
    if (elem) {
        var init = new Switchery(elem);
        init.destroy();
    }
});
