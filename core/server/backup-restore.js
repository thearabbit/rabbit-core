import  {Meteor} from 'meteor/meteor';
import  {Accounts} from 'meteor/accounts-base';
import  {EEJSON} from 'meteor/ejson';
import  {Picker} from 'meteor/meteorhacks:picker';
import  moment from 'moment';
import {_} from 'meteor/erasaur:meteor-lodash';
import 'meteor/matb33:collection-hooks';
import 'meteor/dburles:mongo-collection-instances';

import  Backup from 'mongodb-backup';
import Restore from 'mongodb-restore';
import Busboy from 'busboy';

Picker.route('/app-dump', function (params, req, res, next) {
    let filename, token, userToken;

    /*** Backup ***/
    if (req.method === 'GET') {
        let backupOptions = {
            uri: process.env.MONGO_URL,
            tar: 'dump.tar',
            parser: 'bson' // bson | json
        };

        // Check token
        token = params.query.token || '';
        check(token, String);
        userToken = Meteor.users.findOne({
            'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(token)
        });
        if (!userToken) {
            res.statusCode = 401;
            return res.end(EJSON.stringify({backup: 'Unauthorized'}));
        }

        // Check collections
        if (params.query.collections) {
            check(params.query.collections, String);
            let collections = params.query.collections.split(',').map(function (col) {
                return col.trim();
            });
            if (collections.length > 0) {
                backupOptions.collections = collections;
            }
        }

        // Check query
        if (params.query.query) {
            check(params.query.query, String);
            try {
                backupOptions.query = EJSON.parse(params.query.query);
            } catch (_error) {
                res.statusCode = 401;
                return res.end(EJSON.stringify({backup: 'Failed to parse EJSON Query'}));
            }
        }

        // File name
        filename = params.query.filename + '_' + moment().format('YYMMDDHHmmss') + '.tar';

        res.statusCode = 200;
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        backupOptions.stream = res;

        Backup(backupOptions);
    }

    /*** Restore ***/
    if (req.method === 'POST') {
        let busboy = new Busboy({headers: req.headers});
        let restoreOptions = {
            uri: process.env.MONGO_URL,
            parser: 'bson', // bson | json
            dropCollections: false
        };
        let dropCollections = false, dropQuery = {};

        // Field
        busboy.on('field', Meteor.bindEnvironment(function (fieldname, val, fieldnameTruncated, valTruncated) {
            console.log('filed-----------');

            // Check token
            if (fieldname === 'token') {
                console.log('token: ' + val);

                token = val || '';
                check(token, String);
                userToken = Meteor.users.findOne({
                    'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(token)
                });
                if (!userToken) {
                    res.statusCode = 401;
                    return res.end(EJSON.stringify({backup: 'Unauthorized'}));
                }
            }

            // Check drop collections
            if (fieldname === 'dropCollections') {
                console.log('dropCollections: ' + val);

                val = val || 'false';
                check(val, String);
                if (val == 'false') {
                    dropCollections = false;
                } else if (val == 'true') {
                    dropCollections = true;
                } else {
                    dropCollections = val.split(',').map(function (col) {
                        return col.trim();
                    });
                }
            }

            // Check drop query
            if (fieldname === 'dropQuery') {
                console.log('dropQuery: ' + val);

                val = val || '{}';
                check(val, String);
                try {
                    dropQuery = EJSON.parse(val);
                } catch (_error) {
                    res.statusCode = 401;
                    return res.end(EJSON.stringify({backup: 'Failed to parse EJSON Query'}));
                }
            }
        }));

        busboy.on('file', Meteor.bindEnvironment(function (fieldname, file, filename, encoding, mimetype) {
            console.log('file---------------');

            /***** Check drop collections and query *****/
            if (_.isArray(dropCollections)) {
                if (_.isEmpty(dropQuery)) {
                    restoreOptions.dropCollections = dropCollections;
                } else {
                    console.log('Drop collection before restoring by manual');
                    dropCollectionsManual(dropCollections, dropQuery);
                }
            } else {
                restoreOptions.dropCollections = dropCollections;
            }
            /****** --Check drop collections and query-- *****/

            restoreOptions.stream = file;
            restoreOptions.callback = function () {
                return res.end(EJSON.stringify({restore: restoreOptions}));
            };

            Restore(restoreOptions);
        }));

        return req.pipe(busboy);
    }
});

let dropCollectionsManual = function (collections, query) {
    _.forEach(collections, function (col) {
        Mongo.Collection.get(col).direct.remove(query, function (error) {
            if (error) {
                console.log('... is error (' + col + '): ' + error);
                return false;
            }
        });
    });

    console.log('... is success');
    return true;
};
