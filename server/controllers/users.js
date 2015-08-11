var User = mongoose.model('User');
module.exports = (function(){
	return {
		create: function(req, res){
			console.log("Server/Ctrl/Users - Create");
			console.log(req.body);
			User.findOne({name: req.body.name}, function(err, user){
				if(!user){
					var user = new User;
					user.name = req.body.name;
					user.save(function(err){
						if(err){
							res.json({status:false});
						} else {
							req.session.name = req.body.name;
							res.json({status:true});

						}
					})
				} else {
					req.session.name = req.body.name;
					res.json(user);
				}
			})
		},
		find: function(req, res){
			User.findOne({name: req.session.name}, function(err, user){
				if(err){
					res.json({status:false});
				} else {
					res.json(user);
				}
			})
		}
	}
})();