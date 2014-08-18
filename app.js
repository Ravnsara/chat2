console.log('loading app.js');

//declare variables
var chatRef = new Firebase("https://intense-inferno-4616.firebaseio.com/Chats"),
	chatTop10 = chatRef.limit(10),
 	userRef = new Firebase("https://intense-inferno-4616.firebaseio.com/Users"),
 	currentUser,
 	currentUsers = {},
 	input = $('#input'),
 	output = $('#output'),
 	users = $('#users'),
 	usernameInput = $('#username');
 	
//set up handlers
chatTop10.on("value", function(chatObj){
	chatObj = chatObj.val();
	var outputString = '';
	//chatObj.forEach(function(el){
		//outputString += el.val() + '<br />';
		//})
	for(var key in chatObj){
		outputString += chatObj[key] + '<br />';
	}
	output.empty().append(outputString);	
});

userRef.on("value", function(userObj){
	var userString = '';
	userObj.forEach(function(el){
		currentUsers[el.val()] = el.ref();
		userString += el.val() + '<br />';	
	});
	users.empty().append(userString);
});  

function sendChat(msg){
	chatRef.push(currentUser + ": " + msg);
}


input.keypress(function(ev){
	if(ev.which == 13){
		var msg = input.val();
		if(!msg)
			return;
		input.val('');
		sendChat(msg);	
	}
});

function login(){
	var newUser = usernameInput.val();
	if(!newUser)
		return;
	usernameInput.val('');
	currentUser = newUser;
	userRef.push(newUser);
	$('#loginModal').modal('hide');	
}

function logout(){
	currentUsers[currentUser].remove();
	currentUser = '';
	$('#loginModal').modal();	
}

$('#loginModal').modal();

