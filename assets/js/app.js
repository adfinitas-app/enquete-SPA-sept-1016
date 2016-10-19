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
    // CORS not supported
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
		$('.fixedElem