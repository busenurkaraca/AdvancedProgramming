
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCG27hKirhEFYvCR9IiCeQ9kpj5V-ChE3w",
    authDomain: "newproject-6d384.firebaseapp.com",
    databaseURL: "https://newproject-6d384.firebaseio.com",
    projectId: "newproject-6d384",
    storageBucket: "newproject-6d384.appspot.com",
    messagingSenderId: "311558592942"
  };
  firebase.initializeApp(config);
  
 // var database = firebase.database();
const dbRef = firebase.database().ref();
const usersRef = dbRef.child('users');

const userListUI = document.getElementById("userList");

function userClicked(e) {
  var userID = e.target.getAttribute("user-key");
  const userRef = dbRef.child('users/' + userID);
  const userDetailUI = document.getElementById("userDetail");
  userRef.on("child_added", snap => {
	userDetailUI.innerHTML = "";
	snap.forEach(childSnap => {
		var $p = document.createElement("p");
		$p.innerHTML = childSnap.key + " - " + childSnap.val();
		userDetailUI.append($p);
  } );
	});
}
const addUserBtnUI = document.getElementById("kayit_buton");
if(addUserBtnUI)
	addUserBtnUI.addEventListener("click", add,false);

function add(){
	const usersRef = dbRef.child('users');
	const addUserInputsUI = document.getElementsByClassName("user-input");
	 let newUser = {};
	 // loop through View to get the data for the model 
	for (let i = 0; i < addUserInputsUI.length;  i++) {
	let key = addUserInputsUI[i].getAttribute('data-key');
	let value = addUserInputsUI[i].value;
		newUser[key] = value;
	}
	 usersRef.push(newUser);

}

function add_gonullu(){
	const usersRef = dbRef.child('gonullu');
	const addUserInputsUI = document.getElementsByClassName("gonullu-input");
	 let newGonullu = {};
	 // loop through View to get the data for the model 
	for (let i = 0; i < addUserInputsUI.length;  i++) {
	let key = addUserInputsUI[i].getAttribute('data-key');
	let value = addUserInputsUI[i].value;
		newGonullu[key] = value;
	}
	 usersRef.push(newGonullu);

}

