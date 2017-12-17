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