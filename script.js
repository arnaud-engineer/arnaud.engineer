var pageTitlePrefix = "arnaud.engineer";
var pageTitleSeparator = " - ";
var pageTitleDefault = "swiss-knife software engineer";
var pageTitleName = "";
var pageFile = "home.html";

var appLanguage = "EN";
var appTexts;
var appTexts_FR;
var appTexts_EN;

var mainVueApp;
var pageVueApp;

/* ======================================================================
	CV PAGE
   ====================================================================== */

	/**
	 * Determine the mobile operating system.
	 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
	 *
	 * @returns {String}
	 */

	 /*
	function getMobileOperatingSystem() {
	  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

		if (/android/i.test(userAgent)) {
			return "Android";
		}

		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			return "iOS";
		}

		return "unknown";
	}


	function cvPdfToImgTest()
	{
		if(getMobileOperatingSystem() === "Android" || getMobileOperatingSystem() === "iOS")
		{
			var view = document.getElementById("pdf-view");
			var pdf = document.getElementById("pdf");
			pdf.parentNode.removeChild(pdf);

			var div = document.createElement("div");
			div.id = "pdf";

			var img = document.createElement("img");
			img.src = "assets/CV_Arnaud.jpg";
			img.id = "innerPDF";

			div.appendChild(img);
			view.appendChild(div);
		}
	}
*/



/* OTHERS */


/* SRC : https://stackoverflow.com/questions/36921947/read-a-server-side-file-using-javascript */
function loadFile(filePath)
{
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", filePath, false);
	xmlhttp.send();
	if (xmlhttp.status==200) {
		result = xmlhttp.responseText;
	}
	return result;
}


/* TODO :to test and improve */
function waitForElement(elementId, callBack){
	window.setTimeout(function(){
		var element = document.getElementById(elementId);
		if(element){
			callBack(elementId, element);
		} else{
			waitForElement(elementId, callBack);
		}
	} , 500)
}



function reloadApp(pageContentUrl) {
	file = loadFile("index.html");
	document.getElementById("loading-content").innerHTML = file;
	waitForElement("#loading-content",function(){
		console.log("done");
	});
	document.getElementsByTagName("html")[0].innerHTML = document.getElementById("loading-content").innerHTML;
	document.getElementById("loading-content").innerHTML = "";
}


function openPage(pageContentUrl) {
	var file;
	var content;

	reloadPageVue();

	if(pageContentUrl != "" || pageContentUrl != null) {
		file = loadFile("pages/" + pageContentUrl);
	}
	else { /* default = home */
		file = loadFile("pages/home.html");
	}

	document.getElementById("loading-content").innerHTML = file;

	waitForElement("#loading-content",function(){
		console.log("done");
	});
	pageFile = pageContentUrl;

/*
	if(pageContentUrl == "cv.html")
		cvPdfToImgTest();
*/
	document.getElementsByTagName("main")[0].innerHTML = document.getElementById("loading-content").innerHTML;
	document.getElementById("loading-content").innerHTML = "";

	if(pageContentUrl == "contact.html") {
		pageTitleName = pageVueApp.contact.doc_title;
	}
	else if(pageContentUrl == "cv.html") {
		pageTitleName = pageVueApp.resume.doc_title;
	}
	else if(pageContentUrl == "legal.html") {
		pageTitleName = pageVueApp.legal.doc_title;
	}
	else {
		pageTitleName = pageVueApp.home.doc_title;
	}

	document.title = pageTitlePrefix + pageTitleSeparator + pageTitleName;

	reloadPageVue();

	window.scrollTo(-1000, -1000);
}



/*
async function readJSON(path) {
	const response = await fetch(path);
	const json = await response.json();
	return json;
}
*/


function printResume()
{ printJS({printable:window.location.href + pageVueApp.resume.resume_pdf, type:'pdf'}); }

function printPortfolio()
{ printJS({printable:window.location.href + pageVueApp.resume.portfolio_pdf, type:'pdf'}); }


