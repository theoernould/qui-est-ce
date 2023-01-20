// Déclaration des variables

var boutondemanderreponse,boutonenvoyerreponse,boutoneliminer,boutonchoisirtypequestion,bouton,boutonmodeeliminer,dureetotale,removedItem,persomystereid,numeropartie,score,nomjoueur,divselect;
var reponsequestion,reponsejoueur,listequestions,listetype,choix,id,question,etateliminer;
var duree = "1s";
var modeeliminer = "désactivé";
var tabclass = document.getElementsByClassName("perso");
let nbessai = 3;

//Mise en place des caractéristiques de chacun des personnages

var listeperso = [{prenom:"Sophie",yeux:"vert",cheveux:"brun",lunettes:"oui",peau:"blanc",sexe:"femme",barbe:"non",moustache:"non"},
				{prenom:"Emma",yeux:"jaune",cheveux:"blond",lunettes:"oui",peau:"blanc",sexe:"femme",barbe:"non",moustache:"non"},
				{prenom:"Thomas",yeux:"marron",cheveux:"chauve",lunettes:"oui",peau:"métisse",sexe:"homme",barbe:"non",moustache:"non"},
				{prenom:"Lucas",yeux:"marron",cheveux:"gris",lunettes:"non",peau:"noir",sexe:"homme",barbe:"oui",moustache:"non"},
				{prenom:"Jules",yeux:"bleu",cheveux:"roux",lunettes:"non",peau:"blanc",sexe:"homme",barbe:"oui",moustache:"oui"},
				{prenom:"Jeanne",yeux:"vert",cheveux:"noir",lunettes:"non",peau:"blanc",sexe:"homme",barbe:"non",moustache:"non"},
				{prenom:"Charlotte",yeux:"marron",cheveux:"gris",lunettes:"oui",peau:"noir",sexe:"femme",barbe:"non",moustache:"non"},
				{prenom:"Maxime",yeux:"bleu",cheveux:"chatain",lunettes:"oui",peau:"blanc",sexe:"femme",barbe:"oui",moustache:"non"},
				{prenom:"Tom",yeux:"jaune",cheveux:"blond",lunettes:"oui",peau:"blanc",sexe:"homme",barbe:"non",moustache:"oui"},
				{prenom:"Samuel",yeux:"vert",cheveux:"roux",lunettes:"non",peau:"blanc",sexe:"homme",barbe:"non",moustache:"non"},
				{prenom:"Agathe",yeux:"marron",cheveux:"brun",lunettes:"oui",peau:"blanc",sexe:"homme",barbe:"non",moustache:"non"},
				{prenom:"Camille",yeux:"vert",cheveux:"noir",lunettes:"oui",peau:"blanc",sexe:"femme",barbe:"non",moustache:"non"},
				{prenom:"Louis",yeux:"bleu",cheveux:"brun",lunettes:"oui",peau:"blanc",sexe:"homme",barbe:"non",moustache:"oui"},
				{prenom:"Candice",yeux:"bleu",cheveux:"roux",lunettes:"non",peau:"blanc",sexe:"homme",barbe:"non",moustache:"non"},
				{prenom:"Nathan",yeux:"vert",cheveux:"noir",lunettes:"oui",peau:"métisse",sexe:"homme",barbe:"oui",moustache:"non"},
				{prenom:"Alice",yeux:"bleu",cheveux:"blond",lunettes:"non",peau:"blanc",sexe:"femme",barbe:"non",moustache:"non"},
				{prenom:"Antoine",yeux:"marron",cheveux:"chatain",lunettes:"oui",peau:"métisse",sexe:"homme",barbe:"oui",moustache:"oui"},
				{prenom:"Hugo",yeux:"marron",cheveux:"noir",lunettes:"non",peau:"noir",sexe:"homme",barbe:"non",moustache:"non"},
				{prenom:"Ethan",yeux:"bleu",cheveux:"gris",lunettes:"oui",peau:"blanc",sexe:"homme",barbe:"non",moustache:"oui"},
				{prenom:"Paul",yeux:"ver",cheveux:"blond",lunettes:"non",peau:"blanc",sexe:"homme",barbe:"non",moustache:"non"},
				{prenom:"Clémence",yeux:"vert",cheveux:"roux",lunettes:"non",peau:"blanc",sexe:"femme",barbe:"non",moustache:"non"}];

