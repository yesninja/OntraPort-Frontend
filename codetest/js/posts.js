

var Posts = Class.extend({

	
	init: function(){
		
		this.users = new Users();  
		
		this.postIndex = 1; // non zero index id
		this.commentIndex = 1; //non zero index id
		this.posts = this.get();
		
		
		

		
		
    },

    get: function() {
		var posts = [];
		var addedIds = [];
		var parent = this;
		$.getJSON( "data/posts.json", function( data ) {
			for (var i=0;i<data.length;i++) {
		  
				posts.push( data[i] );
				addedIds.push(data[i].id);
				parent.postIndex++;
				
				var user = parent.users.get(data[i].userId);
				
				$("#page-container").append( parent.makeBox(data[i] , user) );
				
		    }
	 
	 		//do local storage posts for new posts
			if ( window.Box.isset('posts') ) {
				var localPosts = window.Box.fetch('posts');
				for (var j=0;j<localPosts.length;j++) {

					parent.postIndex++;
					posts.push( localPosts[j] );
					var localUser = parent.users.get(localPosts[j].userId);
					
					$("#page-container").append( parent.makeBox(localPosts[j] , localUser) );
					
				}
			}
	 
		});

		return posts;
	},
  
	create: function( text , user) {
		var post = {id : ++this.postIndex , userId : user.id , content : text , date : "" , comments : [] };
		var localPosts = [];
		if ( window.Box.isset('posts') ){ 
			//has already an array just add to it
			
			localPosts = window.Box.fetch('posts');
			localPosts.push(post);
		} else {
			 localPosts.push(post);
		}
		
		//push post to localstorage...
		window.Box.store('posts' , localPosts);

		//if online send ajax to server....
		//dont get ahead of yourself ;)

		//append post to 
		$('#page-container').append(this.makeBox(post , user));	
		
    },
	createComment: function( text , daPostId ) {
		var comment = {id : ++this.commentIndex , userId : this.users.activeUser.id , content : text , date : "" , postId : daPostId };

		//push comment to localstorage...
		var localPosts = [];
		
		var inLocal = this.searchLocalStorage(daPostId);
		if ( window.Box.isset('posts') &&  inLocal ){ 
			//has already an array just add to it
			localPosts = window.Box.fetch('posts');
			
			for (var i = 0; i < localPosts.length;i++) {
				if (localPosts[i].id == daPostId) {
					//we have the post with the comment add a comment to it
					localPosts[i].comments.push(comment);
					break;
				}
			}
			
		}
		
		//push post to localstorage...
		window.Box.store('posts' , localPosts);
		
		//if online send ajax to server....
		//dont get ahead of yourself ;)
		
		//append comment to 
		$('#post-'+daPostId+' .comment-box').append(this.makeCommentsBox(comment));	
		
    },
	search : function(id) {
		//since the posts json array has no index find user using brute force search using id

		for (var i=0;i<this.posts.length;i++) {
			if (this.posts[i].id == id) 
				return this.posts[i];
			
			
		}
		return false;
	},
	
	searchLocalStorage : function(id) {
		var posts = [];
		if (window.Box.isset('posts') ) {
			posts = window.Box.fetch('posts');
			for(var i=0;i<posts.length; i++) {
				if (posts[i].id == id)
					return true;
			}
		}
			return false;
	}, 
	
	makeCommentsBox: function(comment) {
		var response = "";

			var user = this.users.get(comment.userId);
			response += "<div id='comment-"+comment.id+"' class='comment' > "+
							"<div class='user-pic' > <img src='"+user.pic+"' alt='"+user.about+"' class='img-thumb' />  </div>  "+
							"<div class='comment-content'>  <p class='username'> "+user.username+" </p>  <p> "+comment.content+" </p>  </div>" +
						"</div>";
		
		return response;
	},
	
  
	makeBox: function(post , user) {
		var response = "";
		
		response += "<div id='post-"+post.id+"' class='post' >  "+
						"<div class='user-pic' > <img src='"+user.pic+"' alt='"+user.about+"' class='img-medium' />  </div>  "+
						"<div class='post-content'>  <p class='username'> "+user.username+" </p>  <p> "+post.content+" </p>  </div>";
						
		response += 	"<div class='comment-box'>";
		if (post.comments ) {
			for (var i=0;i<post.comments.length;i++) {
				response += this.makeCommentsBox(post.comments[i]);
				//silly way to make new comment id.. should be a server side thing just in case we are out of sync with server...
				if (this.commentIndex > post.comments[i].id ) 
					this.commentIndex = post.comments[i].id;
				
			}
		}

		response +=		"</div> ";		
		response += 	"<div class='add-comment'> <form id='add-comment-form-"+post.id+"' > "+
								" <input type='hidden' name='postId' value='"+post.id+"' /> "+
								"<textarea id='comment-textarea-"+post.id+"' class='comment-textarea' name='comment-textarea' placeholder='post a comment' ></textarea>"+
						"</form> </div>";
							
		
		response +=	"</div> ";

		
		return response;
	
	},
  
  
  
  
});