function changeLanguage(lang) {
	if(lang == "FR") { appLanguage = "FR";}
	else { appLanguage = "EN";}
	getTexts();
	reloadApp();
	openPage(pageFile);
	reloadMainVue();
	reloadPageVue();
}

function getTexts() {
	if(appLanguage == "FR") { appTexts = appTexts_FR; }
	else { appTexts = appTexts_EN; }
	
}

function loadTexts() {

	let jsonFile = "texts/en.json"; //default
	let request = new XMLHttpRequest();
	request.open("GET", jsonFile, false);
	request.send(null)
	appTexts_EN = JSON.parse(request.responseText);

	jsonFile = "texts/fr.json"; //default
	request = new XMLHttpRequest();
	request.open("GET", jsonFile, false);
	request.send(null)
	appTexts_FR = JSON.parse(request.responseText);
}

function reloadMainVue() {
	mainVueApp = new Vue({
		el: '#app',
		data: {
			header: {
				resume: appTexts.header.resume,
				contact: appTexts.header.contact,
				banner: appTexts.header.banner,
				banner_url: appTexts.header.banner_url
			},
			footer: {
				elsewhere: appTexts.footer.elsewhere,
				contact: appTexts.footer.contact,
				about: appTexts.footer.about,
				legal: appTexts.footer.legal,
				sources_verb: appTexts.footer.sources_verb,
				sources_link_name: appTexts.footer.sources_link_name,
				licence_verb: appTexts.footer.licence_verb,
				licence_link_name: appTexts.footer.licence_link_name
			},
		},
	});
}

function reloadPageVue() {
	pageVueApp = new Vue({
		el: 'main',
		data: {
			home: {
				doc_title: appTexts.home.doc_title,
				title: appTexts.home.title,
					p1: appTexts.home.p1,
					p2: appTexts.home.p2,
					p3: appTexts.home.p3,
					elsewhere: appTexts.home.elsewhere,
				open: appTexts.home.open,
					hire: appTexts.home.hire,
					prestations: appTexts.home.prestations,
					volunteering: appTexts.home.volunteering,
					discuss: appTexts.home.discuss,
				skills: appTexts.home.skills,
					conception: appTexts.home.conception,
					dev: appTexts.home.dev,
					projects: appTexts.home.projects,
					excel: appTexts.home.excel,
					validation: appTexts.home.validation,
					support: appTexts.home.support,
					doc: appTexts.home.doc,
					afterwork: appTexts.home.afterwork,
				stack: appTexts.home.stack,
				second_stack: appTexts.home.second_stack,
				trust: appTexts.home.trust,
				further: appTexts.home.further,
					further_resume: appTexts.home.further_resume,
					further_next: appTexts.home.further_next,
					further_projects: appTexts.home.further_projects
			},

			resume: {
				doc_title: appTexts.resume.doc_title,
				title: appTexts.resume.title,
				p: appTexts.resume.p,
				resume: appTexts.resume.resume,
				portfolio: appTexts.resume.portfolio,
				download: appTexts.resume.download,
				print: appTexts.resume.print,
				resume_pdf: appTexts.resume.resume_pdf,
				resume_img: appTexts.resume.resume_img,
				portfolio_pdf: appTexts.resume.portfolio_pdf
			},

			contact: {
				doc_title: appTexts.contact.doc_title,
				title: appTexts.contact.title,
				job: appTexts.contact.job,
				elsewhere: appTexts.contact.elsewhere
			},

			legal: {
				doc_title: appTexts.legal.doc_title,
				editor: appTexts.legal.editor,
				host: appTexts.legal.host,
				policy: appTexts.legal.policy,
				p1: appTexts.legal.p1,
				p2: appTexts.legal.p2
			}
		},
	});
}


document.addEventListener('DOMContentLoaded', function(event)
{
	// BROWSER LANGUAGE DETECTION
	var language_detection = navigator.language || navigator.userLanguage;
	if(language_detection.includes("fr")) {
		appLanguage = "FR";
	} /* Default : EN */

	// TEXTS LOADING

	loadTexts();
	getTexts();

	reloadMainVue();

	openPage("home.html");
});


