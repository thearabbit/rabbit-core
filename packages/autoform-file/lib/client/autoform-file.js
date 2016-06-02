var getCollection, getDocument;

AutoForm.addInputType('fileUpload', {
    template: 'afFileUpload',
    valueOut: function () {
        return this.val();
    }
});

getCollection = function (context) {
    if (typeof context.atts.collection === 'string') {
        return FS._collections[context.atts.collection] || window[context.atts.collection];
    }
};

getDocument = function (context) {
    var collection, id, ref, ref1;
    collection = getCollection(context);
    id = (ref = Template.instance()) != null ? (ref1 = ref.value) != null ? typeof ref1.get === "function" ? ref1.get() : void 0 : void 0 : void 0;
    return collection != null ? collection.findOne(id) : void 0;
};

Template.afFileUpload.onCreated(function () {
    var self;
    self = this;
    this.value = new ReactiveVar(this.data.value);
    this._stopInterceptValue = false;
    this._interceptValue = (function (_this) {
        return function (ctx) {
            var ref, t;
            if (!_this._stopInterceptValue) {
                t = Template.instance();
                if (t.value.get() !== false && t.value.get() !== ctx.value && ((ref = ctx.value) != null ? ref.length : void 0) > 0) {
                    t.value.set(ctx.value);
                    return _this._stopInterceptValue = true;
                }
            }
        };
    })(this);
    this._insert = function (file) {
        var collection, ref;
        collection = getCollection(self.data);
        if (Meteor.userId) {
            file.owner = Meteor.userId();
        }
        if (typeof ((ref = self.data.atts) != null ? ref.onBeforeInsert : void 0) === 'function') {
            file = (self.data.atts.onBeforeInsert(file)) || file;
        }
        return collection.insert(file, function (err, fileObj) {
            var ref1;
            if (typeof ((ref1 = self.data.atts) != null ? ref1.onAfterInsert : void 0) === 'function') {
                self.data.atts.onAfterInsert(err, fileObj);
            }
            if (err) {
                return console.log(err);
            }
            return self.value.set(fileObj._id);
        });
    };
    return this.autorun(function () {
        var _id;
        _id = self.value.get();
        return _id && Meteor.subscribe('autoformFileDoc', self.data.atts.collection, _id);
    });
});

Template.afFileUpload.onRendered(function () {
    var self;
    self = this;
    return $(self.firstNode).closest('form').on('reset', function () {
        return self.value.set(false);
    });
});

Template.afFileUpload.helpers({
    label: function () {
        return this.atts.label || 'Choose file';
    },
    removeLabel: function () {
        return this.atts.removeLabel || 'Remove';
    },
    value: function () {
        var doc;
        doc = getDocument(this);
        return (doc != null ? doc.isUploaded() : void 0) && doc._id;
    },
    schemaKey: function () {
        return this.atts['data-schema-key'];
    },
    previewTemplate: function () {
        var ref, ref1;
        return ((ref = this.atts) != null ? ref.previewTemplate : void 0) || (((ref1 = getDocument(this)) != null ? ref1.isImage() : void 0) ? 'afFileUploadThumbImg' : 'afFileUploadThumbIcon');
    },
    previewTemplateData: function () {
        return {
            file: getDocument(this),
            atts: this.atts
        };
    },
    file: function () {
        Template.instance()._interceptValue(this);
        return getDocument(this);
    },
    removeFileBtnTemplate: function () {
        var ref;
        return ((ref = this.atts) != null ? ref.removeFileBtnTemplate : void 0) || 'afFileRemoveFileBtnTemplate';
    },
    selectFileBtnTemplate: function () {
        var ref;
        return ((ref = this.atts) != null ? ref.selectFileBtnTemplate : void 0) || 'afFileSelectFileBtnTemplate';
    },
    uploadProgressTemplate: function () {
        var ref;
        return ((ref = this.atts) != null ? ref.uploadProgressTemplate : void 0) || 'afFileUploadProgress';
    }
});

Template.afFileUpload.events({
    'click .js-af-select-file': function (e, t) {
        return t.$('.js-file').click();
    },
    'change .js-file': function (e, t) {
        return t._insert(e.target.files[0]);
    },
    "dragover .js-af-select-file": function (e) {
        e.stopPropagation();
        return e.preventDefault();
    },
    "dragenter .js-af-select-file": function (e) {
        e.stopPropagation();
        return e.preventDefault();
    },
    "drop .js-af-select-file": function (e, t) {
        e.stopPropagation();
        e.preventDefault();
        return t._insert(new FS.File(e.originalEvent.dataTransfer.files[0]));
    },
    'click .js-af-remove-file': function (e, t) {
        e.preventDefault();
        return t.value.set(false);
    }
});

Template.afFileUploadThumbImg.helpers({
    url: function () {
        return this.file.url({
            store: this.atts.store
        });
    }
});

Template.afFileUploadThumbIcon.helpers({
    url: function () {
        return this.file.url({
            store: this.atts.store
        });
    },
    icon: function () {
        switch (this.file.extension()) {
            case 'pdf':
                return 'file-pdf-o';
            case 'doc':
            case 'docx':
                return 'file-word-o';
            case 'ppt':
            case 'avi':
            case 'mov':
            case 'mp4':
                return 'file-powerpoint-o';
            default:
                return 'file-o';
        }
    }
});
