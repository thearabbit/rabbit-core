import {Company} from '../../imports/api/collections/company.js';
import {Branch} from '../../imports/api/collections/branch.js';
import {Setting} from '../../imports/api/collections/setting.js';
import {Exchange} from '../../imports/api/collections/exchange.js';

// Lib
import './_init.js';

// Company
Company.permit(['update'])
    .core_ifSuperOrAdmin()
    .allowInClientCode();

// Branch
Branch.permit(['insert'])
    .core_ifSuper()
    .allowInClientCode();
Branch.permit(['update'])
    .core_ifSuperOrAdmin()
    .allowInClientCode();
Branch.permit(['remove'])
    .core_ifSuper()
    .allowInClientCode();

// Setting
Setting.permit(['update'])
    .core_ifSuperOrAdmin()
    .allowInClientCode();

// Exchange
Exchange.permit(['insert', 'update', 'remove'])
    .core_ifSuperOrAdmin()
    .allowInClientCode();

// User
Meteor.users.permit(['insert', 'update', 'remove'])
    .core_ifSuperOrAdmin()
    .allowInClientCode();
