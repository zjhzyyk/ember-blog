EmTmp.ApplicationController = Em.ObjectController.extend({
	// blogindex: 1,
	actions: {
		addBlog: function () {
			// var i = this.get('blogindex')
			var todo = this.store.createRecord('blog', {
				id: 2,
		        title: "title",
		        content: "hahaha",
		        createTime: new Date(),
		        editTime: new Date()
		    });
		    // this.set('blogindex', ++i);
		    todo.save();
		// }.property('blogindex')
		}
	}
});