/* form-to-db */
function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
} else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
} else {
    // CORS not supported.
    xhr = null;
}
return xhr;
}

function makeCorsRequest(data) {
	var url = 'https://form-to-db.herokuapp.com/';
	var body = JSON.stringify(data);
	var xhr = createCORSRequest('POST', url);
	if (!xhr) {
		alert('CORS not supported');
		return;
	}
	xhr.setRequestHeader('Content-Type', 'application/json');
  // Error Handler
  xhr.onerror = function() {
  	alert('Woops, there was an error making the request.');
  };
  xhr.send(body);
}
/* end form-to-db */

$(window).scroll(function(e){ 
	var $el = $('.fixedElement');
	var isPositionFixed = ($el.css('position') == 'fixed');
	if ($(this).scrollTop() > 0 && !isPositionFixed){ 
		$('.fixedElement').css({'position': 'fixed', 'top': '0px'}); 
	}
	if ($(this).scrollTop() < 0 && isPositionFixed)
	{
		$('.fixedElement').css({'position': 'static', 'top': '0px'}); 
	} 
});

$('#start_button').click(function () {
	$( "#sticky-logo" ).fadeIn( "slow", function() {
	})
});

$('.stop-sticky').click(function () {
	$( "#sticky-logo" ).fadeOut( "slow", function() {
	})
});

function validateForm() {
	var padding;
	var inputs = document.getElementsByTagName("input");
	var emailID = document.getElementById('f_email').value;
	var phoneno = /^\d{10}$/;  
	atpos = emailID.indexOf("@");
	dotpos = emailID.lastIndexOf(".");

	if (atpos < 1 || ( dotpos - atpos < 2 ) && index.html) 
	{
		$('.error_mail').show();
		document.getElementById('f_email').focus() ;
		return false;
	}
	else {$('.error_mail').hide();}

	if(!(document.getElementById('f_tel').value.match(phoneno)) && (document.getElementById('f_tel').value.length > 0))  
	{  
		$('.error_tel').show();
		document.getElementById('f_tel').focus() ;
		return false;  
	}
	else {$('.error_tel').hide();}

	if((document.getElementById('f_name').value.length == 0) || (document.getElementById('f_prenom').value.length == 0))
	{  
		$('.error_np').show();
		return false;  
	}
	else {$('.error_np').hide();}
	
	$("body").append('<iframe src="https://orixamedia.go2cloud.org/SLK4?adv_sub=' + document.getElementById('f_email').value + '" scrolling="no" frameborder="0" width="1" height="1" style="display:none"></iframe>');
	display_results();
	$('#footer').css({"display": "block"});
	SendDataToWoopra();
	formToDb();
	FadeOutFormSlide();
};

function FadeOutFormSlide() {
	$( "#slide-end-form" ).fadeOut( "slow", function() {''
		$( ".slide-end-1" ).fadeIn( "slow", function() {
		});
	});
}


function SendDataToWoopra() {
    var p = extractUrlParams();
    
/* ADD RESERVED_CODE_MEDIA IN IRAISER LINK */

if ('canal' in p && p['canal'] == "orixa") {
    $(".link-don").each( function() {
		var link = $(this).attr('href') + '&reserved_code_media=W16PI13A';
		$(this).attr("href", link);
    });
}
else if ('reserved_code_media' in p) {
		$(".link-don").each( function() {
		var link = $(this).attr('href') + '&reserved_code_media=' + p['reserved_code_media'];
		$(this).attr("href", link);
	});
	else {
	    $(".link-don").each( function() {
		var link = $(this).attr('href') + '&reserved_code_media=' + 'W16PI13B';
		$(this).attr("href", link);
	});
	}
}
	
	/* END */

	woopra.identify({
		email: document.getElementById('f_email').value,
		name: document.getElementById('f_prenom').value + " " + document.getElementById('f_name').value,
		firstname: document.getElementById('f_prenom').value,
		lastname: document.getElementById('f_name').value,
		phone: document.getElementById('f_tel').value
	});

	var optin = "";
	if(document.getElementById('f_check').checked == true)
		optin = "non";
	else
		optin = "oui";

	woopra.track("inscription", {
		optin: optin,
		url: document.location.href,
		title: document.title,
		origine: "Enquete 2016"
	});

	if ('canal' in p) {
		woopra.track("survey_2016", {
			canal: p['canal'],
			optin: optin
		});
	}
	else {
		woopra.track("survey_2016", {
			canal: "bdd",
			optin: optin
		});
	}
}

