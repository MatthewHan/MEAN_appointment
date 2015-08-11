module.exports = function(app) {
  	var appointments = require('../controllers/appointments.js');
  	var users = require('../controllers/users.js');


// Appointments
    // Index
	app.get('/appointments', function (req, res) { appointments.index(req, res) })
	// Create
	.post('/appointments', function (req, res) { appointments.create(req, res) })	
	//Validate
	.post('/appointmentsValidate', function (req, res) { appointments.validate(req, res) })	
	// Delete
	.delete('/appointments/:id', function (req, res) { appointments.destroy(req, res) })

// Users
	// Create
	.post('/users', function (req, res){ users.create(req, res) })	
	// Get Individual
	.get('/user', function (req, res){users.find(req, res) })

}