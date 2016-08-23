# Autoform daterange picker

### Install

```js
meteor add theara:autoform-bs-daterangepicker
```
### Usage

```js
// SimpleSchema
............
    ......
    repDate: {
        type: [Date],
        label: 'Date',
        autoform: {
            type: "bootstrap-daterangepicker",
            afFieldInput: {
                dateRangePickerOptions: function () {
                    return dateRangePickerOptions;
                }
            }
        }
    }
```

