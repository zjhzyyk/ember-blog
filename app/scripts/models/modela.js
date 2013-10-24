EmTmp.Modela = DS.Model.extend({
	str: DS.attr('string'),
	num: DS.attr('number')
});

EmTmp.Modela.FIXTURES = [
	{
		id: 0,
		str: "a",
		num: 1
	},
	{
		id: 1,
		str:"b",
		num: 2
	}
];