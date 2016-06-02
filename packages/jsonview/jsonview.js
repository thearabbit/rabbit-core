Template.jsonView.onRendered(function () {
    this.autorun(() => {
        var json = this.view.lookup('json')();
        var options = this.view.lookup('options')();
        this.$('.json-view').JSONView(json || {}, options || {});
    });
});