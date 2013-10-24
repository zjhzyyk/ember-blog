EmTmp.Blog = DS.Model.extend({
	title: DS.attr('string'),
	content: DS.attr('string'),
	createTime: DS.attr('date'),
	editTime: DS.attr('date')
});

EmTmp.Blog.FIXTURES = [
	{
		id: 0,
		title: "first blog",
		content: "main content",
		createTime: new Date(),
		editTime: new Date()
	}
];