var acceptForm=!1,formresponse,validation=[],togfadeN=!0,togfadeM=!0,Msgtxt=[],Msgname=[["n"],["m"]];console.log(Msgname[1]);
function validateName(){var b=document.forms.prereg.name.value,a=!1,c=validation[0];null==b||""==b||3>b.length||!1==hasWhiteSpace(b)?(validation[0]=!1,Msgtxt[0]="Ugyldig navn!"):(validation[0]=!0,Msgtxt[0]="");c!=validation[0]&&(a=!0);!1===togfadeN&&!0===a&&init(Msgname[0],TimeToFade,0);!1===togfadeN&&!0===a?setTimeout(function(){fadeMsg("n",0)},TimeDelay):!0===togfadeN&&fadeMsg("n",0);togfadeN=!1;!0===a&&validateCheckpoint()}
function validateEmail(){var b=document.forms.prereg.email.value,a=b.indexOf("@"),c=b.lastIndexOf("."),d=!1,e=validation[1];1>a||c<a+2||c+2>=b.length?(validation[1]=!1,Msgtxt[1]="Ugyldig e-mail!"):(validation[1]=!0,Msgtxt[1]="");e!=validation[1]&&(d=!0);!1===togfadeM&&!0===d&&init(Msgname[1],TimeToFade,0);!1===togfadeM&&!0===d?setTimeout(function(){fadeMsg("m",1)},TimeDelay):!0===togfadeM&&fadeMsg("m",1);togfadeM=!1;validateCheckpoint()}
function fadeMsg(b,a){var c=document.getElementById(b);c.className=!1===validation[a]?"msg error":"msg success";c.innerHTML=Msgtxt[a];init(Msgname[a],150,1)}function validateCheckpoint(){!0===validation[0]&&!0===validation[1]?(acceptForm=!0,console.log("All fields are valid!"),sndbtn.className="sndactive"):(acceptForm=!1,sndbtn.className="sndgrey")}
function sendForm(){validateName();validateEmail();validateCheckpoint();!0===acceptForm?(console.log("Sent!"),loadData("/secure/prereg.php","POST","Name="+document.forms.prereg.name.value+"&Email="+document.forms.prereg.email.value,function(){4==xmlhttp.readyState&&200==xmlhttp.status&&(response=xmlhttp.responseText,"OK"==response&&loadPage("http://bitkraken.net/txt/success.txt",""))})):console.log("Can't send, some fields are invalid!");return!1};