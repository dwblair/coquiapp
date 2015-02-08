function runfeed(){
    tgName = "openwater" + document.getElementById("instaTag").value;
    var feed = new Instafeed({
	get: 'tagged',
	tagName: tgName,
	clientId: '1ed94341d26548b9b51bd42bfb0dc0e4',
	resolution: 'low_resolution',
	limit: 1,
	template: '<a href="{{link}}"><img src="{{image}}" /></a>'
    });
    feed.run();
};