function formToDb() {
	var p = extractUrlParams();
	var canal = "";
	var q = [];
	var optin = "";
	var i = 0;

	if ('canal' in p) {
		canal = "orixa"
	}
	else {
		canal = "bdd";
	}

	if(document.getElementById('f_check').checked == true)
		optin = "non";
	else
		optin = "oui";

	$(".selected").each( function() {
		q[i] = $(this).attr("id");
		i++;
	})

	var data = {
		"schema": "spa_survey_2016",
		"db": {
			"origin": "Enquete 2016",
			"email": $("#f_email").val(),
			"firstname": $('#f_prenom').val(),
			"lastname": $('#f_name').val(),
			"phone": $('#f_tel').val(),
			"canal": canal,
			"optin": optin,
			"q1": q[0],
			"q2": q[1],
			"q3": q[2],
			"q4": q[3],
			"q5": q[4]
		}
	}
	makeCorsRequest(data);
}


var images = new Array();

function 	getMaxTableau(table) {
	var 	count;
	var 	value;
	var 	check;

	count = 1;
	check = 0;
	value = 0;
	while (count < table.length)
	{
		if (table[value] < table[count])
		{
			value = count;
			check = 0;
		}
		else if (table[value] == table[count])
			check = 1;
		count++;
	}
	if (check == 1)
		return (4);
	return (value);
}

var 	type;
var 	title = ["Sociable et courageux comme le chien !", "Tranquille comme le chat !", "Joueur comme le hamster !", "Dynamique et libre comme le cheval !", "Câlin comme le lapin !"];
var 	description = ["L’ami sympathique par excellence, c'est vous ! Toujours présent pour sortir passer du bon temps, on sait que l’on peut aussi compter sur vous en cas de besoin. Quand vous êtes là, la bonne ambiance est toujours assurée, alors un conseil : ne changez pas ! ",
"On respecte votre force tranquille : vous n'avez pas besoin d'en faire des tonnes pour être remarqué(e). Comme le chat, vous faites parler de vous et ce n'est pas pour rien : vous êtes si doux !",
"Nous comptons tous au moins une personne infatigable dans notre cercle d'amis. Pour votre entourage, cette personne c'est vous. Très dynamique, vous êtes toujours à la recherche de nouvelles expériences et c'est vous qu'on appelle pour les idées un peu folles. Avec vous c'est sûr, on ne s'ennuie jamais ! (mais encore faut-il tenir votre rythme..)",
"Vous êtes celui qu'on admire pour son indépendance. Délicat, vous n'en êtes pas moins majestueux : vous imposez le respect par votre simple présence, pleine d'humilité et de bonté. A vos côtés on se sent souvent apaisé, et c'est pourquoi on recherche votre compagnie !", "Personne ne vous résiste : quelques minutes en votre compagnie suffisent à être touché par votre grand coeur. Vous êtes d'une rare douceur, ne vous étonnez pas si on se bat pour vous !"];
var 	support = ["La SPA compte les chiens par milliers dans ses refuges. Chaque jour, nos experts parcourent la France pour sauver des animaux de la détresse, et leur offrir les meilleures conditions d'accueil. Vous aussi, protégez nos petits compagnons.",
"La SPA compte les chats par milliers dans ses refuges. Chaque jour, nos experts parcourent la France pour  sauver des animaux de la détresse, et leur offrir les meilleures conditions d'accueil. Vous aussi, protégez nos petits compagnons.",
"Les refuges de la SPA accueillent des chiens et chats, mais aussi des rongeurs (et bien d’autres animaux encore) ! Chaque jour, nos experts parcourent la France pour sauver  des animaux de la détresse, et leur offrir les meilleures conditions d'accueil. Vous aussi, protégez nos petits compagnons.",
"Les refuges de la SPA accueillent des chiens et chats, mais aussi des chevaux et d’autres animaux encore. Chaque jour, dans toute la France, nos équipes secourent et prennent soin des animaux en détresse. Vous aussi, protégez nos petits compagnons.",
"Les refuges de la SPA accueillent des chiens et des chats mais aussi des lapins (et bien d’autres animaux encore). Chaque jour, dans toute la France, nos équipes secourent et prennent soin des animaux en détresse. Vous aussi, protégez nos petits compagnons."];
var 	img_link=["https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/img-resultat-chien.png",
"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/img-resultat-chat.png",
"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/img-resultat-hamster.png",
"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/img-resultat-cheval.png", 
"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/img-resultat-lapin.png"];
var 	fb_img_link=["https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/FB_chien.png",
"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/FB_Chat.png",
"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/FB_hamster.png",
"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/FB_cheval.png", 
"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/FB_lapin.png"];

