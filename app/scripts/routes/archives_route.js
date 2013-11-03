EmTmp.ArchivesRoute = Em.Route.extend({
	model: function () {
		return EmTmp.Blogs.loadBlogs();
	}
});