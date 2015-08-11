app.controller('AppointmentsController', [ 'AppointmentsFactory', '$location', function(AppointmentsFactory, $location){
	//console.log('CustomersController Loaded');
	that = this;
	this.searchWord = {};
	this.errors = [];
	this.appointments = [];
	this.user;
	var getAppointments = function(){
		AppointmentsFactory.getAppointments(function(appointments){
			that.appointments = appointments;
			//console.log('appointments ', that.appointments);
		})
	}
	var getUser = function(){
		AppointmentsFactory.getUser(function(user){
			that.user = user;
		})
	}
	this.addAppointment = function(newAppointment){
		this.errors=[];
		//console.log("newUser param ", newAppointment);
		if(newAppointment.date && newAppointment.time && newAppointment.description){
			if(newAppointment.description.length<10){
				that.errors.push('Complaint must be at least 10 characters long');
			} else {
				console.log('GETTING IN');
				AppointmentsFactory.addAppointment(newAppointment, function(res){
					if(res.status == false) {
						that.errors.push(res.error);
					} else {
						$location.path('/');
					}
						getAppointments();
				})
				that.newAppointment = {};
			}
			
		} else {
			that.errors.push('Date/Time/Complaint Cannot Be Blank');
			console.log(that.errors);
		}
	}
	this.removeAppointment = function(appointment){
		this.errors=[];
		AppointmentsFactory.removeAppointment(appointment, function(res){
			if(res.status == false){
				that.errors.push(res.error);
			}
			getAppointments();
		});
	}
	getAppointments();
	getUser();
}])
