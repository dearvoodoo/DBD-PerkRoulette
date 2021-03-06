﻿﻿var S_or_K = "Killers"
var lang = "fr"
var Perk_char = "Tueur"

if (localStorage.hasOwnProperty('load_time_K') === false) {
    localStorage.setItem('load_time_K', new Date())
	
		loadAPI();

    setTimeout(function(){
			localStorage.removeItem('results');
    ActiveAll();
    UnActiveAll();
			getSurvivors();
    }, 2000);
} else {
    var startDate = localStorage.getItem('load_time_K');
    var endDate = new Date();
    var start = new Date(startDate);
    var end = new Date(endDate);
    var diffDate = (end - start) / (1000 * 60 * 60 * 24);
    var days = Math.round(diffDate);

    if (days >= 1) {
        // S'il y a plus de 24h
        // Call a nouveau l'API

        // Obtenir la liste des survivants ou killers
        loadAPI();

        localStorage.setItem('load_time_K', new Date())

        setTimeout(function(){
					localStorage.removeItem('results');
    ActiveAll();
    UnActiveAll();
					getSurvivors();
        }, 2000);
    } else {
        console.log("Je call pas l'API car cela ne fait pas plus de 24h")

			localStorage.removeItem('results');
    ActiveAll();
    UnActiveAll();
			getSurvivors();
    }
}

function loadAPI() {
    if (localStorage.getItem("isPTB") === "true") {
        $.getJSON( "https://dbd-api.herokuapp.com/killers", function(dataSurvivor) {
            localStorage.setItem( 'dataKiller', JSON.stringify(dataSurvivor) )
        });
    } else {
        $.getJSON( "https://dbd-api.herokuapp.com/killers?is_ptb=false", function(dataSurvivor) {
            localStorage.setItem( 'dataKiller', JSON.stringify(dataSurvivor) )
        });
    }

    if (localStorage.getItem("isPTB") === "true") {
        $.getJSON( "https://dbd-api.herokuapp.com/perks?lang=" + lang + "&role=" + Perk_char, function(dataCharacters) {
            localStorage.setItem( 'dataCharacters_K', JSON.stringify(dataCharacters) )
        });
    } else {
        $.getJSON( "https://dbd-api.herokuapp.com/perks?lang=" + lang + "&role=" + Perk_char + "&is_ptb=false", function(dataCharacters) {
            localStorage.setItem( 'dataCharacters_K', JSON.stringify(dataCharacters) )
        });
    }

	checkVersion()
	$.getJSON("https://cdn.jsdelivr.net/gh/dearvoodoo/dbd/version.json", function(dataVersion) {
		localStorage.setItem("API-Version", dataVersion.api)
    });
    location.reload();
}

function getSurvivors() {
    $("#place-for-survivor").empty();
    var dataSurvivor = JSON.parse(localStorage.getItem('dataKiller'));
	$("#place-for-survivor").append("<div class=\"col-lg-2 col-md-3 col-xl-3 col-4 pb-2\"><div class=\"bg-dark perso-box\"><img class=\"perso mx-auto d-block\" id=\"All\" src=\"imgs/characters/All.png\" onclick=\"filter(this.id)\" data-selected=\"false\" style=\"filter:drop-shadow(0px 0px 5px #000) grayscale(0.5) opacity(0.5)\"></img><p class=\"text-center pt-2\" style=\"padding: 1px;\">Commune</p></div></div>")
	$.each( dataSurvivor, function(s, survivor ) {
		$("#place-for-survivor").append("<div class=\"col-lg-2 col-md-3 col-xl-3 col-4 pb-2\"><div class=\"bg-dark perso-box\"><img class=\"perso mx-auto d-block\" id=\""+ survivor.name_tag +"\" src=\"imgs/characters/"+ survivor.name_tag +".png\" onclick=\"filter(this.id)\" data-selected=\"false\" style=\"filter:drop-shadow(0px 0px 5px #000) grayscale(0.5) opacity(0.5)\"></img><p class=\"text-center pt-2\" style=\"padding: 1px;\">"+survivor.name+"</p></div></div>")
	});
};

