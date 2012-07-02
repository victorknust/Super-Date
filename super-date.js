/**************
Super Date created by Leonardo Bighi.

Feel free to copy, edit and redistribute Super Date as you wish, as long as you credit me.

The _timeDifferenceInWords() function is a work of Ryan McGeary, from the timeago jQuery plugin.
***************/

(function() {
	var _checkDate = function(date) {
		if (date.constructor != Date) {
			throw "This is not a date";
		}
		return true;
	}

	Date.prototype.getFullDate = function(padding) {
		padding = padding || "0";
		var bighi_date = this.getDate();
		if (bighi_date < 10) { bighi_date = padding + bighi_date; }
		return "" + bighi_date;
	};

	Date.prototype.getFullMonth = function(padding) {
		padding = padding || "0";
		var bighi_month = this.getMonth() +1;
		if (bighi_month < 10) { bighi_month = padding + bighi_month; }
		return "" + bighi_month;
	};

	Date.prototype.getFullHours = function(padding, clock) {
		padding = padding || "0";
		clock = clock || "24";
		var hours = this.getHours();
		if (clock == "12" && hours > 12) {
			hours -= 12;
		}
		if (hours < 10) { hours = padding + hours; }
		return hours;
	};

	Date.prototype.getTimeSuffix = function(uppercase) {
		uppercase = uppercase || false;
		var suffix = "";
		if ( this.getFullHours() >= 12 ) {
			suffix = "pm"
		} else {
			suffix = "am";
		}

		if (uppercase) { return suffix.toUpperCase(); }
		else { return suffix; }
	};

	Date.prototype.getFullMinutes = function(padding) {
		padding = padding || "0";
		var minutes = this.getMinutes();
		if (minutes < 10) { minutes = padding + minutes; }
		return minutes;
	};

	Date.prototype.getFullSeconds = function(padding) {
		padding = padding || "0";
		var seconds = this.getSeconds();
		if (seconds < 10) { seconds = padding + seconds; }
		return seconds;
	};

	Date.prototype.getDayOfYear = function() {
		var onejan = new Date(this.getFullYear(),0,1);
		return Math.ceil((this - onejan) / 86400000);	
	};

	Date.prototype.getDayName = function() {
		return this.format('#D');
	};

	Date.prototype.getMonthName = function() {
		return this.format('#M');
	};

	Date.prototype.compare = function(anotherDate, dateFormat) {
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
		return this.compare(anotherDate, "%D");
	};

	Date.prototype.sameMonthAs = function(anotherDate) {
		_checkDate(anotherDate);
		return this.compare(anotherDate, "%M");
	}

	Date.prototype.sameYearAs = function(anotherDate) {
		_checkDate(anotherDate);
		return this.compare(anotherDate, "%Y");
	}

	Date.prototype.sameYearAndMonthAs = function(anotherDate) {
		_checkDate(anotherDate);
		return this.compare(anotherDate, "%Y-%M");
	};

	Date.prototype.isToday = function() {
		return this.sameDayAs(new Date());
	};

	Date.prototype.isYesterday = function() {
		var today = new Date();
		if (this.sameYearAndMonthAs(today)) {
			if (this.getDate() == today.getDate() -1) {
				return true;
			}
		}
		return false;
	};

	Date.prototype.isTomorrow = function() {
		var today = new Date();
		if (this.sameYearAndMonthAs(today)) {
			if (this.getDate() == today.getDate() +1) {
				return true;
			}
		}
		return false;
	};

	/* Special pattern symbols
	*/
	Date.prototype.format = function(date_string) {
		date_string = date_string.replace(/%d/g, this.getFullDate());
		date_string = date_string.replace(/%-d/g, this.getDate());
		date_string = date_string.replace(/%e/g, this.getFullDate(" "));
		date_string = date_string.replace(/%j/g, this.getDayOfYear());
		date_string = date_string.replace(/%m/g, this.getFullMonth()); // "07"
		date_string = date_string.replace(/%-m/g, this.getMonth() +1); // "7" 
		date_string = date_string.replace(/%_m/g, this.getFullMonth(" ")); // " 7"
		date_string = date_string.replace(/%Y/g, this.getFullYear()); // "2012"
		date_string = date_string.replace(/%y/g, this.getFullYear() % 100); // "12"
		
		date_string = date_string.replace(/\%H/g, this.getFullHours()); // Hour, 24-hour clock, zero-padded. Examples: "08", "17"
		date_string = date_string.replace(/\%k/g, this.getFullHours(" ")); // Hour, 24-hour clock, blank padded. Example: " 8", "17"
		date_string = date_string.replace(/\%I/g, this.getFullHours("", "12")); // Hour, 12-hour clock, zero-padded. Example: "04" 
		date_string = date_string.replace(/\%l/g, this.getFullHours(" ", "12")); // Hour, 12-hour clock, blank padded. Example: " 4"
		date_string = date_string.replace(/\%P/g, this.getTimeSuffix(true));
		date_string = date_string.replace(/\%p/g, this.getTimeSuffix());
		date_string = date_string.replace(/\%M/g, this.getFullMinutes());
		date_string = date_string.replace(/\%S/g, this.getFullSeconds());

		date_string = date_string.replace(/%(B|H)/g, Date.settings.monthNames[this.getMonth()]); // "January"
		date_string = date_string.replace(new RegExp("%\\^(B|H)", "g"), Date.settings.monthNames[this.getMonth()].toUpperCase()); // "JANUARY"
		date_string = date_string.replace(/%(b|h)/g, Date.settings.shortMonthNames[this.getMonth()]); // "Jan"
		date_string = date_string.replace(/%\^(b|h)/g, Date.settings.shortMonthNames[this.getMonth()].toUpperCase()); // "JAN"
		
		date_string = date_string.replace(/%A/g, Date.settings.dayNames[this.getDay()]);
		date_string = date_string.replace(/%\^A/g, Date.settings.dayNames[this.getDay()].toUpperCase());
		date_string = date_string.replace(/%a/g, Date.settings.shortDayNames[this.getDay()]);
		date_string = date_string.replace(/%\^a/g, Date.settings.shortDayNames[this.getDay()].toUpperCase());
		date_string = date_string.replace(/%w/g, this.getDay()); 
		if (this.getDay() == 0) {
			date_string = date_string.replace(/%u/g, '7'); 
		} else {
			date_string = date_string.replace(/%u/g, this.getDay()); 
		}
		
		return date_string;
	};
	Date.prototype.strftime = Date.prototype.format;

	Date.prototype.time = function(show_seconds) {
		if (show_seconds) {
			return this.format('$H:$M:$S');
		} else {
			return this.format('$H:$M');
		}
	};

	Date.prototype.date = function(longer_version) {
		if (longer_version) {
			return this.format(Date.settings.dateInNumbersFull);
		} else {
			return this.format(Date.settings.dateInNumbersShort);
		}
	};

	Date.prototype.internationalDate = function() {
		return this.format('%Y-%M-%D');
	};

	Date.prototype.internationalDateTime = function() {
		return this.format('%Y-%M-%D $H:$M:$S');
	};

	// Returns a string describing the distance of time between the date from another date object
	Date.prototype.distanceOfTimeInWords = function(anotherDate) {
		_checkDate(anotherDate);
		return _timeDifferenceInWords(this - anotherDate);
	};

	// Returns a string describing the distance between now and your Date object
	Date.prototype.distanceOfTimeInWordsFromNow = function() {
		return _timeDifferenceInWords(new Date() - this);
	};

	Date.prototype.inWords = function() {
		return this.format(Date.settings.dateInWords);
	};

	var _timeDifferenceInWords = function(distanceMillis) {
		var $l = Date.settings.timeDifference.strings;
		var prefix = $l.prefixAgo;
		var suffix = $l.suffixAgo;
		if (Date.settings.timeDifference.allowFuture) {
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

	// SYNTATHIC SUGAR //
	Date.prototype.isSunday = function() { return this.getDay() == 0; };
	Date.prototype.isMonday = function() { return this.getDay() == 1; };
	Date.prototype.isTuesday = function() { return this.getDay() == 2; };
	Date.prototype.isWednesday = function() { return this.getDay() == 3; };
	Date.prototype.isThursday = function() { return this.getDay() == 4; };
	Date.prototype.isFriday = function() { return this.getDay() == 5; };
	Date.prototype.isSaturday = function() { return this.getDay() == 6; };
	
	Date.prototype.daysToWeekStart = function() { return 7 - this.getDay(); };

	Date.prototype.isFuture = function() { return this > new Date(); };
	Date.prototype.isPast = function() { return this < new Date(); };


	/*** BASE SETTINGS ***/
	if (Date.settings == undefined) {
		Date.settings = {
			dayNames: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			],
			shortDayNames: [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
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
			shortMonthNames: [], 
			dateInWords: "#M %d, %Y",
			dateInNumbersShort: "%m/%d/%Y",
			dateInNumbersFull: "%M/%D/%Y",
			timeDifference: {
				allowFuture: true,
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
			},
			extend: function(options) {
				for (setting in this) {
					if (options[setting] != this[setting] && options[setting] != undefined) {
						this[setting] = options[setting];
					}
				}
			}
		};
	}
})();
