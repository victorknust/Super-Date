Date.settings.extend({
    dayNames: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],
    monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ], 
    dateInWords: "#M %d, %Y", //Example: February 11, 2012
    dateInNumbersShort: "%m/%d/%Y", //Example: 1/5/2012
    dateInNumbersFull: "%M/%D/%Y", //Example: 01/05/2012
    timeDifference: {
        strings: {
            prefixAgo: null,
            prefixFromNow: null,
            suffixAgo: "ago",
            suffixFromNow: "from now",
            seconds: "less than a minute",
            minute: "about a minute",
            minutes: "%d minutes",
            hour: "about an hour",
            hours: "about %d hours",
            day: "a day",
            days: "%d days",
            month: "about a month",
            months: "%d months",
            year: "about a year",
            years: "%d years",
            numbers: []
        }
    }
});
