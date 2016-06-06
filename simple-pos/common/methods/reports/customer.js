import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Company} from '../../../../core/imports/api/collections/company.js';
import {Customer} from '../../../imports/api/collections/customer.js';

export const customerReport = new ValidatedMethod({
    name: 'simplePos.customerReport',
    mixins: [CallPromiseMixin],
    validate: null,
    run(params) {
        if (!this.isSimulation) {
            Meteor._sleepForMs(2000);

            let data = {
                title: {},
                header: {},
                content: [{index: 'No Result'}],
                footer: {}
            };

            // let date = _.trim(_.words(params.date, /[^To]+/g));
            let branch = params.branch;
            let name = params.name;
            let date = params.repDate;
            let fDate = moment(date[0]).toDate();
            let tDate = moment(date[1]).add(1, 'days').toDate();

            /****** Title *****/
            data.title = Company.findOne();

            /****** Header *****/
            data.header = params;

            /****** Content *****/
            let content = [];
            let selector = {};

            if (!_.isEmpty(branch)) {
                selector.branchId = {$in: branch};
            }
            if (!_.isEmpty(name)) {
                selector.name = {$regex: name, $options: 'i'};
            }

            let index = 1;
            Customer.find(selector)
                .forEach(function (obj) {
                    // Do something
                    obj.index = index;

                    content.push(obj);

                    index++;
                });

            if (content.length > 0) {
                data.content = content;
            }
            
            return data
        }
    }
});
