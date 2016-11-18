import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';

// Collection
import {Location} from '../collections/location.js';

export const lookupLocation = new ValidatedMethod({
    name: 'simplePos.lookupLocation',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        locationId: {type: String}
    }).validator(),
    run({locationId}) {
        if (!this.isSimulation) {
            Meteor._sleepForMs(200);

            let data = Location.aggregate([
                {
                    $match: {
                        _id: locationId
                    }
                },
                {
                    $unwind: {path: "$ancestors", preserveNullAndEmptyArrays: true}
                },
                {
                    $lookup: {
                        from: "simplePos_location",
                        localField: "ancestors",
                        foreignField: "_id",
                        as: "ancestorsDoc"
                    }
                },
                {
                    $unwind: {path: "$ancestorsDoc", preserveNullAndEmptyArrays: true}
                },
                {
                    $group: {
                        _id: "$_id",
                        type: {$first: "$type"},
                        parent: {$first: "$parent"},
                        code: {$first: "$code"},
                        khName: {$first: "$khName"},
                        enName: {$first: "$enName"},
                        ancestorsDoc: {
                            $push: {
                                code: "$ancestorsDoc.code",
                                khName: "$ancestorsDoc.khName",
                                enName: "$ancestorsDoc.enName"
                            }
                        }
                    }
                }
            ]);

            return data[0];
        }
    }
});