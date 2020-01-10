var myUI, jdata, toolNames, toolFuncs, toolCount = 2;

toolNames = ["⬜", "◻️"];

toolFuncs = [ openFullscreen(), closeFullScreen()];

jdata = {
	timestamp: 0,
	collections: {},
	uBool: false,
	name: "",
	journal: {},
	dateGrid: {},
	steps: 10,
	mood: 5,
	goals: {},
	risks: {},
	score: 0
};

myUI = {
	init: function(){
		var jData = parseLS("jData");
		if(!jData || jData === null) {
			LSinit("jData", jdata);
			location.reload();
		} else {
			myUI.mainLoadout(jData);
		}
	},
	mainLoadout: function(jData){
		var startMenu = createEle("div"),
			startBtn = createEle("button");

		startBtn.innerHTML = "▶️";
		startBtn.onclick = myUI.startProgram(jData,startMenu);

		startMenu.className = "startMenu";
		startMenu.append(startBtn);

		body.appendChild(startMenu);

		setTimeout(function(){
			makeFull(startMenu);
		},100);
	},
	startProgram: function(jData,startMenu){
		return function(){
			var toolHolder = createEle("div"),
				homePage = createEle("div");

			startMenu.remove();

			toolHolder.className = "toolHolder";

			for (var i = 0; i < toolCount; i++) {
				var tools = createEle("button");

				tools.innerHTML = toolNames[i];
				tools.onclick = toolFuncs[i];

				toolHolder.appendChild(tools);
			}

			homePage.innerHTML = "text and stuff";
			homePage.className = "homePage";

			body.append(toolHolder,homePage);

			setTimeout(function(){
				makeFull(toolHolder);
				makeFull(homePage);
			},100);
		}
	}
};

window.onload = function(){
	myUI.init();
};