var results = [];

Array.prototype.remByVal = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
}

function filter(id) {
	var image = document.getElementById(id)
    var selected = image.dataset.selected
	if (selected === "false") {
		$("#"+id).css("filter", "drop-shadow(0 0 0 #6c757d) grayscale(0)");
		$("#"+id).parents('.perso-box').css("border", "1px solid #2cff6b");
        image.dataset.selected = true;
        var dataCharacters = JSON.parse(localStorage.getItem('dataCharacters_K'));
        var searchField = "name_tag";
        var searchVal = id;
        for (var i=0 ; i < dataCharacters.length ; i++) {
            if (dataCharacters[i][searchField] == searchVal) {
                results.push(dataCharacters[i].perk_tag);
            }
        }
	} else {
		$("#"+id).css("filter", "drop-shadow(0px 0px 5px #000) grayscale(0.5) opacity(0.5)");
		$("#"+id).parents('.perso-box').css("border", "");
		//$('.perso-box:hover').css("border", "border: 1px solid #2c5dff;");
		image.dataset.selected = false;
		var dataCharacters = JSON.parse(localStorage.getItem('dataCharacters_K'));
        var searchField = "name_tag";
        var searchVal = id;
        for (var i=0 ; i < dataCharacters.length ; i++) {
            if (dataCharacters[i][searchField] == searchVal) {
                results.remByVal(dataCharacters[i].perk_tag);
            }
        }
    }
    localStorage.setItem('results', JSON.stringify(results))
    console.log(results)
    $("#select-all-btn").prop('disabled', false);
    $("#unselect-all-btn").prop('disabled', false);
};

function ActiveAll() {
	$("img.perso").each(function(i) {
		if (this.dataset.selected == "false") {
			this.dataset.selected = true;
			this.style.filter = "drop-shadow(0 0 0 #6c757d) grayscale(0)"
			$(this).parents('.perso-box').css("border", "1px solid #2cff6b");
			var dataCharacters = JSON.parse(localStorage.getItem('dataCharacters_K'));
            var searchField = "name_tag";
            var searchVal = this.id;
            for (var i=0 ; i < dataCharacters.length ; i++) {
                if (dataCharacters[i][searchField] == searchVal) {
                    results.push(dataCharacters[i].perk_tag);
                }
            }
		}
    });
	$('img.perso-common').each(function(i) {
		if (this.dataset.selected = "false") {
			this.dataset.selected = true;
			this.style.filter = "drop-shadow(0 0 0 #6c757d) grayscale(0)"
			$(this).parents('.perso-box').css("border", "1px solid #2cff6b");
			var dataCharacters = JSON.parse(localStorage.getItem('dataCharacters_K'));
            var searchField = "name_tag";
            var searchVal = this.id;
            for (var i=0 ; i < dataCharacters.length ; i++) {
                if (dataCharacters[i][searchField] == searchVal) {
                    results.push(dataCharacters[i].perk_tag);
                }
            }
		}
    });
    localStorage.setItem('results', JSON.stringify(results))
    console.log(results)
    $("#select-all-btn").prop('disabled', true);
    $("#unselect-all-btn").prop('disabled', false);
};

