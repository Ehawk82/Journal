var myUI, jdata;
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var day = ["0","1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th","16th","17th","18th","19th","20th","21st","22nd","23rd","24th","25th","26th","27th","28th","29th","30th","31st"];
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
		var jData = parseLS("jData"),
			d = new Date();

		if(!jData || jData === null) {
			LSinit("jData", jdata);
			location.reload();
		} else {
			myUI.mainLoadout(jData,d);
		}
	},
	mainLoadout: function(jData,d){
		var startMenu = createEle("div"),
			startBtn = createEle("button");

		startBtn.innerHTML = "▶️";
		startBtn.onclick = myUI.startProgram(jData,startMenu,d);

		startMenu.className = "startMenu";
		startMenu.append(startBtn);

		body.appendChild(startMenu);

		setTimeout(function(){
			makeFull(startMenu);
		},100);
	},
	startProgram: function(jData,startMenu,d){
		return function(){
			var wkDay = d.getDay(),
				mnths = d.getMonth(),
				dy = d.getDate(),
				yr = d.getFullYear(); 

			var toolHolder = createEle("div"),
				homePage = createEle("div"),
				ofs = createEle("button"),
				cfs = createEle("button"),
				dailyGrid = createEle("div"),
				txArea = createEle("textarea");

			startMenu.remove();

			toolHolder.className = "toolHolder";

			ofs.innerHTML = "⬜";
		    ofs.onclick = openFullscreen(ofs,cfs);
		    ofs.disabled = false;

		    cfs.innerHTML = "◻️";
		    cfs.onclick = closeFullScreen(cfs,ofs);
		    cfs.disabled = true;

			toolHolder.append(ofs,cfs);

			txArea.placeholder = "Journal entry for " + days[wkDay] + ", " + months[mnths] + " " + day[dy] + ", " + yr + ".";

			dailyGrid.className = "dailyGrid";
			dailyGrid.append(txArea);

			homePage.className = "homePage";
			homePage.append(dailyGrid);

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