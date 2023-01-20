var boutonconfirmerpseudo;
var boutonconnexion

function debut() {
	setpseudo();
}

function setpseudo() {
	boutonconnexion = document.getElementById("boutonjouer");
	boutonconnexion.disabled = true;
	boutonconfirmerpseudo = document.getElementById("boutonconfirmerpseudo");
	boutonconfirmerpseudo.addEventListener("click",confirmerpseudo);
	boutonconnexion.addEventListener("click",jouer);/*Ajouter un abonnement au bouton connexion*/
}

function confirmerpseudo() {
	var rentrerpseudocontenu = document.getElementById("rentrerpseudo").value;
	localStorage.setItem("pseudo", rentrerpseudocontenu)
	boutonconfirmerpseudo.style.display = "none";
	document.getElementById("rentrerpseudo").readOnly = true;
	boutonconnexion.disabled = false;
}

function jouer() {
	document.location.href="html/jeu.html";
}

window.addEventListener("load",debut);/*Lance le programme uniquement lorsque la page est entièrement chargée*/