function UnActiveAll() {
	$("img.perso").each(function(i) {
		if (this.dataset.selected == "true") {
			this.dataset.selected = false;
			this.style.filter = "drop-shadow(0px 0px 5px #000) grayscale(0.5) opacity(0.5)"
			$(this).parents('.perso-box').css("border", "");
			var dataCharacters = JSON.parse(localStorage.getItem('dataCharacters_K'));
            var searchField = "name_tag";
            var searchVal = this.id;
            for (var i=0 ; i < dataCharacters.length ; i++) {
                if (dataCharacters[i][searchField] == searchVal) {
                    results.remByVal(dataCharacters[i].perk_tag);
                }
            }
		}
	});
	$("img.perso-common").each(function(i) {
		if (this.dataset.selected = "true") {
			this.dataset.selected = false;
			this.style.filter = "drop-shadow(0px 0px 5px #000) grayscale(0.5) opacity(0.5)"
			$(this).parents('.perso-box').css("border", "");
			var dataCharacters = JSON.parse(localStorage.getItem('dataCharacters_K'));
            var searchField = "name_tag";
            var searchVal = this.id;
            for (var i=0 ; i < dataCharacters.length ; i++) {
                if (dataCharacters[i][searchField] == searchVal) {
                    results.remByVal(dataCharacters[i].perk_tag);
                }
            }
		}
    });
    localStorage.setItem('results', JSON.stringify(results))
    console.log(results)
    $("#select-all-btn").prop('disabled', false);
    $("#unselect-all-btn").prop('disabled', true);
};

