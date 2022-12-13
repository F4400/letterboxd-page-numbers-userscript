// ==UserScript==
// @name         Letterboxd Page Numbers
// @namespace    https://github.com/F4400
// @version      1.5
// @description  Adds all page numbers for easier navigation.
// @author       F4400
// @match        https://letterboxd.com/*
// @icon         https://letterboxd.com/favicon.ico
// @grant        none
// ==/UserScript==

const allLinks = document.getElementsByClassName('paginate-page');

if (allLinks.length != 0) {
    var lastLink = allLinks[allLinks.length - 1].innerHTML;

    var url = window.location.href;

    var regLastNo = /(\d+)(?!.*\d)/;
    var lastNo = lastLink.match(regLastNo)[0];

    var regPageNoPage = "page/[^/]+(?=/$|$)";
    var regPageNo = "[^/]+(?=/$|$)";

    var pageNo = url.match(regPageNoPage);
    var no = 1;

    if (pageNo != null) {
        pageNo[0] = pageNo[0].match(regPageNo);
        no = pageNo[0];
        no = no[0];
    }

    var aHref = "";
    var firstLink = allLinks[0].innerHTML;

    if (lastNo === no && no > 0) {
        aHref = firstLink.substring(0, firstLink.length - (7 + 1)) + "/page/";
    } else if (lastNo < no && lastNo == 1 && no > 0) {
        aHref = firstLink.substring(0, firstLink.length - (7 + 1)) + "/page/";
    } else {
        aHref = lastLink.substring(0, lastLink.length - (7 + 2 * lastNo.length));
    }

    $("li.paginate-page").remove();

    var code = '<ul class=""><li class="paginate-page">' + aHref.substring(0, aHref.length - 5) + '">1</a></li>';

    var i = 1;
    for (i = 2; i <= lastNo; i++) {
        code += '<li class="paginate-page">' + aHref + i + '/">' + i + '</a></li>';
    }

    code += '</ul>';

    $("div.paginate-pages").append(code);

    var breakPoint = 0;
    if (url.match(/\/reviews\//) || url.match(/\/list\//) || url.match(/\/lists\//)) {
        breakPoint = 14;
    } else if (url.match(/\/films\//) || url.match(/\/watchlist\//) || url.match(/\/diary\//)) {
        breakPoint = 20;
    } else {
        breakPoint = 14;
    }

    var lines = Math.ceil(lastNo / breakPoint);

    const element0 = document.getElementsByClassName('pagination')[0];
    element0.setAttribute('style', 'height:' + 30 * lines + 'px');

    const element2 = document.getElementsByClassName('paginate-pages')[0];
    element2.setAttribute('style', 'width:64%; left:18%');

    if (lastNo > breakPoint) {
        const element1 = document.getElementsByClassName('paginate-page');
        for (i = 0; i < lastNo; i++) {
            element1[i].setAttribute('style', 'width:30px');
        }
    }

    no = Number(no);
    if (!Number.isFinite(no)) {
        no = 1;
    }

    const element = document.getElementsByClassName('paginate-page')[no - 1];
    element.classList.add("paginate-current");

    var e = element.getElementsByTagName('a')[0];
    var d = document.createElement('span');
    d.setAttribute('style', 'color:#00e054');
    d.innerHTML = e.innerHTML;

    e.parentNode.replaceChild(d, e);
}