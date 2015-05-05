sap.ui.controller("takecare.DetailsPage", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf takecare.DetailsPage
*/
	onInit: function() {
		var dataObject = { data : [{doctorName:"Prayas Das", designation: "MBBS", ratings: 5,phNo:"9038206509",fees:"500",speciality:"Gynaecologist",address:"XYZ",expectedTimings:"6 to 8 PM",userRatings:5,userComment:"Good",img:"images/doc1.jpg"}]
		};
		      var model = new sap.ui.model.json.JSONModel(dataObject);
		  this.getView().setModel(model);
			
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf takecare.DetailsPage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf takecare.DetailsPage
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf takecare.DetailsPage
*/
//	onExit: function() {
//
//	}
	
	back:function(){
		app.back();
	}

});