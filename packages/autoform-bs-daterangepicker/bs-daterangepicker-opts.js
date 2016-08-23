dateRangePickerOptions = {
    "ranges": {
        "Today": [
            moment().toDate(),
            moment().toDate()
        ],
        "Yesterday": [
            moment().subtract(1, 'days'),
            moment().subtract(1, 'days')
        ],
        "Last 7 Days": [
            moment().subtract(1, 'weeks'),
            moment().toDate()
        ],
        "Last 30 Days": [
            moment().subtract(30, 'days'),
            moment().toDate()
        ],
        "This Month": [
            moment().startOf('month'),
            moment().endOf('month')
        ],
        "Last Month": [
            moment().subtract(1, 'months').startOf('month'),
            moment().subtract(1, 'months').endOf('month')
        ],
        "Next Month": [
            moment().add(1, 'months').startOf('month'),
            moment().add(1, 'months').endOf('month')
        ]
    },
    //dateLimit: {days: 6},
    //minDate: moment().add(-150, 'days'),
    //maxDate: moment().add(6, 'months'),
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    timePicker: false,
    locale: {
        format: 'DD/MM/YYYY',
    }
    //timePickerIncrement: 30,
    //timePicker12Hour: false,
    //timePickerSeconds: false
};