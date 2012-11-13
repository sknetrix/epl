//

var data = require("self").data;
var pageMod = require("page-mod");
var request = require("request").Request;
var widgets = require("widget");
var tabs = require("tabs");

function onClickShowPanel() {
    var title = getTitle();
    tabs.open(createPirateBayURL(title));
    panel.removeListener('show', hidePanel);
}

function onClickHidePanel() {
    panel.on('show', hidePanel);
}

function hidePanel() {
    panel.hide();
}

function urlencode(str) {
    return escape(str).replace(/\+/g,'%2B').replace(/%20/g, '+').replace(/\*/g, '%2A').replace(/\//g, '%2F').replace(/@/g, '%40');
}

function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g,'');
};

function getUrlDownload(bookId) {
    /*request({
        url: "http://www.epublibre.tk/d.php?id="+bookId,
        onComplete: function (response) {
            var url = response.text;
        }
    });*/
    var url = "http://test.com";
    return url;
}

// change code when ID is in HTML
function getBookId() {
    var url = tabs.activeTab.url;
    var bookId = url.substring(url.lastIndexOf("/")+1);
    return bookId;
}

// Format: epublibre - Title
function getTitle() {
    var title = tabs.activeTab.title;
    return title
}

// Section 601 = ebooks
function createPirateBayURL(title) {
    return "http://thepiratebay.se/search/"+urlencode(trim(title))+"/0/99/601";
}

//http://thepiratebay.se/search/un%20mundo%20sin%20fin/0/99/601
var panel = require("panel").Panel({
    width: 380,
    height: 180,
    contentURL: "http://thepiratebay.se/search/un%20mundo%20sin%20fin/0/99/601"
});

function checkUrl(url) {
    if (url.indexOf("epublibre\.tk/www/libro") != -1) {
        widget.contentURL = data.url("mail2.png");
        widget.removeListener("click", onClickHidePanel);
        widget.on("click", onClickShowPanel);
    } else {
        widget.contentURL = data.url("mail1.png");
        widget.removeListener("click", onClickShowPanel);
        widget.on("click", onClickHidePanel);
    }
}

var widget = widgets.Widget({
    id: "epublibre-link",
    label: "epublibreDownload",
    contentURL: data.url("mail1.png"),
    contentScriptFile: data.url("epublibre-download.js"),
    //panel: panel
});

// Default: hide panel
panel.on('show', hidePanel);

tabs.on('activate', function(tab) {
  checkUrl(tab.url); 
});

tabs.on('ready', function(tab){
    checkUrl(tab.url);
});

tabs.on('open', function(tab){
  checkUrl(tab.url);
});