function getDivElementByClass(matchClass) {
    var elems = document.getElementsByTagName('div'), i;
    var element = null;
    for (i in elems)
    {
        if ((" " + elems[i].className + " ").indexOf(" " + matchClass + " ") > -1)
        {
            element = elems[i];
        }
    }
	return element;
}

function showLink(url) {
    var titulo = getDivElementByClass("det_titulo");
    var link = document.createElement('a');
	link.setAttribute("href",url);
	link.innerHTML="(Download)";
	titulo.appendChild(link);
}

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
    var url = document.location.href;
    var bookId = url.substring(url.lastIndexOf("/")+1);
    return bookId;
}

var bookId;
var urlDownload;

bookId = getBookId();
urlDownload = getUrlDownload(bookId);
showLink(urlDownload);