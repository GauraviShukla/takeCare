sap.ui.controller("takecare.selectLocation", {


	onInit: function() {
		oController = this.getView().getController();
		oController.bindDataToCitiesList();
		oController.setInitialLocationsData();
	},
	
	bindDataToCitiesList : function(){
		var citiesList = [];
		var citiesListArray = ["Bangalore","Delhi","Mumbai","Pune","Kolkata","Chennai"];
		var listOfCities;
		for(var i = 0; i < citiesListArray.length; i++){
			var cityObject = {};
			cityObject.cityName = citiesListArray[i];
			citiesList.push(cityObject);
		}
		var oModel_cities = new sap.ui.model.json.JSONModel();
		oModel_cities.setData({listOfCities : citiesList});
		oController.byId("selectOptionForCities").setModel(oModel_cities);
		
	},
	
	getCorrespondingLocationsForSelectedCity : function(){
		var locationsList = [];
		var locationListArray = [];
		var locationListArrayBangalore = ["BEML Layout","Kundalahalli","Marathalli","Bellandur","Banshankari","Majestic"];
		var locationListArrayDelhi = ["Vikaspuri","Janakpuri","Dwarka","Rajouri Garden","Connaught Place"];
		var listOfLocations;
		var selectedCity = oController.byId("selectOptionForCities").getSelectedItem().getText();
		if(selectedCity == "Bangalore"){
			locationListArray = locationListArrayBangalore;
		}
		else if(selectedCity == "Delhi"){
			locationListArray = locationListArrayDelhi;
		}
		for(var i = 0; i < locationListArray.length; i++){
			var locationObject = {};
			locationObject.locationName = locationListArray[i];
			locationsList.push(locationObject);
		}
		oController.byId("selectOptionForLocation").getModel().setData({listOfLocations : locationsList});
	},
	
	setInitialLocationsData : function(){
		var locationsList = [];
		var locationListArray = ["BEML Layout","Kundalahalli","Marathalli","Bellandur","Banshakari","Majestic"];
		var listOfLocations;
		for(var i = 0; i < locationListArray.length; i++){
			var locationObject = {};
			locationObject.locationName = locationListArray[i];
			locationsList.push(locationObject);
		}
		var oModel_locations = new sap.ui.model.json.JSONModel();
		oModel_locations.setData({listOfLocations : locationsList});
		oController.byId("selectOptionForLocation").setModel(oModel_locations);
	},
	
	onPressOpenCategoriesView : function(oEvent){
		var categoriesView = sap.ui.view({
			viewName : "takecare.selectFromCategories",
			type : sap.ui.core.mvc.ViewType.XML,
			width : "100%"
		});
		
		oController.byId("takeCarePage").removeAllContent();
		oController.byId("takeCarePage").addContent(categoriesView);
	},
	
	onPressOpenBMIDialog : function(oEvent){
		if(oController.calculateBMIDialog == undefined){
			oController.calculateBMIDialog = sap.ui.xmlfragment("calculateBMIDialog","fragments.calculateBMIDialog",oController);
			oController.getView().addDependent(oController.calculateBMIDialog);
		}
		
		oController.calculateBMIDialog.open();
	},
	
	onPressHandleClose : function(oEvent){
		oEvent.getSource().getParent().close();
	},
	
	onPressCalculateBMI : function(oEvent){
		var personsWeight = sap.ui.getCore().byId(sap.ui.core.Fragment.createId("calculateBMIDialog","weight")).getValue();
		var personsHeight = sap.ui.getCore().byId(sap.ui.core.Fragment.createId("calculateBMIDialog","height")).getValue();
		oController.calculatedBMI = personsWeight / (personsHeight * personsHeight);
		oController.openDisplayBMIDialog();
	},
	
	openDisplayBMIDialog : function(oEvent){
		var weightType;
		if(oController.displayBMIDialog == undefined){
			oController.displayBMIDialog = sap.ui.xmlfragment("displayBMIDialog","fragments.displayBMIDialog",oController);
			oController.getView().addDependent(oController.displayBMIDialog);
		}
		
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("displayBMIDialog","bmiValue")).setText("Your BMI is : "+oController.calculatedBMI);
		
		if(oController.calculatedBMI < 18.5){
			weightType = "You are Underweight";
		}
		else if(oController.calculatedBMI > 18.5 && oController.calculatedBMI < 24.9){
			weightType = "You are normal weight";
		}
		else if(oController.calculatedBMI > 25.0 && oController.calculatedBMI < 29.9){
			weightType = "You are Overweight";
		}
		else if(oController.calculatedBMI > 30.0){
			weightType = "You are Obese";
		}
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("displayBMIDialog","weightType")).setText(weightType);
		oController.displayBMIDialog.open();
	},

	onPressOpenLoginDialog : function(oEvent){
		if(oController.loginDialog == undefined){
			oController.loginDialog = sap.ui.xmlfragment("loginDialog","fragments.loginDialog",oController);
			oController.getView().addDependent(oController.loginDialog);
		}
		oController.loginDialog.open();
	},
	
	onPressOpenSignupDialog : function(oEvent){
		if(oController.signupDialog == undefined){
			oController.signupDialog = sap.ui.xmlfragment("signupDialog","fragments.signupDialog",oController);
			oController.getView().addDependent(oController.signupDialog);
		}
		oController.signupDialog.open();
	},
	onExit: function() {
		if(oController.displayBMIDialog != undefined){
			oController.displayBMIDialog.destroy();
		}
		if(oController.openDisplayBMIDialog != undefined){
			oController.openDisplayBMIDialog.destroy();
		}
	}

});