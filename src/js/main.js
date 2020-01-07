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

		startMenu.append(startBtn);

		body.appendChild(startMenu);
	},
	startProgram: function(jData,startMenu){
		return function(){
			var toolHolder = createEle("div");

			startMenu.remove();

			toolHolder.className = "toolHolder";
			for (var i = 0; i < toolCount; i++) {
				var tools = createEle("button");

				tools.innerHTML = toolNames[i];
				tools.onclick = toolFuncs[i];

				toolHolder.appendChild(tools);

			}

			body.appendChild(toolHolder);
		}
	}
};

window.onload = function(){
	myUI.init();
};