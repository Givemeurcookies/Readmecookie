console.log("initialized form ver. 0.0.4!");


function validateName (){
<<<<<<< Updated upstream
	var x=document.forms["prereg"]["name"].value;
	if (x==null || x=="" || x.length < 3 || hasWhiteSpace(x) == false) return false;
	else return true;
}
//Validate email is not needed right now. 
function validateEmail(){
	var x=document.forms["prereg"]["email"].value;
	var atpos=x.indexOf("@");
	var dotpos=x.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){ validation[1] = false; Msgtxt[1] = "Incorrect Email!"} 
	else { validation[1] = true; Msgtxt[1] = "";}
	
	if (checkchange != validation[1]) changed = true;
	if (togfadeM === false && changed === true) { init(Msgname[1], TimeToFade, 0);}
	if (togfadeM === false && changed === true) {setTimeout(function(){fadeMsg("m",1)},TimeDelay);} else if (togfadeM === true) {fadeMsg("m",1)}
	togfadeM = false;
	validateCheckpoint();
=======
	var x = document.forms["prereg"]["name"].value;
	if (x==null || x=="" || x.length < 3) return false;
	else return true;
>>>>>>> Stashed changes
}
function validatePassword(){
	return true;
}
function fadeMsg(id, num) {
	var x = document.getElementById(id);

	if (valid === false) x.className = "msg error"; else x.className = "msg success";
	x.innerHTML = Msgtxt[num];
	fade(Msgname[num], 150, 1);
}
function validateCheckpoint (){
	var x = validateName();
	var y = validatePassword();

	if (x === true && y === true) {  
		console.log("All fields are valid!");
		sndbtn.className = "sndactive";
		return true;
	} else { 
		sndbtn.className = "sndgrey";
	}
	if (x === true) console.log("Name is valid!");
	if (y === true) console.log("Password is valid!");
	return false;
}
function sendForm() {
if (validateCheckpoint() === true) {
	var data="Name="+document.forms["prereg"]["name"].value+"&Email="+document.forms["prereg"]["email"].value;
	loadData("/secure/prereg.php","POST",data,function(){
  		if (xmlhttp.readyState==4 && xmlhttp.status==200){
  			response = xmlhttp.responseText;
  			if (response != "OK") { }
  			else loadPage("/txt/success.txt", "");
    		}
  	});
 } else { console.log("Can't send, some fields are invalid!"); }
return false;
}
//Validate email is not needed right now. 
function validateEmail(){
	var x=document.forms["prereg"]["email"].value;
	var atpos=x.indexOf("@");
	var dotpos=x.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){  return false; Msgtxt[1] = "Incorrect Email!"} 
	else { return true; Msgtxt[1] = "";}

	validateCheckpoint();
}