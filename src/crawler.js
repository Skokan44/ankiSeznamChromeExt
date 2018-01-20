// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    debugger;
    // If the received message has the expected format...
    if (msg.text === 'get_note') {
        var german = $(".notFirst").text();
        var czech = $("#fastMeanings > a:first").text();
        var rod = $(".morf").text();
        var podJm = rod[0] == 'd';
        if(podJm)
            rod = "-" + rod.substr(2,1) + " ";
        else
            rod = ""

        var lang = $(".notFirst").attr('lang');

        var mnc = "";
        if(podJm)
            mnc =  " " + $(".morfLinks span[lang=de]").text();

        var sound = "http://slovnik.seznam.cz" + $("#playsound").attr('href');
        var ret = {
            "czech" : czech,
            "german" : rod + german + mnc,
            "audio" : sound,
            "lang" : lang
        }
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        sendResponse(ret);
    }
});