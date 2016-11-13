import {Template} from  'meteor/templating';
import {TAPi18n} from 'meteor/tap:i18n';

// Chart js
import Chart from 'chart.js';

// Highcharts
import Highcharts from 'highcharts';
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

// Method
import {orderChartReport} from '../../common/methods/reports/order-chart';

// Page
import './home.html';

// Declare template
let indexTmpl = Template.SimplePos_home;

indexTmpl.onCreated(function () {
    this.isLoading = new ReactiveVar(true);
});

indexTmpl.onRendered(function () {
    this.autorun(()=> {
        orderChartReport.callPromise()
            .then((result)=> {
                // this.order =[
                //     {name: 'Mon', y: 1900},
                //     {name: 'Tue', y: 1500},
                //     {name: 'Wed', y: 2200},
                //     {name: 'Thu', y: 1700},
                //     {name: 'Fri', y: 3000},
                //     {name: 'Sat', y: 2500}
                // ];

                let chartOpts = {
                    chart: {
                        type: 'column'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Weekly Sale Order'
                    },
                    subtitle: {
                        text: 'Source: Rabbit Technology'
                    },
                    xAxis: {
                        type: 'category',
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Amount'
                        }

                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true,
                                format: '{point.y:.2f}$'
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}$</b><br/>'
                    },

                    series: [{
                        name: 'Brands',
                        colorByPoint: true,
                        data: result
                    }],
                };

                this.$('#container').highcharts(chartOpts);

                // Stop loading
                this.isLoading.set(false);

            }).catch((err)=> {
                console.log(err.message);
            }
        );

    });


    // var ctx = document.getElementById("myChart");
    // var myChart = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //         datasets: [{
    //             label: '# of Votes',
    //             data: [12, 19, 3, 5, 2, 3],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255,99,132,1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero:true
    //                 }
    //             }]
    //         }
    //     }
    // });
});

indexTmpl.helpers({
    isLoading(){
        return Template.instance().isLoading.get();
    }
});

indexTmpl.events({
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
