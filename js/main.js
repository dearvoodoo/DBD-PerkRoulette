﻿$(document).ready(function(){
    /*
        Get All informations from the HTML page
    */
    var perk_icon_1 =      $("#Shrine-Perk-Icon-1");
    var perk_name_1 =      $("#Shrine-Perk-Name-1");
    var perk_price_1 =     $("#Shrine-Perk-Price-1");
    var character_name_1 = $("#Shrine-Character-Name-1");
    var character_face_1 = $("#Shrine-Character-Face-1");

    var perk_icon_2 =      $("#Shrine-Perk-Icon-2");
    var perk_name_2 =      $("#Shrine-Perk-Name-2");
    var perk_price_2 =     $("#Shrine-Perk-Price-2");
    var character_name_2 = $("#Shrine-Character-Name-2");
    var character_face_2 = $("#Shrine-Character-Face-2");

    var perk_icon_3 =      $("#Shrine-Perk-Icon-3");
    var perk_name_3 =      $("#Shrine-Perk-Name-3");
    var perk_price_3 =     $("#Shrine-Perk-Price-3");
    var character_name_3 = $("#Shrine-Character-Name-3");
    var character_face_3 = $("#Shrine-Character-Face-3");

    var perk_icon_4 =      $("#Shrine-Perk-Icon-4");
    var perk_name_4 =      $("#Shrine-Perk-Name-4");
    var perk_price_4 =     $("#Shrine-Perk-Price-4");
    var character_name_4 = $("#Shrine-Character-Name-4");
    var character_face_4 = $("#Shrine-Character-Face-4");


    /*
        Apply Default information from the DBD wiki page to the HTML page
    */

    perk_icon_1.attr('src', "imgs/nothing.png")
    perk_icon_2.attr('src', "imgs/nothing.png")
    perk_icon_3.attr('src', "imgs/nothing.png")
    perk_icon_4.attr('src', "imgs/nothing.png")

    perk_name_1.text("Perk Name")
    perk_name_2.text("Perk Name")
    perk_name_3.text("Perk Name")
    perk_name_4.text("Perk Name")

    perk_price_1.text("???")
    perk_price_2.text("???")
    perk_price_3.text("???")
    perk_price_4.text("???")

    character_name_1.text("Character Name")
    character_name_2.text("Character Name")
    character_name_3.text("Character Name")
    character_name_4.text("Character Name")

    character_face_1.attr('src', "imgs/characters/All.png")
    character_face_2.attr('src', "imgs/characters/All.png")
    character_face_3.attr('src', "imgs/characters/All.png")
    character_face_4.attr('src', "imgs/characters/All.png")


    /*
        Get All informations from the DBD wiki page
    */

    doCORSRequest({
        method: "GET",
        url: "https://deadbydaylight.gamepedia.com/Dead_by_Daylight_Wiki",
        data: "",
    },
    function printResult(data) {
        perk_icon_1.attr('src', $(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(2) > th:nth-child(1) > div > div > a > img").attr("src"))
        perk_icon_2.attr('src', $(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(3) > th:nth-child(1) > div > div > a > img").attr("src"))
        perk_icon_3.attr('src', $(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(4) > th:nth-child(1) > div > div > a > img").attr("src"))
        perk_icon_4.attr('src', $(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(5) > th:nth-child(1) > div > div > a > img").attr("src"))

        perk_name_1.text($(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(2) > td:nth-child(2) > a").text())
        perk_name_2.text($(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(3) > td:nth-child(2) > a").text())
        perk_name_3.text($(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(4) > td:nth-child(2) > a").text())
        perk_name_4.text($(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(5) > td:nth-child(2) > a").text())

        perk_price_1.text($(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(2) > th:nth-child(3) > b > span").text())
        perk_price_2.text($(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(3) > th:nth-child(3) > b > span").text())
        perk_price_3.text($(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(4) > th:nth-child(3) > b > span").text())
        perk_price_4.text($(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(5) > th:nth-child(3) > b > span").text())

        character_name_1.text($(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(2) > td:nth-child(4) > a").text())
        character_name_2.text($(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(3) > td:nth-child(4) > a").text())
        character_name_3.text($(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(4) > td:nth-child(4) > a").text())
        character_name_4.text($(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(5) > td:nth-child(4) > a").text())

        character_face_1.attr('src', $(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(2) > th:nth-child(5) > div > div > a > img").attr("src"))
        character_face_2.attr('src', $(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(3) > th:nth-child(5) > div > div > a > img").attr("src"))
        character_face_3.attr('src', $(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(4) > th:nth-child(5) > div > div > a > img").attr("src"))
        character_face_4.attr('src', $(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(5) > th:nth-child(5) > div > div > a > img").attr("src"))

        $("#shrine-refresh").html($(data).find("#fpflexsection > div:nth-child(1) > center > table > tbody > tr:nth-child(6) > th > big").html())
    });


});

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
    function doCORSRequest(options, printResult) {
        var x = new XMLHttpRequest();
        x.open(options.method, cors_api_url + options.url);
        x.onload = x.onerror = function() {
            printResult(x.responseText || ''
        );
    };
    x.send(options.data);
}