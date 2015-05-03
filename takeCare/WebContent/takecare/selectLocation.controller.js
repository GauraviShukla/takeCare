sap.ui.controller("takecare.selectLocation", {


	onInit: function() {
		
		this.bindDataToCitiesList();
		this.setInitialLocationsData();
		this.setHomeRemediesModel();
		this.setSecurityQuestionData();
		this.setSpecialisationData();
		this.onPressShowListOfDoctors();
	},
	onPressShowListOfDoctors: function(){
		results = sap.ui.getCore().byId("medicalStores--container");
		this.byId("takeCarePage").removeContent(results);
		
		var resultsView = sap.ui.getCore().byId("doctorsResults");
		if(!resultsView){
			resultsView = sap.ui.view({
			id: "doctorsResults",
			viewName : "takecare.searchResults",
			type : sap.ui.core.mvc.ViewType.XML,
			width : "100%"
		});
		}
		this.byId("takeCarePage").addContent(resultsView);
	},
	onPressShowListOfMedicalStores: function(){
		docResults = sap.ui.getCore().byId("doctorsResults");
		this.byId("takeCarePage").removeContent(docResults);
		
		medicalStoresView = sap.ui.getCore().byId("medicalStores--container");
		if(!medicalStoresView)
			this.medicalStoresView = sap.ui.xmlfragment("medicalStores","fragments.medicalStores",this);
		var model = new sap.ui.model.json.JSONModel();

//		var xhr = new XMLHttpRequest();
//		 xhr.open("GET","https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=12.956829,77.595291&rankby=distance&types=pharmacy&key=AIzaSyDjCts18DCLVN6G2ITqzEi-725PCP0dh0k"); 
//	     xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
//	     xhr.setRequestHeader("Access-Control-Allow-Headers", "origin, x-requested-with, x-http-method-override, content-type");
//	     xhr.setRequestHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//	     xhr.send();
	     
		model.loadData("medicalResults.json");
		this.medicalStoresView.setModel(model);
		this.byId("takeCarePage").addContent(this.medicalStoresView);
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
		this.oModel_cities = new sap.ui.model.json.JSONModel();
		this.oModel_cities.setData({listOfCities : citiesList});
		this.byId("selectOptionForCities").setModel(this.oModel_cities);
		
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
		this.oModel_locations = new sap.ui.model.json.JSONModel();
		this.oModel_locations.setData({listOfLocations : locationsList});
		this.byId("selectOptionForLocation").setModel(this.oModel_locations);
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
		var oController = this;
		
		var actionItems = [
				 {text : "User"},
				 {text : "Doctor"},
				 {text : "Hospital"}
				
		];
		
		if(this.registrationActionSelect == undefined){
			this.registrationActionSelect = sap.ui.xmlfragment("registrationActionSelect","fragments.registrationActionSelect",this);
			this.getView().addDependent(this.registrationActionSelect);

			var oRegModel = new sap.ui.model.json.JSONModel();
			oRegModel.setData({actionItems : actionItems});
			
			this.registrationActionSelect.setModel(oRegModel);
		}
		this.registrationActionSelect.openBy(oEvent.getSource());
	},
	
	handleRegistration : function(oEvent){
		switch(oEvent.getSource().getBindingContext().getObject().text){
			case "User" : this.onPressRegisterUser(oEvent);break;
			case "Doctor" : this.onPressRegisterDoctor(oEvent);break;
			case "Hospital" : this.onPressRegisterHospital(oEvent);break;
		}
	},
	
	onPressRegisterUser : function(oEvent){
		if(this.signupDialog == undefined){
			this.signupDialog = sap.ui.xmlfragment("signupDialog","fragments.signupDialog",this);
			this.getView().addDependent(this.signupDialog);
		}
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("signupDialog","securityQuestion")).setModel(this.oSecurityQuestionModel);
		this.signupDialog.open();
	},
	
	onPressRegisterDoctor : function(oEvent){
		if(this.doctorSignupDialog == undefined){
			this.doctorSignupDialog = sap.ui.xmlfragment("doctorSignupDialog","fragments.doctorSignupDialog",this);
			this.getView().addDependent(this.doctorSignupDialog);
		}
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("doctorSignupDialog","selectOptionForCities")).setModel(this.oModel_cities);
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("doctorSignupDialog","selectOptionForLocation")).setModel(this.oModel_locations);
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("doctorSignupDialog","selectOptionForSpecialisation")).setModel(this.oSpecialisationModel);
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("doctorSignupDialog","securityQuestion")).setModel(this.oSecurityQuestionModel);
		
		this.doctorSignupDialog.open();
	},
	
	onPressRegisterHospital : function(oEvent){
		if(this.hospitalSignupDialog == undefined){
			this.hospitalSignupDialog = sap.ui.xmlfragment("hospitalSignupDialog","fragments.hospitalSignupDialog",this);
			this.getView().addDependent(this.hospitalSignupDialog);
		}
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("hospitalSignupDialog","selectOptionForCities")).setModel(this.oModel_cities);
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("hospitalSignupDialog","selectOptionForLocation")).setModel(this.oModel_locations);
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("hospitalSignupDialog","securityQuestion")).setModel(this.oSecurityQuestionModel);
		this.hospitalSignupDialog.open();
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
	
	onPressOpenDosageReminderDialog : function(oEvent){
		if(this.openDosageReminderDialog == undefined){
			this.openDosageReminderDialog = sap.ui.xmlfragment("openDosageReminderDialog","fragments.openDosageReminderDialog",this);
			this.getView().addDependent(this.openDosageReminderDialog);
		}
		var medicineDosage = {};
		medicineDosage.medicineName = "";
		medicineDosage.medicinePotency = "Tablet";
		var oModel_dosage = new sap.ui.model.json.JSONModel();
		oModel_dosage.setData(medicineDosage);
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("openDosageReminderDialog","dosageReminderDialog")).setModel(oModel_dosage);
		
		this.openDosageReminderDialog.open();
	},
	
	handleValueHelpRequest : function(oEvent){
		var uomListModel;
		var uomList= [];
		var uom_Array = ["Tablet","Tbsp","Tblsp"];
		this._inputFieldForWhichValueHelpRequested = oEvent.getSource();
		if(this.listOfUOM == undefined){
			for(var i = 0; i < uom_Array.length; i++){
				var uomObject = {};
				uomObject.uom = uom_Array[i];
				uomList.push(uomObject);
			}
			this.listOfUOM = {listOfUOM : uomList};
			uomListModel = new sap.ui.model.json.JSONModel(this.listOfUOM);
			if(this.uomDialog == undefined){
				this.uomDialog = sap.ui.xmlfragment("uomDialog","fragments.uomDialog",this);
				this.getView().addDependent(this.uomDialog);
				this.uomDialog.setModel(uomListModel);
				this.uomDialog.attachSearch(this.uomSearch,this);
				this.uomDialog.attachLiveChange(this.uomSearch,this);
			}
		}
		
		reusable.utils.uomSearch(oEvent.getSource(),"",this.uomDialog.getModel(),this.uomDialog.getBinding("items"),["uom"]);
		this.uomDialog.open();
		
	},
	
	handleSelect : function(oEvent){
		var oSource = oEvent.getParameter("selectedItem");
		var sUom = oSource.getBindingContext().getProperty("uom");
		if(this._inputFieldForWhichValueHelpRequested != undefined){
			this._inputFieldForWhichValueHelpRequested.getModel().getData().medicinePotency = sUom;
			this._inputFieldForWhichValueHelpRequested.getModel().checkUpdate();
		}
	},
	
	uomSearch : function(oEvent){
		var properties = [];
		properties.push("uom");
		reusable.utils.uomSearch(oEvent.getSource()._oSearchField,oEvent.getParameter("value"),this.uomDialog.getModel(),this.uomDialog.getBinding("items"),properties);
	},
	
	onPressOpenAddDoctorsDialog : function(oEvent){
		if(this.addDoctorsDialog == undefined){
			this.addDoctorsDialog = sap.ui.xmlfragment("addDoctorsDialog","fragments.addDoctorsDialog",this);
			this.getView().addDependent(this.addDoctorsDialog);
		}
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("addDoctorsDialog","selectOptionForSpecialisation")).setModel(this.oSpecialisationModel);
		this.addDoctorsDialog.open();
	},
	
	setSpecialisationData : function(){
		specialisationList = [
						 {specialisation : "Audiologist"},
						 {specialisation : "Allergist"},
						 {specialisation : "Allergist"},
						 {specialisation : "Dentist"},
						 {specialisation : "Gynecologist"},
						 {specialisation : "Neurologist"},
						 {specialisation : "Pediatrician"},
						 {specialisation : "Physiologist"},
						 {specialisation : "Surgeon"},
						 {specialisation : "Others"}
						
				];
		this.oSpecialisationModel = new sap.ui.model.json.JSONModel();
		this.oSpecialisationModel.setData({specialisationList : specialisationList});
		
	},
	
	setSecurityQuestionData : function(){
		securityQuestionList = [
								 {question : "What was the name of your elementary / primary school?"},
								 {question : "In what city or town does your nearest sibling live?"},
								 {question : "What is the last name of the teacher who gave you your first failing grade?"},
								 {question : "What time of the day were you born? (hh:mm)"}
								
						];
				this.oSecurityQuestionModel = new sap.ui.model.json.JSONModel();
				this.oSecurityQuestionModel.setData({securityQuestionList : securityQuestionList});
				
	},
			
	onPressAddDoctorToList : function(oEvent){
		var doctorName = sap.ui.getCore().byId(sap.ui.core.Fragment.createId("addDoctorsDialog","name")).getValue();
		var doctorEmailId = sap.ui.getCore().byId(sap.ui.core.Fragment.createId("addDoctorsDialog","email")).getValue();
		var doctorConsultationFee = sap.ui.getCore().byId(sap.ui.core.Fragment.createId("addDoctorsDialog","consultationFee")).getValue();
		var doctorSpecialisation = sap.ui.getCore().byId(sap.ui.core.Fragment.createId("addDoctorsDialog","selectOptionForSpecialisation")).getSelectedItem().getText();
		var doctorExperience = sap.ui.getCore().byId(sap.ui.core.Fragment.createId("addDoctorsDialog","experience")).getValue();
		
		
		var doctorDetails = {};
		doctorDetails.doctorName = doctorName;
		doctorDetails.doctorEmailId = doctorEmailId;
		doctorDetails.doctorConsultationFee = doctorConsultationFee;
		doctorDetails.doctorSpecialisation = doctorSpecialisation;
		doctorDetails.doctorExperience = doctorExperience;
		
		var doctorDetailsStandardListItem = new sap.m.StandardListItem({
			title : doctorName,
			description : doctorEmailId,
			info : doctorSpecialisation
		});
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("hospitalSignupDialog","doctorsList")).addItem(doctorDetailsStandardListItem);
		this.addDoctorsDialog.close();
	
	},
	
	onPressAddTimingsField : function(oEvent){
		var fromLabel = new sap.m.Label({
			text : "From"
		});
		var toLabel = new sap.m.Label({
			text : "To"
		});
		var fromTimingInput = new sap.m.DateTimeInput({
			type : "Time"
		});
		var toTimingInput = new sap.m.DateTimeInput({
			type : "Time"
		});
		var timingsTemplateHBox = new sap.m.HBox({
			items : [fromLabel,fromTimingInput,toLabel,toTimingInput]
		});
		var timingsCustomListItem = new sap.m.CustomListItem({
			content : [timingsTemplateHBox]
		});
		sap.ui.getCore().byId(sap.ui.core.Fragment.createId("doctorSignupDialog","timingsList")).addItem(timingsCustomListItem);
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
