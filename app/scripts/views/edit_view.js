EmBlog.EditView = Em.View.extend({
	didInsertElement: function(){
		var self = this;
		tinymce.init({
			selector: "div.entry-content",
			inline: true,
			plugins: [
				"advlist autolink lists link image charmap print preview anchor",
				"searchreplace visualblocks code fullscreen",
				"insertdatetime media table contextmenu paste"
			],
			toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
			// Update model when calling setContent (such as from the source editor popup)
			setup: function (ed) {
				ed.on('init', function() {
					ed.setContent(self.get("controller.model.content"));
				});
				// Update model on button click
				ed.on('ExecCommand', function (e) {
					// ed.save();
					self.set("controller.model.content", ed.getContent());
				});
				// Update model on keypress
				ed.on('KeyUp', function (e) {
					// ed.save();
					self.set("controller.model.content", ed.getContent());
				});
				// Update model on change, i.e. copy/pasted text, plugins altering content
				ed.on('SetContent', function (e) {
					if(!e.initial){
						// ed.save();
						self.set("controller.model.content", ed.getContent());
					}
				});
			}
		});
		tinymce.init({
			selector: "h1.entry-title",
			inline: true,
			toolbar: "undo redo",
			menubar: false,
			// Update model when calling setContent (such as from the source editor popup)
			setup: function (ed) {
				ed.on('init', function() {
					ed.setContent(self.get("controller.model.title"));
				});
				// Update model on button click
				ed.on('ExecCommand', function (e) {
					// ed.save();
					self.set("controller.model.title", ed.getContent());
				});
				// Update model on keypress
				ed.on('KeyUp', function (e) {
					// ed.save();
					self.set("controller.model.title", ed.getContent());
				});
				// Update model on change, i.e. copy/pasted text, plugins altering content
				ed.on('SetContent', function (e) {
					if(!e.initial){
						// ed.save();
						self.set("controller.model.title", ed.getContent());
					}
				});
			}
		});
	}
});