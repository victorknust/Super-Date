var _checkDate = function(date) {
	if (date.constructor != Date) {
		throw "This is not a date";
	}
	return true;
}

Date.prototype.getFullDate = function() {
	var bighi_date = this.getDate();
	if (bighi_date < 10) { bighi_date = "0" + bighi_date; }
	return "" + bighi_date;
};

Date.prototype.getFullMonth = function() {
	var bighi_month = this.getMonth() +1;
	if (bighi_month < 10) { bighi_month = "0" + bighi_month; }
	return "" + bighi_month;
};

Date.prototype.getFullHours = function() {
	var hours = this.getHours();
	if (hours < 10) { hours = "0" + hours; }
	return hours;
};

Date.prototype.getFullMinutes = function() {
	var minutes = this.getMinutes();
	if (minutes < 10) { minutes = "0" + minutes; }
	return minutes;
};

Date.prototype.getFullSeconds = function() {
	var seconds = this.getSeconds();
	if (seconds < 10) { seconds = "0" + seconds; }
	return seconds;
};

Date.prototype.compare = function(dateFormat, anotherDate) {
	_checkDate(anotherDate);
	return (this.format(dateFormat) == anotherDate.format(dateFormat));
}

Date.prototype.sameDateAs = function(anotherDate) {
	_checkDate(anotherDate);
	return (this.toInternationalDate() == anotherDate.toInternationalDate());
};

Date.prototype.sameDateTimeAs = function(anotherDate) {
	_checkDate(anotherDate);
	return (this.toInternationalDateTime() == anotherDate.toInternationalDateTime());
};

Date.prototype.sameDayAs = function(anotherDate) {
	_checkDate(anotherDate);
	return this.compare("%D", anotherDate);
};

Date.prototype.sameMonthAs = function(anotherDate) {
	_checkDate(anotherDate);
	return this.compare("%M", anotherDate);
}

Date.prototype.sameYearAs = function(anotherDate) {
	_checkDate(anotherDate);
	return this.compare("%Y", anotherDate);
}

/* Special pattern symbols:
	Symbols related to date begins with %, symbols related to the time begins with $
	%D - full day (always 2 digits)
	%d - day
	%M - full month (always 2 digits)
	%m - month
	%Y - full year (4 digits)
	%y - year (2 digits)
	$H - Hours in 24-hours format
	$h - Hours in 12-hours format
	$P - shows either AM or PM (uppercase)
	$p - shows either am or pm (lowercase)
	$M - minutes
	$m - alias for $M
	$S - seconds
	$s - alias for $S
*/
Date.prototype.format = function(pattern) {
	pattern = pattern.replace(/%D/g, this.getFullDate());
	pattern = pattern.replace(/%d/g, this.getDate());
	pattern = pattern.replace(/%M/g, this.getFullMonth());
	pattern = pattern.replace(/%m/g, this.getMonth()+1);
	pattern = pattern.replace(/%Y/g, this.getFullYear());
	pattern = pattern.replace(/%y/g, (""+this.getFullYear()).replace(/^[0-9]{2}/, ''));
	
	if (this.getFullHours() > 12) {
		var ampm = "PM";
		var h = this.getFullHours() - 12;
	} else {
		var ampm = "AM";
		var h = this.getFullHours();
	}
	pattern = pattern.replace(/\$H/g, this.getFullHours());
	pattern = pattern.replace(/\$h/g, h);
	pattern = pattern.replace(/\$P/g, ampm);
	pattern = pattern.replace(/\$p/g, ampm.toLowerCase());
	pattern = pattern.replace(/\$M/gi, this.getFullMinutes());
	pattern = pattern.replace(/\$S/gi, this.getFullSeconds());
	
	return pattern;
};

Date.prototype.timeString = function(seconds) {
	if (seconds) {
		return this.format('$H:$M:$S');
	} else {
		return this.format('$H:$M');
	}
};

Date.prototype.toInternationalDate = function() {
	return this.format('%Y-%M-%D');
};

Date.prototype.toInternationalDateTime = function() {
	return this.format('%Y-%M-%D $H:$M:$S');
};

// Returns a string describing the distance of time between the date from another date object
Date.prototype.distanceOfTimeInWords = function(anotherDate) {
	_checkDate(anotherDate);
	return inWords(this - anotherDate);
};

// Returns a string describing the distance between now and your Date object
Date.prototype.distanceOfTimeInWordsFromNow = function() {
	return inWords(new Date() - this);
};

var inWords = function(distanceMillis) {
	var settings = {
      refreshMillis: 60000,
      allowFuture: false,
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
    };

	var $l = settings.strings;
	var prefix = $l.prefixAgo;
	var suffix = $l.suffixAgo;
	if (settings.allowFuture) {
		if (distanceMillis < 0) {
			prefix = $l.prefixFromNow;
			suffix = $l.suffixFromNow;
		}
	}

	var seconds = Math.abs(distanceMillis) / 1000;
	var minutes = seconds / 60;
	var hours = minutes / 60;
	var days = hours / 24;
	var years = days / 365;

	function substitute(stringOrFunction, number) {
		var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
		var value = ($l.numbers && $l.numbers[number]) || number;
		return string.replace(/%d/i, value);
	}

	var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
	seconds < 90 && substitute($l.minute, 1) ||
	minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
	minutes < 90 && substitute($l.hour, 1) ||
	hours < 24 && substitute($l.hours, Math.round(hours)) ||
	hours < 48 && substitute($l.day, 1) ||
	days < 30 && substitute($l.days, Math.floor(days)) ||
	days < 60 && substitute($l.month, 1) ||
	days < 365 && substitute($l.months, Math.floor(days / 30)) ||
	years < 2 && substitute($l.year, 1) ||
	substitute($l.years, Math.floor(years));

	return $.trim([prefix, words, suffix].join(" "));
}