import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';

// Collection
// import {MyCollection} from '../../imports/api/collections/myCollection.js';

// export const myMethod = new ValidatedMethod({
//     name: 'simplePos.myMethod',
//     mixins: [CallPromiseMixin],
//     validate: new SimpleSchema({
//         myId: {type: String}
//     }).validator(),
//     run({myId}) {
//         if (!this.isSimulation) {
//             Meteor._sleepForMs(200);
//
//             let data = MyCollection.findOne({_id: myId});
//             return data;
//         }
//     }
// });