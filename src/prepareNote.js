var localhostUrl = "http://localhost:8765/";

function prepareNote(){
    chrome.tabs.query(
        {active:true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {text: 'get_note'}, processResponse);
    });
}

function processResponse(values) {
    $('#front').val(values["czech"]);
    $('#back').val(values["german"]);
    $('#playSound').attr("href", values["audio"]);
}

document.getElementById("prepareNote").addEventListener('click', prepareNote);

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

window.onload = function() {
    prepareNote();
    populateDecksOptions();
};