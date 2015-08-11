var Appointment = mongoose.model('Appointment');
module.exports = (function(){
	return {
		index: function(req, res){
			console.log("Server/Ctrl/Appointments - Index");
			Appointment.find({'date':{$gte: new Date()}}, function (err, appointments){
				if(err){
					res.json([{name: "Updating, come back later"}]);
				} else {
					res.json(appointments);
				}
			})
		},
		validate: function(req, res){
			if(req.body.description.length>=10){
				var compareDate = new Date(req.body.date);
				var today = new Date();
				if(compareDate<today){
					res.json({status: false, error: 'Please choose a future date'});
				} else {
					Appointment.find({date:req.body.date}, function(err, appointments){	
						if(appointments.length>=3){
							res.json({status: false, error: "Doctor's Schedule is full for that day, please choose a new date"});
						} else {
							for(index in appointments){
								if(appointments[index].time == req.body.time || appointments[index].name == req.session.name){
									res.json({status: false, error: "This appointment is not available.  Please choose a new time or day"});
									return true;
									break;
								}
							}
							res.json({status:true});
						}
					})
				}
			} else {
				res.json({status: false, error: 'Complaint must be at least 10 characters long'});
			}
		},
		create: function(req, res){
			console.log("Server/Ctrl/Appointments - Create");
			var appointment = new Appointment;
			appointment.name = req.session.name;
			appointment.date = req.body.date;
			appointment.time = req.body.time;
			appointment.description = req.body.description;
			appointment.save(function(err){
				if(err){
					console.log(err);
					res.json({status:false});
				} else {
					res.json({status:true});
				}
			})
		},
		destroy: function(req, res){
			console.log("Server/Ctrl/Appointments - Delete");
			Appointment.findOne({_id:req.params.id}, function(err, appointment){	
				var today = new Date();
				var oneDay = 24 * 60 * 60 * 1000;
				var appointmentDate = new Date(appointment.date);
				if(appointmentDate - today < oneDay){
					res.json({status:false, error: 'Appointments can only be cancelled with 24 hour notice from appointment date'});
				} else {
					Appointment.remove({_id:req.params.id}, function(err){
						if(err){
							res.json({status:false});
						} else {
							res.json({status:true});
						}
					})
				}

			})
		}
	}
})();