//Première fonction qui sera appelée après le chargement de la page

function debut() {
	choisirpersomystere();//Le programme choisit le personnage que le joueur devra deviner
	setnbpartie();//L'affichage du nombre de parties jouées est mit à jour
	setpseudo();//L'affichage du pseudo rentré dans l'accueil est mit à jour
	boutondemanderreponse = document.getElementById("boutoninterro");
	boutondemanderreponse.addEventListener("click",envoyerreponsequestion);
	boutonchoisirtypequestion = document.getElementById("choisirtypequestion");
	boutonchoisirtypequestion.addEventListener("click",choisirtypequestion);
	boutonenvoyerperso = document.getElementById("boutonenvoyer");
	boutonenvoyerperso.addEventListener("click",checkpersomystere);
	boutonretour = document.getElementById("boutonretour");
	boutonretour.addEventListener("click",retouraumenu);
	boutonmodeeliminer = document.getElementById("boutonmodeeliminer");
	boutonmodeeliminer.style.backgroundColor = "red";
	boutonmodeeliminer.addEventListener("click",fonctionmodeeliminer);
	for(i=1;i<22;i++) {
		document.getElementById(String("perso"+i)).addEventListener("click",eliminer);//Ajout d'un événement à chaque button de personnage
	}
	for(i=0;i<tabclass.length;i++) {//Affichage progressif des personnages
		tabclass[i].style.opacity = 1;
		if(i<=2) {
			duree = parseInt(i+0.5)+"s";
		}
		else {
			duree = parseInt(2.5+i/7)+"s";
		}
		tabclass[i].style.transition = duree;
		dureetotale = parseInt((dureetotale + duree)*1000);
	}
	setTimeout(settransition, dureetotale);//Une fois que les personnages sont totalement chargés, leur transition originale est remise. PS : Sinon le passage sur les personnages n'était pas fluide.
}

function settransition() {
	for(i=0;i<tabclass.length;i++) {
		tabclass[i].style.transition = "0.5s";
	}
}

function setpseudo() {
	var pseudo = localStorage.getItem("pseudo");
	var contenudiv = document.getElementById("nomjoueur");
	if(pseudo!=null) {
		contenudiv.innerHTML = "Nom du joueur : " + pseudo;
	}
	else {
		contenudiv.innerHTML = "Nom du joueur indéfini";
	}
}

function retouraumenu() {//Bouton retour au menu
	document.location.href = "../index.html"
}

function choisirpersomystere() {
	return persomystereid = nombrealeatoire(0, 22);//Nombre aléatoire compris entre 0 compris et 22 exclu
}

function setnbpartie() {
	if(localStorage.getItem("nbpartie")==undefined) {
		localStorage.setItem("nbpartie", "1");
	}
	else {
			var newnbpartie = parseInt(localStorage.getItem("nbpartie")) + 1;
			localStorage.setItem("nbpartie", newnbpartie);
	}
	var contenunbpartie = document.getElementById("nombrepartie");
	contenunbpartie.innerHTML = "Partie n°" + localStorage.getItem("nbpartie");
}

function choisirtypequestion() {//Gestion de la liste déroulante pour choisir de type de question à poser
	listetype = document.getElementById("listetype");
	choix = listetype.selectedIndex
	id = listetype.options[choix].value;
	var classpeau = document.getElementsByClassName("peau");
	var classsexe = document.getElementsByClassName("sexe");
	var classcheveux = document.getElementsByClassName("cheveux");
	var classyeux = document.getElementsByClassName("yeux");
	var classlunettes = document.getElementsByClassName("lunettes");
	switch(id) {
		case "Couleur de peau":
			gestionquestion(classpeau,classsexe,classcheveux,classyeux,classlunettes);
			break;
		case "Sexe":
			gestionquestion(classsexe,classpeau,classcheveux,classyeux,classlunettes);
			break;
		case "Cheveux":
			gestionquestion(classcheveux,classpeau,classsexe,classyeux,classlunettes);
			break;
		case "Couleur des yeux":
			gestionquestion(classyeux,classpeau,classsexe,classcheveux,classlunettes);
			break;
		case "Lunettes":
			gestionquestion(classlunettes,classpeau,classsexe,classcheveux,classyeux);
			break;
	}
}