function GetPerks() {
    var SurvivorSelected = JSON.parse(localStorage.getItem('results'));
    SurvivorSelected.sort( function() { return 0.5 - Math.random()});

	var Perk1 = SurvivorSelected[0];
	var Perk2 = SurvivorSelected[1];
	var Perk3 = SurvivorSelected[2];
	var Perk4 = SurvivorSelected[3];

	if (Perk1 === "undefined") {
		var Perk1 = "null"
	}
	if (Perk2 === "undefined") {
		var Perk2 = "null"
	}
	if (Perk3 === "undefined") {
		var Perk3 = "null"
	}
	if (Perk4 === "undefined") {
		var Perk4 = "null"
	}

	localStorage.setItem('Perk1', Perk1)
	localStorage.setItem('Perk2', Perk2)
	localStorage.setItem('Perk3', Perk3)
	localStorage.setItem('Perk4', Perk4)

	var PerkNumero1 = localStorage.getItem("Perk1")
	var PerkNumero2 = localStorage.getItem("Perk2")
	var PerkNumero3 = localStorage.getItem("Perk3")
	var PerkNumero4 = localStorage.getItem("Perk4")

	var searchVal1 = PerkNumero1
	var searchVal2 = PerkNumero2
	var searchVal3 = PerkNumero3
    var searchVal4 = PerkNumero4

    $("#survivor-list").empty();

    var part1 = "<div class=\"row border pt-4 rounded\" style=\"border-color: #2d2d2d!important; background-color: #0a0a0a;\"><div class=\"col text-center\"><img src=\"https://raw.githubusercontent.com/dearvoodoo/dbd/master/"+S_or_K+"/PreviewPortrait/"
	var part2 = ".png\" class=\"rounded mx-auto d-block\" width=\"100px\"><p>"
	var part3 = "</p></div><div class=\"col text-center\"><img class=\"perk\" src=\"https://raw.githubusercontent.com/dearvoodoo/dbd/master/Perks/"
	var part4 = ".png\" class=\"rounded mx-auto d-block\" width=\"110px\"><p>"
	var part5 = "</p></div><div class=\"col-7 text-center my-auto\"><p>"
	var part6 = "</p></div></div>"

    var dataCharacters = JSON.parse(localStorage.getItem('dataCharacters_K'));
    var searchField = "perk_tag";

    for (var i=0 ; i < dataCharacters.length ; i++) {
        if (dataCharacters[i][searchField] == searchVal1) {
            var dataP1 = dataCharacters[i]
            for (var i=0 ; i < dataCharacters.length ; i++) {
                if (dataCharacters[i][searchField] == searchVal2) {
                    var dataP2 = dataCharacters[i]
                    for (var i=0 ; i < dataCharacters.length ; i++) {
                        if (dataCharacters[i][searchField] == searchVal3) {
                            var dataP3 = dataCharacters[i]
                            for (var i=0 ; i < dataCharacters.length ; i++) {
                                if (dataCharacters[i][searchField] == searchVal4) {
                                    var dataP4 = dataCharacters[i]

                                    setTimeout(function(){
                                        $("#survivor-list").append(part1 + dataP1.name_tag + part2 + dataP1.name + part3 + dataP1.perk_tag + part4 + dataP1.perk_name + part5 + dataP1.desc + part6)
                                    }, 100);

                                    setTimeout(function(){
                                        $("#survivor-list").append(part1 + dataP2.name_tag + part2 + dataP2.name + part3 + dataP2.perk_tag + part4 + dataP2.perk_name + part5 + dataP2.desc + part6)
                                    }, 500);

                                    setTimeout(function(){
                                        $("#survivor-list").append(part1 + dataP3.name_tag + part2 + dataP3.name + part3 + dataP3.perk_tag + part4 + dataP3.perk_name + part5 + dataP3.desc + part6)
                                    }, 1000);

                                    setTimeout(function(){
                                        $("#survivor-list").append(part1 + dataP4.name_tag + part2 + dataP4.name + part3 + dataP4.perk_tag + part4 + dataP4.perk_name + part5 + dataP4.desc + part6)
                                    }, 1500);

                                    document.getElementById("ButtonRandom").style.display = "none"
                                    document.getElementById("ButtonReset").style.display = ""
                                    document.getElementById("ButtonRetry").style.display = ""
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

function Retry() {
	GetPerks()
};

function Reset() {
    $('#survivor-list').html('<div class="col text-center"><button type="button" class="btn btn-themed btn-lg m-1" onclick="ActiveAll()" id="select-all-btn">Tout Sélectionner</button><button type="button" class="btn btn-themed btn-lg m-1" onclick="UnActiveAll()" id="unselect-all-btn" disabled>Tout Déselectionner</button><br><div class="custom-control custom-switch"><input type="checkbox" class="custom-control-input" id="PTBSwitch"><label class="custom-control-label" for="PTBSwitch">Contenu du PTB</label></div></div><div class="row d-inline-flex pt-3" id="place-for-survivor"></div>')
    getSurvivors();
    localStorage.removeItem('results');
    ActiveAll();
    UnActiveAll();
    document.getElementById("ButtonRandom").style.display = ""
    document.getElementById("ButtonReset").style.display = "none"
    document.getElementById("ButtonRetry").style.display = "none"
};

checkVersion();
function checkVersion() {
	$.getJSON("https://cdn.jsdelivr.net/gh/dearvoodoo/dbd@latest/version.json", function(dataVersion) {
		console.log(dataVersion.api)
		var link = "https://img.shields.io/badge/"
	
		var gameVersion = link + "GAME-" + dataVersion.game + "-blue"
		$("#game-version").attr("src", gameVersion)
	
		var apiVersion = link + "API-" + dataVersion.api + "-blue"
		$("#api-version").attr("src", apiVersion)
	
		if (localStorage.getItem("API-Version") == dataVersion.api){
			var actuVersionResult = localStorage.getItem("API-Version") + "-green"
		} else {
			var actuVersionResult = localStorage.getItem("API-Version") + "-red"
		}
		var actualApiVersion = link + "Your%20API%20Version-" + actuVersionResult
		$("#actual-api-version").attr("src", actualApiVersion);
	});
}

// Check if PTB is active or not
if (localStorage.hasOwnProperty('isPTB') === false) {
    console.log("Creation de la data pour le PTB")
    localStorage.setItem('isPTB', false)
    $('#PTBSwitch').attr("checked", "");
}

checkPTB()
function checkPTB() {
    console.log("jecheck")
    if (localStorage.getItem('isPTB') === "true") {
        if ($('#PTBSwitch').prop("checked") === false) {
            $('#PTBSwitch').attr("checked", "checked");
        }
    } else {
        if ($('#PTBSwitch').prop("checked") === true) {
            $('#PTBSwitch').attr("checked", "");
        }
    }
}

$('#PTBSwitch').change(function() {
    if (localStorage.getItem("isPTB") === "true") {
        localStorage.setItem('isPTB', false)
        loadAPI()
    } else {
        localStorage.setItem('isPTB', true)
        loadAPI()
    }
});