sap.ui.controller("takecare.selectLocation", {


	onInit: function() {
		this.bindDataToCitiesList();
		this.setInitialLocationsData();
		this.setHomeRemediesModel();
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
		this.byId("selectOptionForCities").setModel(oModel_cities);
		
	},
	
	getCorrespondingLocationsForSelectedCity : function(){
		var locationsList = [];
		var locationListArray = [];
		var locationListArrayBangalore = ["BEML Layout","Kundalahalli","Marathalli","Bellandur","Banshankari","Majestic"];
		var locationListArrayDelhi = ["Vikaspuri","Janakpuri","Dwarka","Rajouri Garden","Connaught Place"];
		var listOfLocations;
		var selectedCity = this.byId("selectOptionForCities").getSelectedItem().getText();
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
		this.byId("selectOptionForLocation").getModel().setData({listOfLocations : locationsList});
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
		this.byId("selectOptionForLocation").setModel(oModel_locations);
	},
	
	onPressOpenCategoriesView : function(oEvent){
		var categoriesView = sap.ui.view({
			viewName : "takecare.selectFromCategories",
			type : sap.ui.core.mvc.ViewType.XML,
			width : "100%"
		});
		
		this.byId("takeCarePage").removeAllContent();
		this.byId("takeCarePage").addContent(categoriesView);
	},
	
	onPressOpenBMIDialog : function(oEvent){
		if(this.calculateBMIDialog == undefined){
			this.calculateBMIDialog = sap.ui.xmlfragment("calculateBMIDialog","fragments.calculateBMIDialog",this);
			this.getView().addDependent(this.calculateBMIDialog);
		}
		
		this.calculateBMIDialog.open();
	},
	
	onPressHandleClose : function(oEvent){
		oEvent.getSource().getParent().close();
	},
	
	onPressCalculateBMI : function(oEvent){
		var personsWeight = sap.ui.getCore().byId(sap.ui.core.Fragment.createId("calculateBMIDialog","weight")).getValue();
		var personsHeight = sap.ui.getCore().byId(sap.ui.core.Fragment.createId("calculateBMIDialog","height")).getValue();
		this.calculatedBMI = personsWeight / (personsHeight * personsHeight);
		this.openDisplayBMIDialog();
	},
	
	openDisplayBMIDialog : function(oEvent){
		var weightType;
		if(this.displayBMIDialog == undefined){
			this.displayBMIDialog = sap.ui.xmlfragment("displayBMIDialog","fragments.displayBMIDialog",this);
			this.getView().addDependent(this.displayBMIDialog);
		}
		
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("displayBMIDialog","bmiValue")).setText("Your BMI is : "+this.calculatedBMI);
		
		if(this.calculatedBMI < 18.5){
			weightType = "You are Underweight";
		}
		else if(this.calculatedBMI > 18.5 && this.calculatedBMI < 24.9){
			weightType = "You are normal weight";
		}
		else if(this.calculatedBMI > 25.0 && this.calculatedBMI < 29.9){
			weightType = "You are Overweight";
		}
		else if(this.calculatedBMI > 30.0){
			weightType = "You are Obese";
		}
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("displayBMIDialog","weightType")).setText(weightType);
		this.displayBMIDialog.open();
	},

	onPressOpenLoginDialog : function(oEvent){
		if(this.loginDialog == undefined){
			this.loginDialog = sap.ui.xmlfragment("loginDialog","fragments.loginDialog",this);
			this.getView().addDependent(this.loginDialog);
		}
		this.loginDialog.open();
	},
	
	onPressOpenSignupDialog : function(oEvent){
		if(this.signupDialog == undefined){
			this.signupDialog = sap.ui.xmlfragment("signupDialog","fragments.signupDialog",this);
			this.getView().addDependent(this.signupDialog);
		}
		this.signupDialog.open();
	},
	
	onPressOpenListOfDiseases : function(oEvent){
		var diseaseList = [];
		var listOfDiseases;
		if(this.diseasesForHomeRemediesDialog == undefined){
			this.diseasesForHomeRemediesDialog = sap.ui.xmlfragment("diseasesForHomeRemediesDialog","fragments.diseasesForHomeRemediesDialog",this);
			this.getView().addDependent(this.diseasesForHomeRemediesDialog);
		}
		
		var array_diseases = ["Common Cold","Cough", "Fever Blisters", "Common Fever", "Sore Throat", "Heartburn", "Other Simple Remedies"];
		for(var i = 0; i< array_diseases.length; i++){
			var diseaseName = {};
			diseaseName.name = array_diseases[i];
			diseaseList.push(diseaseName);
		}
		
		var omodel_diseaseListModel = new sap.ui.model.json.JSONModel();
		omodel_diseaseListModel.setData({listOfCommonDiseases : diseaseList});
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("diseasesForHomeRemediesDialog","listOfDiseases")).setModel(omodel_diseaseListModel);
		this.diseasesForHomeRemediesDialog.open();
	},
	
	onSelectOpenRemediesDialog : function(oEvent){
		
		var array_commonColdRemedies = ["Garlic soup helps reduce the harshness of a cold.",
		                                "A glass of lemon juice a day would raise the body’s resistance.",
		                                "Onion juice can also help avoid a cold.",
		                                "Drink plenty of water, at least 6-8 glasses per day."];
		
		var array_coughRemedies = ["Basil leaves and ginger are very effective in relieving an irritating dry cough. You can either chew basil leaves or take fresh ginger with hot water.",
		                           "Eat grapes. Grapes when eaten regularly can also help get rid of severe coughs.",
		                           "Drinking a few cups of hot water with salt can also help stop coughing.",
		                           "Take a hot shower. Breathing in the steam can provide temporary relief."];
		
		var array_feverBlistersRemedies = ["Apply petroleum jelly to the skin.",
		                                   "Apply cold compress on the affected area.",
		                                   "Apply cold compress on the affected area."];
		
		var array_commonFeverRemedies = ["Drink tea made with from saffron.",
		                                 "Eat oranges. Oranges give instant energy and helps the body fight unwanted infections.",
		                                 "A glass of milk also works wonders."];
		
		var array_soreThroatRemedies = ["A mixture of Listerine mouth wash and Hydrogen Peroxide. Pour a little of each liquid into a cup (equal parts) and gargle.",
		                                "Eat three to four marshmallows to soothe a sore throat. The gelatin in the marshmallows is what soothes the sore throat.",
		                                "Drink hot water, lemon juice, and honey mixed together."];
		
		var array_hearburnRemedies = ["Dissolve a tsp. of baking soda in 8 ounces (1 cup) of water and drink. Baking soda is a natural antacid.",
		                              "Bananas act as a natural antacid in the body. You can eat either fresh or dried bananas.",
		                              "Fresh ginger is one of the oldest remedies for heartburn. It can be added to food when its cooked, eaten raw, or consumed as ginger tea."];
		
		var array_otherRemedies = ["Use duct tape to remove warts.",
		                           "Cure nail fungus with vapor rub.",
		                           "Soothe eczema by using oatmeal.",
		                           "Cure bad breath by eating yogurt.",
		                           "A spoonful of sugar to cure the hiccups.",
		                           "Bite a pencil to cure a headache.",
		                           "Eat olives to help with motion sickness."];
		var array_remedies = [];
		var remedyList = [];
		var listOfRemedies ; 
		
		var diseaseName = oEvent.getParameter("listItem").getBindingContext().getObject().name;
		if(diseaseName === "Common Cold"){
			array_remedies = array_commonColdRemedies;
		}
		else if(diseaseName === "Cough"){
			array_remedies = array_coughRemedies;
		}
		else if(diseaseName === "Fever Blisters"){
			array_remedies = array_feverBlistersRemedies
		}
		else if(diseaseName === "Common Fever"){
			array_remedies = array_commonFeverRemedies;
		}
		else if(diseaseName === "Sore Throat"){
			array_remedies = array_soreThroatRemedies;
		}
		else if(diseaseName === "Heartburn"){
			array_remedies = array_hearburnRemedies;
		}
		else if(diseaseName === "Other Simple Remedies"){
			array_remedies = array_otherRemedies;
		}
		
		for(var i = 0; i < array_remedies.length; i++){
			var remedyObject = {};
			remedyObject.remedy = array_remedies[i];
			remedyList.push(remedyObject);
		}
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("homeRemediesDialog","listOfDiseases")).getModel().setData({listOfRemedies : remedyList});
		this.homeRemediesDialog.open();
	},
	
	setHomeRemediesModel : function(){
		if(this.homeRemediesDialog == undefined){
			this.homeRemediesDialog = sap.ui.xmlfragment("homeRemediesDialog","fragments.homeRemediesDialog",this);
			this.getView().addDependent(this.homeRemediesDialog);
		}
		var oModel_remedies = new sap.ui.model.json.JSONModel();
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("homeRemediesDialog","listOfDiseases")).setModel(oModel_remedies);
		
	},
	onExit: function() {
		if(this.displayBMIDialog != undefined){
			this.displayBMIDialog.destroy();
		}
		if(this.openDisplayBMIDialog != undefined){
			this.openDisplayBMIDialog.destroy();
		}
	}

});