function gestionquestion(classname,class1,class2,class3,class4) {//Gestion de l'affichage des questions correspondantes au type choisi précédemment
	//Ajoute les nouvelles questions
	for (var i=0;i<classname.length;i++) {
		classname[i].style.display = "contents";
	}
	//Supprime les anciennes questions
	for (var i=0;i<class1.length;i++) {
		class1[i].style.display = "none";
	}
	for (var i=0;i<class2.length;i++) {
		class2[i].style.display = "none";
	}
	for (var i=0;i<class3.length;i++) {
		class3[i].style.display = "none";
	}
	for (var i=0;i<class4.length;i++) {
		class4[i].style.display = "none";
	}
}


function envoyerreponsequestion() {//Retourne oui ou non en fonction de la question posée
	listequestions = document.getElementById("listequestions");
	question = listequestions.selectedIndex;
	reponsequestiondiv = document.getElementById("reponsequestion");
	switch(question) {
		case 1://Le personnage mystère a la peau blanche.
			if(listeperso[persomystereid].peau=="blanc") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 2://Le personnage mystère a la peau noire.
			if(listeperso[persomystereid].peau=="noir") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 3://Le personnage mystère est un homme.
			if(listeperso[persomystereid].sexe=="homme") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 4://Le personnage mystère est une femme.
			if(listeperso[persomystereid].sexe=="femme") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 5://Le personnage a des cheveux bruns.
			if(listeperso[persomystereid].cheveux=="brun") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 6://Le personnage a des cheveux chatains.
			if(listeperso[persomystereid].cheveux=="chatain") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 7://Le personnage a des cheveux roux.
			if(listeperso[persomystereid].cheveux=="roux") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 8://Le personnage a des cheveux blonds.
			if(listeperso[persomystereid].cheveux=="blond") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 9://Le personnage a des cheveux noirs.
			if(listeperso[persomystereid].cheveux=="noir") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 10://Le personnage a des cheveux gris.
			if(listeperso[persomystereid].cheveux=="gris") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 11://Le personnage a des yeux bleu
			if(listeperso[persomystereid].yeux=="bleu") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 12://Le personnage a des yeux bleu clair.
			if(listeperso[persomystereid].yeux=="bleu") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 13://Le personnage a des yeux marrons.
			if(listeperso[persomystereid].yeux=="marron") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 14://Le personnage a des yeux verts.
			if(listeperso[persomystereid].yeux=="vert") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 15://Le personnage a des yeux jaunes.
			if(listeperso[persomystereid].yeux=="jaune") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 16://Le personnage porte des lunettes.
			if(listeperso[persomystereid].lunettes=="oui") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
		case 17://Le personnage ne porte pas de lunettes.
			if(listeperso[persomystereid].lunettes=="non") {
				reponsequestiondiv.value = "Oui"
			}
			else {
				reponsequestiondiv.value = "Non"
			}
			break;
	}
}

function checkpersomystere() {//Vérifie si le prénom rentré dans le input est bien celui du personnage qu'il faut trouver
	reponseinput = document.getElementById("reponseperso").value;
	if(listeperso[persomystereid].prenom==reponseinput) {
		document.location.href = "../html/gagne.html"
	}
	else {
		window.alert("C'est faux !")
		nbessai = nbessai - 1;//3 essais max. sinon perdu
		if(nbessai==0) {
			document.location.href = "../html/perdu.html"
		}
		var contenuessai = document.getElementById("essais");
		contenuessai.innerHTML = "Nombre d'essais restant : " + nbessai
	}
}

function fonctionmodeeliminer() {//Active le "mode eliminer" pour pouvoir faire disparaître les persos à la suite des questions posées et des réponses reçues
	if(modeeliminer=="activé") {
		modeeliminer = "désactivé";
		boutonmodeeliminer.style.backgroundColor = "red";
	}
	else {
		modeeliminer = "activé";
		boutonmodeeliminer.style.backgroundColor = "green";
	}
}

function eliminer() {//Permet d'effacer les personnages en cliquant dessus
	if(modeeliminer=="activé") {
		var div = document.getElementById(this.id);
		if(div.style.opacity=="1") {
			div.style.opacity = "0.15";
		}
		else {
			div.style.opacity = "1";
		};
	};
}

function nombrealeatoire(min, max) {//Choisit un nombre aléatoire
	return Math.floor((Math.random() * (max - min) + min));
}

window.addEventListener("load",debut);//Lance le programme lorsque la page est entièrement chargée
