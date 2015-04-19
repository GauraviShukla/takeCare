sap.ui.jsview("takecare.initialView", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf takecare.initialView
	*/ 
	getControllerName : function() {
		return "takecare.initialView";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf takecare.initialView
	*/ 
	createContent : function(oController) {
		var masterPage = new sap.m.Page();
		
		var image = new sap.m.Image({
			width: "80px",
			src: "{image}"
		});
		var nameFiled = new sap.m.Text({
			text: "{name}"
		}).addStyleClass("nameFiled");
		var addresField = new sap.m.Text({ 
			text: "{address}"
		});
		var contactField = new sap.m.Text({ 
			text: "{contact}"
		});
		var ambulanceField = new sap.m.Text({ 
			text: "{ambulance}"
		});
		var ratingField = new sap.m.RatingIndicator({
			iconSize: "10px",
			value: "{rating}"
		});
		
		var titleNameBox = new sap.m.HBox({
			items: [image, nameFiled]
		}).addStyleClass("titleNameBox");
		
		var tileVBox = new sap.m.VBox({
			items: [titleNameBox, addresField, contactField, ambulanceField, ratingField]
		}).addStyleClass("tileVBox");
		
		var tileTemplate = new sap.m.CustomTile({
			content: tileVBox
		}).addStyleClass("tile");
		
		var tileContainer = new sap.m.TileContainer("tileContainer",{
			height: "600px",
			width: "1000px"
		});
		tileContainer.bindAggregation("tiles","/Hospitals", tileTemplate);
 		
		var page = new sap.m.Page("detailPage",{
			title: "Title",
			content: [tileContainer]
		});
 		return page;
	}

});