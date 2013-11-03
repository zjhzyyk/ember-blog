EmTmp.Blog = Em.Object.extend({
	year: function() {
		return this.get("createTime").getFullYear();
	}.property("createTime"),
	month: function(){
		var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
		return monthNames[this.get("createTime").getMonth()];
	}.property("createTime"),
	day: function(){
		return this.get("createTime").getDate();
	}.property("createTime"),
	daySuffix: function(){
		var day = this.get("day");
		if (day>=11 && day <=13) return "th";
		if (day%10==1) return "st";
		if (day%10==2) return "nd";
		if (day%10==3) return "rd";
		return "th";
	}.property("day"),
	date: function(){
		return this.get("month")+" "+this.get("day")+this.get("daySuffix")+", "+this.get("year");
	}.property("month", "day", "daySuffix", "year")
});