function 	display_results()
{
	type = get_results();
	$("#input_title").html(title[type]);
	$("#input_description").html(description[type]);
	$("#input_support").html(support[type]);
	$("#input_img").attr("src", img_link[type]);

}

function	get_results()
{
	var 	type=[0,0,0,0];//0->chien 1->chat 2->hamster 3->cheval

	$(".selected").each(function(){
		type[$(this).attr("value")] += 1;
	});
	//	console.log(type[0] + ' ' + type[1] + ' ' + type[2] + ' ' + type[3]);
	return (getMaxTableau(type));
}

function 	select(item)
{
	var 	a;
	var 	generate;

	if ($(item).attr("src") == "" || $(item).attr("src").search("selected") != -1)
		return (false);
	generate = $(item).attr("src");
	a = generate.length;
	generate = generate.substring(0, generate.length - 4) + "-selected.png";
	$(item).attr("src", generate);
	return (true);
}

function 	unselect(item)
{
	var 	a;
	var 	generate;

	if ($(item).attr("src") == "")
		return (false);
	generate = $(item).attr("src");
	a = generate.length;
	generate = generate.substring(0, generate.length - 13) + ".png";
	$(item).attr("src", generate);
	return (true);
}

function 	preload() {
	for (i = 0; i < preload.arguments.length; i++) {
		images[i] = new Image();
		images[i].src = preload.arguments[i];
	}
}


function 	vertical_center(item)
{
	var 	height;
	var 	total_height;
	var 	padding;

	height = $(item).height();
	total_height = $(item).parent().height();
	padding = (total_height - height) / 2 - 20;
	$(item).css({"padding-top" : "8%"});
}


$( window ).resize(function()
{
	$(".question_container").each(function()
	{
		vertical_center($(this));
	});
});

$(".question_container").each(function()
{
	vertical_center($(this));
});

preload("https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q1-1-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q1-2-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q1-3-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q1-4-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q2-1-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q2-2-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q2-3-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q2-4-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q3-1-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q3-2-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q3-3-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q3-4-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q4-1-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q4-2-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q4-3-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q4-4-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q5-1-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q5-2-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q5-3-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q5-4-selected.png",
	"https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/Q5-5-selected.png"
	);

$(".answer").mouseenter(function()
{
	select($(this));
});

$(".answer").mouseleave(function()
{
	if ($(this).hasClass("selected") == false)
		unselect($(this));
});

$(".answer").click(function()
{
	$(this).parent().find($("img")).removeClass("selected");
	$(this).addClass("selected");
	$(this).parent().find($("img")).each(function(){
		if ($(this).attr("src") != "" && $(this).attr("src").search("selected") != -1)
			unselect($(this));
	});
	select($(this));
	$(this).parent().parent().parent().next().css({"display" : "block"});
	vertical_center($(this).parent().parent().parent().next().find(".question_container"));
	scrollTo($(this).parent().parent().parent().next());
});

$("#start_button").click(function()
{
	$("#q1").parent().css({"display":"block"});
	vertical_center($("#q1"));
	scrollTo("#q1");
});

function 	scrollTo(next){
	if ($(next).length != 0)
	{
		$('html, body').stop().animate({
			scrollTop: $(next).offset().top + 1
		}, 700, 'swing');
		return false;
	}
};

$(document).ready(function(){
	$('.img-zoom').hover(function() {
		$(this).addClass('transition');

	}, function() {
		$(this).removeClass('transition');
	});
});


$(window).scroll(function() {
	if ($('#final').css('display') == "block")
	{
		var wS = $(this).scrollTop();
		if (wS >= ($('#final').offset().top + $('#final').outerHeight() - $(window).height())){
			$("#final").prevAll().css({"display" : "none"});
		}
	}
});

window.fbAsyncInit = function() {
	FB.init({
		appId      : '1590016401303861',
		xfbml      : true,
		version    : 'v2.7'
	});
	document.getElementById('input_link').onclick = function() {
		FB.ui({
			method: 'feed',
			picture: fb_img_link[type],
			link: 'http://quizz.la-spa.fr/',
			description: "Je suis \"" + title[type] + "\"",
			caption: "Venez découvrir quel animal se cache en vous",

		}, function(response){});
	}
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/fr_FR/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));




