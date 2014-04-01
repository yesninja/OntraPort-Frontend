var Users = Class.extend({
	
	
	init: function() {
		this.users = this.getAll();
		
		
	},
	
	getAll: function() {
		
		var parent = this;
		//check if we have already grabbed user data if so just use cached array
		if (!this.users) {
			var users = [];
			//console.log(this.request);
			//if ( this.request )
				//this.request.abort();
				
			$.getJSON( "data/users.json", function( data ) {
			$.each( data, function( key, json ) {
				users.push( json );
				
			  }); 
			  parent.setUser(5); //assume userId = 5
			  
			});
			
			return users;
		}
		
		return this.users;
	},
	
	get: function(id) {
		//since the users json array has no index find user using brute force search using id

		for (var i=0;i<this.users.length;i++) {
			if (this.users[i].id === id) 
				return this.users[i];
			
		}

	},
	
	setUser: function(id) {
		//set userData
		
		
		this.activeUser = this.get(id);

		//set active user picture & name
		$('.profile-pic').attr('src' , this.activeUser.pic);
		$('.user-name').html( this.activeUser.username);
		return this.activeUser;	
			
		
		

	},

});
