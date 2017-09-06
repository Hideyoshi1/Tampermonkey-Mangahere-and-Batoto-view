// ==UserScript==
// @name         Better Manga List
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Latest manga auto hover view
// @author       You
// @match        http://www.mangahere.co/latest/*
// @grant        none
// ==/UserScript==

var delay=900;
function popupinfo2(data,i) {
    var html = '', w = 'f';
    if (!data) {
        html = "<h5>Information Not Available<h5>";
    } else {
        html  = '<h5>' + data[0] + '</h5>';
        html += '<div class="message_main">';
        html += '<div class="message_mainT">';
        html += '<div class="message_mainI">';
        html += '<img src="' + data[1] + '" title="' + data[0] + '" onerror="this.src=\'' + data[9] + '\'" width="100" height="124" />';
        html += '</div> ';
        html += '<div class="message_main_text">';
        html += '<p><label>Rating:</label>' + data[2] + '<span>' + data[3] + '</span></p>';
        html += '<p><label>Genres:</label>' + data[4] + '</p>';
        html += '<p><label>Author:</label>' + data[5] + '</p>';
        html += '<p><label>Released:</label>' + data[6] + '</p>';
        html += '<p><label>Rank:</label>' + data[7] + '</p>';
        html += '</div>';
        html += '</div>';
        html += '<div class="message_mainB"><span>Summary:</span>' + data[8] + '</div>';
        html += '</div>';
    }
    $('#tooltip'+i).html(html);
    $('#tooltip'+i).show();
}

function add_tooltips(){
    var manga_list_dl = document.getElementsByTagName('dl');
    for (i=0;i<=manga_list_dl.length-1;i++){
        manga_list_dl[i].innerHTML += "<div id=\"tooltip"+i+"\" style=\"border: 2px solid black\">";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function print_loop(manga_links){
    for(i=0;i<=manga_links.length-1;i++){
        await sleep(delay);
        $.post('/ajax/series.php', {
            'name': manga_links[i].rel
        }, function (data) {
            popupinfo2(data,i-1);
        }, "json");
    }
}

function add_css(){
    //fix later
text="<style>"+
     ".manga_updates a{"+
     "    position:relative;"+
     "    left:50%;"+
     "    position:absolute;"+
     "    background-color:white;"+
     "    border:2px solid black;"+
     "}"+
     "</style>";
    $('head').append(text);
}

(function() {
    window.onload = async function () { await sleep(2000); }
    var manga_links=[],stuff,i,j=0,links = document.getElementsByTagName('a');
    add_css();
    for (i=0;i<=links.length-1;i++){
        if (links[i].className == "manga_info"){
            manga_links[j]=links[i];
            j+=1;
            //console.log(i," - ",links[i].className);
        }
    }
    add_tooltips();
    print_loop(manga_links);
    //for(i=0;i<=manga_links.length-1;i++){
})();

