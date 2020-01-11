var myUI, jdata;


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
				homePage = createEle("div"),
				ofs = createEle("button");
				cfs = createEle("button");

			startMenu.remove();

			toolHolder.className = "toolHolder";

			ofs.innerHTML = "⬜";
		    ofs.onclick = openFullscreen(ofs,cfs);
		    ofs.disabled = false;

		    cfs.innerHTML = "◻️";
		    cfs.onclick = closeFullScreen(cfs,ofs);
		    cfs.disabled = true;

			toolHolder.append(ofs,cfs);

			homePage.innerHTML = "text and stuff";
			homePage.className = "homePage";

			body.append(toolHolder,homePage);

			setTimeout(function(){
				makeFull(toolHolder);
				makeFull(homePage);
			},100);
		}
	},
	evalSize: function(){
		console.log("full");
	}
};

window.onload = function(){
	myUI.init();
};