MWF.xApplication.cms.FormDesigner.Module = MWF.xApplication.cms.FormDesigner.Module || {};
MWF.xDesktop.requireApp("process.FormDesigner", "Module.Htmleditor", null, false);
MWF.xApplication.cms.FormDesigner.Module.Htmleditor = MWF.CMSFCHtmleditor = new Class({
	Extends: MWF.FCHtmleditor,
	Implements : [MWF.CMSFCMI],
	_initModule: function(){
		this.node.empty();

		var config = Object.clone(this.json.editorProperties);
		if (this.json.config){
			if (this.json.config.code){
				MWF.require("MWF.xScript.CMSMacro", null, false);
				var obj = MWF.CMSMacro.exec(this.json.config.code, this);
				Object.each(obj, function(v, k){
					config[k] = v;
				});
			}
		}

		this.loadCkeditor(config);
		this._setNodeProperty();
		if (!this.form.isSubform) this._createIconAction() ;
		this._setNodeEvent();
	},
	loadCkeditor: function(config){
		COMMON.AjaxModule.load("ckeditor", function(){
			CKEDITOR.disableAutoInline = true;
			var editorDiv = new Element("div").inject(this.node);
			if (this.json.templateCode) editorDiv.set("html", this.json.templateCode);

			var height = this.node.getSize().y;
			var editorConfig = config || {};
			if (this.form.options.mode=="Mobile"){
				//    if (!editorConfig.toolbar && !editorConfig.toolbarGroups){
				editorConfig.toolbar = [
					//{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
					//{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
					//{ name: 'links' },
					//{ name: 'insert' },
					//{ name: 'forms' },
					//{ name: 'tools' },
					//{ name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
					//{ name: 'others' },
					//'/',
					{ name: 'paragraph',   items: [ 'Bold', 'Italic', "-" , 'TextColor', "BGColor", 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', "-", 'Undo', 'Redo' ] },
					{ name: 'basicstyles', items: [ 'Styles', 'FontSize']}
					//{ name: 'colors' },
					//{ name: 'about' }
				];
				//    }
			}


			//  CKEDITOR.basePath = COMMON.contentPath+"/res/framework/htmleditor/ckeditor/";
			if( editorConfig.skin )editorConfig.skin = "moono-lisa";
			this.editor = CKEDITOR.replace(editorDiv, editorConfig);

			this.editor.on("dataReady", function(){
				this.editor.setReadOnly(true);
			}, this);
		}.bind(this));
	}
});
