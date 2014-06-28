/// <reference path="..//_references.js" />

function LoginViewModel(){
this.UserName = ko.observable("superadmin");
this.Password = ko.observable("123456");
this.authenticate = function(formElement){
if((this.UserName != "") && (this.Password != "")){
var posturl = "http://192.168.5.207/HMSMain/HMS/Ajaxservices/Cordova.svc/iHMS/Login?username=" + this.UserName() + "&password=" + this.Password();
 $.ajax({
    url: posturl,
	dataType: "json",
	contentType: "application/json",
	type: "GET",
	success: function(res){
	 if(res[0].status == true){
	 localStorage.setItem("userid", res[0].userid.toString());
	 localStorage.setItem("docid", res[0].docid.toString());
	 localStorage.setItem("hospid", res[0].hospid.toString());
	 localStorage.setItem("hospname", res[0].hospname.toString());
	 loadCal(res[0].docid,res[0].hospid);
   //  ko.applyBindings(new MasterViewModel(res.userprof.profileimg),document.getElementById('layout'));
	// application.navigateTo(new ListViewModel(msgViewModels));
	 $('#login').addClass('hide'); 
	 }
	 else{
	 navigator.notification.alert('Invalid Username or Password!',alertdismissed,'iHMS','Okay');
	 }
	},
	error: function(e){
    navigator.notification.alert("An error occured while accessing the server",alertdismissed,'iHMS','Okay');
	console.log(JSON.stringify(e));
	}
 });
}
}.bind(this);
};

function alertdismissed(){
}

function loadCal(consid, hospid){
scheduler.config.readonly = true;
//the method allows you to hide the address bar on iPhone/iPod to save the space for application
    dhx.ui.fullScreen();
    //object constructor
    dhx.ui({
        view: "scheduler",
	        id: "scheduler"
    });
    // method load() lets you to populate the scheduler with data
    $$("scheduler").load("http://192.168.5.207/HMSMain/HMS/Ajaxservices/Cordova.svc/iHMS/Getevents?consid=" + consid + "&hospid=" + hospid,"json");
    $$('scheduler').$$('month').show();
    $$('scheduler').$$('buttons').setValue('month');
    $$("scheduler").$$("dayList").define("timeScaleHeight",60);
}
