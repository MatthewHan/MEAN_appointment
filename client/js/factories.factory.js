app.factory('AppointmentsFactory', function($http){
	return {
		getAppointments: function(callback){
			console.log('getting appts');
			$http.get('/appointments').success(function(res){
				callback(res);
			})
		},
		addAppointment: function(newAppointment, callback){
			$http.post('/appointmentsValidate', newAppointment).success(function(res){
				console.log('RESPONSE FROM VALIDATION ',res);
				if(res.status == false){
					console.log('failing', res)
					callback(res);
				} else {
					console.log('making it in');
					$http.post('/appointments', newAppointment).success(function(res){
						callback(res);
					})
				}
			})
		},
		getUser: function(callback){
			$http.get('/user').success(function(res){
				callback(res);
			})
		},
		removeAppointment: function(appointment, callback){
			$http.delete('/appointments/'+appointment._id).success(function(res){
				callback(res)
			})
		}
	}
})

