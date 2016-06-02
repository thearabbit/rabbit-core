// Files Collection
Files = new FS.Collection("files", {
    stores: [new FS.Store.GridFS("filesStore", {})]
});
