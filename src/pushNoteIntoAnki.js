var localhostUrl = "http://localhost:8765/";

function postNoteToAnki() {
    var front = $('#front').val();
    var back = $('#back').val();
    var audioUrl = $('#playSound').attr("href");
    var lastSlash = audioUrl.lastIndexOf("/");
    var filename = audioUrl.substr(lastSlash + 1, audioUrl.length - 1 - lastSlash);
    var deckName = $('#deck').find(":selected").text();
    var addNote =
    {
        "action": "addNote",
        "version": 5,
        "params": {
            "note": {
                "deckName":deckName,
                "modelName": "Basic",
                "fields": {
                    "Front": front,
                    "Back": back + "[sound:"+ filename +"]"
                },
                "tags": [
                    "crawled"
                ],
                "audio": {
                    "url": audioUrl,
                    "filename": filename,
                    "fields": "Back"
                }
            }
        }
    }
    var addNoteJson = JSON.stringify(addNote);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", localhostUrl ,false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(addNoteJson);
    var response = JSON.parse(xhttp.responseText);
    if(response["result"] == null)
        alert("An error occured: " + response["error"]);
}

function populateDecksOptions(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", localhostUrl ,false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ "action": "deckNames", "version": 5}));
    var response = JSON.parse(xhttp.responseText);
    if(response["result"] == null){
        alert("An error occured: " + response["error"]);
        return;
    }

    var select = document.getElementById("deck"); 
    var options = response["result"];
    
    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

document.getElementById("push").addEventListener('click', postNoteToAnki);

window.onload = function() {
    populateDecksOptions();
};