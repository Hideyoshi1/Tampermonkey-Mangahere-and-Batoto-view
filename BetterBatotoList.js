// ==UserScript==
// @name         Better Batoto view
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        bato.to
// @grant        none
// ==/UserScript==

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function work(){
    i=0;
    var x = document.getElementsByClassName("row1 lang_English");
    var y = document.getElementsByClassName("row0 lang_English");
    for (i=0;i<=x.length-1;i+=1){
        var myimg = x[i].getElementsByTagName('img')[0];
        try{
            var mysrc = myimg.src;
        }
        catch(err){
            continue;
        }
        if((mysrc.indexOf("thumbnail") !== -1)!=true){
            continue;
        }
        myimg.src=mysrc.replace("thumbnail", "forums/uploads");
        myimg.style.height="500px";
        myimg.style.width="280px";
    }
    for (i=0;i<=y.length-1;i+=1){
        var myimg = y[i].getElementsByTagName('img')[0];
        try{
            var mysrc = myimg.src;
        }
        catch(err){
            continue;
        }
        if((mysrc.indexOf("thumbnail") !== -1)!=true){
            continue;
        }
        myimg.src=mysrc.replace("thumbnail", "forums/uploads");
        myimg.style.height="500px";
        myimg.style.width="280px";
    }
}

(function() {
    window.onload = function () { $('head').append("<style>fieldset, img {border: 1px solid black;}Style Attribute {font-size: 20px;}</style>"); };
   work();
})();
