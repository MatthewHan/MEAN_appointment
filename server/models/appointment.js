var mongoose = require('mongoose');

var AppointmentSchema = new mongoose.Schema({
  date: { type: Date },
  time: { type: String },
  name: { type: String },
  description: { type: String}
});

mongoose.model('Appointment', AppointmentSchema);
