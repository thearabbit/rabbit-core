AutoForm.addInputType('bootstrap-switch', {
    template: 'afBootstrapSwitch',
    valueOut: function () {
        return this.is(':checked');
    }
});

Template.afBootstrapSwitch.helpers({
    atts: function addFormControlAtts() {
        var atts = _.clone(this.atts);
        // Add bootstrap class
        atts = AutoForm.Utility.addClass(atts, "form-control");
        delete atts.switchOptions;

        return atts;
    }
});

Template.afBootstrapSwitch.rendered = function () {
    var input = this.find('input');

    this.autorun(function () {
        var data = Template.currentData();
        var opts = data.atts.switchOptions || {};

        input.bootstrapSwitch(opts);
    });
};

Template.afBootstrapSwitch.destroyed = function () {
    this.find('input').bootstrapSwitch('destroy');
};