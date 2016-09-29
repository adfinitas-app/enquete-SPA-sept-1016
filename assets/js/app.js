FB.ui(
{
	method: 'feed',
	name: 'Facebook Dialogs',
	link: 'http://developers.facebook.com/docs/reference/dialogs/',
	picture: 'http://fbrell.com/f8.jpg',
	caption: 'Reference Documentation',
	description: 'Dialogs provide a simple, consistent interface for applications to interface with users.',
	message: 'Facebook Dialogs are easy!'
},
function(response) {
	if (response && response.post_id) {
		alert('Post was published.');
	} else {
		alert('Post was not published.');
	}
}
);

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

function validateForm(){
	var padding;
	var inputs = document.getElementsByTagName("input");
	var emailID = document.getElementById('f_email').value;
	var phoneno = /^\d{10}$/;  
	atpos = emailID.indexOf("@");
	dotpos = emailID.lastIndexOf(".");
	if (atpos < 1 || ( dotpos - atpos < 2 )) 
	{
		$('.error_mail').show();
		document.getElementById('f_email').focus() ;
		return false;
	}
	else {$('.error_mail').hide();}
	if(!(document.getElementById('f_tel').value.match(phoneno)))  
	{  
		$('.error_tel').show();
		document.getElementById('f_email').focus() ;
		return false;  
	}
	else {$('.error_tel').hide();}
	if((document.getElementById('f_name').value.length == 0) || (document.getElementById('f_prenom').value.length == 0))
	{  
		$('.error_np').show();
		return false;  
	}
	else {$('.error_np').hide();}

	
	display_results();

	$('#footer').css({"display": "block"});
	SendDataToWoopra();
	FadeOutFormSlide();
};

function FadeOutFormSlide() {
	$( "#slide-end-form" ).fadeOut( "slow", function() {''
		$( ".slide-end-1" ).fadeIn( "slow", function() {
		});
	});
}


function SendDataToWoopra() {
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

	var p = extractUrlParams();

	if ('canal' in p) {
		woopra.track("survey_2016", {
			canal: "orixa",
			optin: optin
		});
	}
	else {woopra.track("survey_2016", {
		canal: "bdd",
		optin: optin
	});
}
}



var images = new Array();

function 	getMaxTableau(table) {
	var 	count;
	var 	value;

	count = 1;
	value = table[0];
	while (count < table.length)
	{
		if (table[value] < table[count])
			value = count;
		count++;
	}
	return (value);
}

function 	display_results()
{
	var 	type;
	var 	title = ["Sociable et courageux comme le chien !", "Tranquille comme le chat !", "Joueur comme le hamster !", "Dynamique et libre comme le cheval !"];
	var 	description = ["L’ami sympathique par excellence, c'est vous ! Toujours présent pour sortir passer du bon temps, on sait que l’on peut aussi compter sur vous en cas de besoin. Quand vous êtes là, la bonne ambiance est toujours assurée, alors un conseil : ne changez pas ! ",
	"On respecte votre force tranquille : vous n'avez pas besoin d'en faire des tonnes pour être remarqué(e). Comme le chat, vous faites parler de vous et ce n'est pas pour rien : vous êtes si doux !",
	"Nous comptons tous au moins une personne infatigable dans notre cercle d'amis. Pour votre entourage, cette personne c'est vous. Très dynamique, vous êtes toujours à la recherche de nouvelles expériences et c'est vous qu'on appelle pour les idées un peu folles. Avec vous c'est sûr, on ne s'ennuie jamais ! (mais encore faut-il tenir votre rythme..)",
	"Vous êtes celui qu'on admire pour son indépendance. Délicat, vous n'en êtes pas moins majestueux : vous imposez le respect par votre simple présence, pleine d'humilité et de bonté. A vos côtés on se sent souvent apaisé, et c'est pourquoi on recherche votre compagnie !"];
	var 	fb_link = ["https://soutenir.la-spa.fr/?cid=143","https://soutenir.la-spa.fr/?cid=143","https://soutenir.la-spa.fr/?cid=143","https://soutenir.la-spa.fr/?cid=143"];
	var 	support = ["La SPA compte les chiens par milliers dans ses refuges. Chaque jour, nos experts parcourent la France pour sauver des animaux de la détresse, et leur offrir les meilleures conditions d'accueil. Vous aussi, protégez nos petits compagnons.",
	"La SPA compte les chats par milliers dans ses refuges. Chaque jour, nos experts parcourent la France pour  sauver des animaux de la détresse, et leur offrir les meilleures conditions d'accueil. Vous aussi, protégez nos petits compagnons.",
	"Les refuges de la SPA accueillent des chiens et chats, mais aussi des chevaux et d’autres animaux encore. Chaque jour, dans toute la France, nos équipes secourent et prennent soin des animaux en détresse. Vous aussi, protégez nos petits compagnons.",
	"Les refuges de la SPA accueillent des chiens et chats, mais aussi des rongeurs (et bien d’autres animaux encore) ! Chaque jour, nos experts parcourent la France pour sauver  des animaux de la détresse, et leur offrir les meilleures conditions d'accueil. Vous aussi, protégez nos petits compagnons. "];
	var 	img_link=["https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/img-resultat-chien.png","https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/img-resultat-chien.png","https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/img-resultat-chien.png","https://s3.amazonaws.com/heroku-adfinitas-campaign/SPA-donor-journey-sept-2016/img-resultat-chien.png"];

	type = get_results();
	$("#input_title").html(title[type]);
	$("#input_description").html(description[type]);
	$("#input_link").attr("href", fb_link[type]);
	$("#input_support").html(support[type]);
	$("#input_img").attr("href", img_link[type]);

}

function	get_results()
{
	var 	type=[0,0,0,0];//0->chien 1->chat 2->hamster 3->cheval

	$(".selected").each(function(){
		type[$(this).attr("value")] += 1;
	});
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
	$(item).css({"padding-top" : padding});
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

$('#button-don').click(function(){
	$( ".slide-end-1" ).fadeOut( "slow", function() {
		$( ".slide-end" ).fadeIn( "slow", function() {
		});
	});
});

$('#button-retour').click(function(){
	$( ".slide-end" ).fadeOut( "slow", function() {
		$( ".slide-end-1" ).fadeIn( "slow", function() {
		});
	});
});

$(window).scroll(function() {
	console.log("helfezlo");
	if ($('#final').css('display') == "block")
	{
		var wS = $(this).scrollTop();
		console.log(wS + "--");
		console.log($('#final').offset().top + $('#final').outerHeight() - $(window).height());
		if (wS >= ($('#final').offset().top + $('#final').outerHeight() - $(window).height())){
			console.log("hello");
			$("#final").prevAll().css({"display" : "none"});
		}
	}
});