import {Template} from  'meteor/templating';
import {TAPi18n} from 'meteor/tap:i18n';

// Page
import './home.html';

Template.SimplePos_home.events({
    'click .uiblock'(event, instance){
        // UIBlock.block('Wait...');
        $.blockUI();

        Meteor.setTimeout(()=> {
            // UIBlock.unblock();
            $.unblockUI();
        }, 500);
    },
    'click .swal'(event, instance){
        swal({
            title: 'Submit email to run ajax request',
            input: 'email',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: function (email) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        if (email === 'taken@example.com') {
                            reject('This email is already taken.');
                        } else {
                            resolve();
                        }
                    }, 2000);
                });
            },
            allowOutsideClick: false
        }).then(function (email) {
            swal({
                type: 'success',
                title: 'Ajax request finished!',
                html: 'Submitted email: ' + email
            });
        });
    }
});
