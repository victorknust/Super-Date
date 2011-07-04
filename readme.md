# Super Date

Super Date adds new methods to the default Date class, making it even better than it is.

## How To Use

You just include super-date.js in your project and all your javascript Dates will become Super!

## But What Does "Super" Means?

Check out some awesome methods!

### Making sure every date number has two digits

Javascript is weird when working with dates. There's no way to make sure your day or month number will have two digits. Then I came up with the following methods.

**.getFullDate()** --> Returns the day of the month with 2 digits _(I know the "Date" in the method name can be confusing, but javascripts uses_ .getDate() _to return the day of the month)_

**.getFullMonth()** --> Returns the month number with two digits. Also January is 01 and not 00.

**.getFullYear()** --> Returns the year with 4 digits.

Also:

**.getFullHours()**

**.getFullMinutes()**

**.getFullSeconds()**

### Turn your Date object in a string in the format you want!

How do you write January 18th 2011? Some countries do it as 01/18/2011, others as 18/01/2011. SQL expects 2011-18-01. It's a mess!

Super Date has a method to allow you to decide how you want to convert your Date to string.

**.format(dateFormat)**

The parameter **dateFormat** is a string containing containing **any** text you want and some special characters.

Anything that is not a special character will stay as is.

Example:

    date = new Date('2011-05-21');
    date.format('The current year is: %Y');

It returns:

    "The current year is: 2011"

Possible special characters:

Symbols related to date begins with %, symbols related to the time begins with $

+ %D - full day (always 2 digits)

+ %d - day

+ %M - full month (always 2 digits)

+ %m - month

+ %Y - full year (4 digits)

+ %y - year (2 digits)

+ $H - Hours in 24-hours format

+ $h - Hours in 12-hours format

+ $P - shows either AM or PM (uppercase)

+ $p - shows either am or pm (lowercase)

+ $M - minutes

+ $m - alias for $M

+ $S - seconds

+ $s - alias for $S

### Pre-defined formats

Inside Super Date I used .format() to create some pre-defined formats. Let's see them.

    date.timeString(showSeconds)

Returns only the time of the your Date object as a string like "11:48". If show seconds is true, it shows the seconds as well.

    date.toInternationalDate()

This is the date format used in some systems. This format returns a string like year-month-day. _Example: 2011-05-27_.

    date.toInternationalDateTime()

Like the above, but it includes hours, minutes and seconds. This is perfect to use with a database.

Example:

    "2011-05-27 11:45:03"

### Compare only parts of Dates

Sometimes you only want to check if part of the dates are equal. Let's say you want to check if both dates are in January. You don't care about day, year or the time, you just care about the month. Then Super Date is here for you.

All these methods get a date as a parameter. It's the date you want to compare to.
They return true/false.

**.sameDateAs(anotherDate)** --> Compares the dates as if both are being converted using .toInternationalDate(). It converts both Dates do strings like "2011-05-27" and compares them.

**.sameDateTimeAs(anotherDate)** --> Compares the dates as if both are being converted using .toInternationalDateTime(). It converts both Dates do strings like "2011-05-27 08:44:51" and compares them.

**.sameDayAs(anotherDate)** --> Compares the day number (01 to 31)

**.sameMonthAs(anotherDate)** --> Compares the month number (01 to 12)

**.sameYearAs(anotherDate)** --> Compares the year number

**.sameHoursAs(anotherDate)** --> Compares the hour number (00 to 23)

**.sameMinutesAs(anotherDate)** --> Compares the year number

**.sameSecondsAs(anotherDate)** --> Compares the year number

### Compare using any format you want

These methods above are not enough for you? Then make up any format you want!

We have a method where you can use any format as if you were using the .format() method.

**.compare(dateFormat, anotherDate)**

Example:

    date.compare('%D $H', date2);

The above code will compare the day (%D) and the hour ($H) of both dates. I have no idea why you will want to do this, but Super Date empowers you to do so.

## Contribute!

Super Date is open to outside contribution. Help me make Super Date become even more super.

Fork Super Date, add new shiny stuff and I will merge it into the project.