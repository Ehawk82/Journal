var myUI, jdata, taskArr, dateMark, d = new Date();

dateMark = { 0: {
	time: d,
	lastUpdate: d,
	score: 0,
	taskMark: {},
	dBool: false,
	mood: 5 }
}
taskArr = [
	"Make your bed",
	"Brush your teeth",
	"Feed an animal or plant",
	"Meditate",
	"Eat a balanced meal",
	"Exercise",
	"Listen to some Music",
	"Drink some water",
	"Be productive",
	"Laugh",
	"Interact with another human",/*10*/
	"Go outside",
	"Clean your personal space",
	"Schedule/Review appointments",
	"Make a journal entry",
	"Take a moment to observe existence",
	"Read a book or article",
	"Talk to a friend",
	"Make important phone calls",
	"Watch/Read the weather",
	"Do a wellness scan",/*20*/
	"Commit to spiritual activity",
	"Take medicine(if any)",
	"Find pleasure",
	"Ask someone about their day",
	"Prepare for tommorow",
	"Talk to a family member",
	"Play a game or puzzle",
	"Stargaze/Watch sunset",
	"Study a topic of your choice"
];
/*
	Environmental [*****]
	Emotional [*****]
	Physical [*****]
	Social [*****]
	Intellectual [*****]
	Spiritual [*****]
*/
jdata = {
	timestamp: 0,
	collections: {},
	uBool: false,
	name: "",
	journal: [],
	journalEntries: 0,
	dateGrid: {},
	gridCount: -1,
	steps: 10,
	stepGrid: {
		0: {0: taskArr[0],1: false,2: 17,3:"Environmental"},
		1: {0: taskArr[1],1: false,2: 17,3:"Physical"},
		2: {0: taskArr[2],1: false,2: 40,3:"Environmental"},
		3: {0: taskArr[3],1: false,2: 17,3:"Spiritual"},
		4: {0: taskArr[4],1: false,2: 25,3:"Physical"},
		5: {0: taskArr[5],1: false,2: 40,3:"Physical"},
		6: {0: taskArr[6],1: false,2: 17,3:"Emotional"},
		7: {0: taskArr[7],1: false,2: 50,3:"Physical"},
		8: {0: taskArr[8],1: false,2: 17,3:"Intellectual"},
		9: {0: taskArr[9],1: false,2: 40,3:"Emotional"},
		10: {0: taskArr[10],1: false,2: 25,3:"Social"},
		11: {0: taskArr[11],1: false,2: 35,3:"Environmental"},
		12: {0: taskArr[12],1: false,2: 25,3:"Environmental"},
		13: {0: taskArr[13],1: false,2: 35,3:"Emotional"},
		14: {0: taskArr[14],1: false,2: 25,3:"Emotional"},
		15: {0: taskArr[15],1: false,2: 25,3:"Spiritual"},
		16: {0: taskArr[16],1: false,2: 25,3:"Intellectual"},
		17: {0: taskArr[17],1: false,2: 35,3:"Social"},
		18: {0: taskArr[18],1: false,2: 15,3:"Social"},
		19: {0: taskArr[19],1: false,2: 50,3:"Environmental"},
		20: {0: taskArr[20],1: false,2: 50,3:"Emotional"},
		21: {0: taskArr[21],1: false,2: 35,3:"Spiritual"},
		22: {0: taskArr[22],1: false,2: 35,3:"Physical"},
		23: {0: taskArr[23],1: false,2: 40,3:"Spiritual"},
		24: {0: taskArr[24],1: false,2: 50,3:"Social"},
		25: {0: taskArr[25],1: false,2: 35,3:"Intellectual"},
		26: {0: taskArr[26],1: false,2: 40,3:"Social"},
		27: {0: taskArr[27],1: false,2: 40,3:"Intellectual"},
		28: {0: taskArr[28],1: false,2: 50,3:"Spiritual"},
		29: {0: taskArr[29],1: false,2: 50,3:"Intellectual"}
	},
	dailyRegister: 0,
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
			if(jData.gridCount === -1){
				jData.gridCount = 0;
				jData.dateGrid = dateMark;
				saveLS("jData",jData);
				console.log("should only work once");
			}			
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
				dailyGrid = createEle("div"),
				dailyBlob = createEle("div"),
				dailyList = createEle("div"),
				blobHolder = createEle("div"),
				listHolder = createEle("div"),
				txArea = createEle("textarea"),
				jEntry = createEle("button");

			startMenu.remove();
			var dayMark = d.getDate();

			if (jData.dailyRegister != dayMark){
				jData.score = 0;
			}

			toolHolder.className = "toolHolder";

			var scr = "DAILY SCORE: " + jData.score;

			toolHolder.append(scr);

			var fd = formatDateObject(d);

			txArea.placeholder = fd;
			txArea.onkeyup = myUI.validateText(jData, txArea, jEntry);

			jEntry.innerHTML = "SUBMIT";
			jEntry.disabled = true;
			jEntry.onclick = myUI.runForm(jData, txArea, jEntry, blobHolder);

			blobHolder.className = "blobHolder";
			blobHolder.onload = myUI.updateBlob(jData,blobHolder,d);

			listHolder.className = "listHolder";
			listHolder.onload = myUI.updateList(jData,listHolder,toolHolder);

			var aTH = createEle("div"),
				activeTools = createEle("div");

			aTH.className = "aTH";
			aTH.onload = myUI.updateATH(jData,aTH,d,toolHolder);

			dailyGrid.className = "dailyGrid";
			dailyGrid.append(txArea,jEntry);

			dailyBlob.className = "dailyBlob";
			dailyBlob.append(blobHolder);

			dailyList.className = "dailyList";
			dailyList.append(listHolder);

			activeTools.className = "activeTools";
			activeTools.append(aTH);

			homePage.className = "homePage";
			homePage.append(activeTools,dailyGrid,dailyBlob,dailyList,);

			body.append(toolHolder,homePage);

			setTimeout(function(){
				makeFull(toolHolder);
				makeFull(homePage);
			},100);
		}
	},
	updateATH: function(jData,aTH,d,toolHolder){
		var archive = createEle("button"),
			toolPref = createEle("button"),
			goalAsset = createEle("button");

		archive.innerHTML = "📔";
		archive.className = "aTButtons";
		archive.setAttribute("data-index",1);
		archive.onclick = myUI.runATH(jData,aTH,d,toolHolder,archive);

		toolPref.innerHTML = "⚙️";
		toolPref.className = "aTButtons";
		toolPref.setAttribute("data-index",2);
		toolPref.onclick = myUI.runATH(jData,aTH,d,toolHolder,toolPref);

		goalAsset.innerHTML = "⭐";
		goalAsset.className = "aTButtons";
		goalAsset.setAttribute("data-index",3);
		goalAsset.onclick = myUI.runATH(jData,aTH,d,toolHolder,goalAsset);

		aTH.append(archive,toolPref,goalAsset);
	},
	runATH: function(jData,aTH,d,toolHolder,x){
		return function(){
			var y = x.getAttribute("data-index"),
				blokker = createEle("div"),
				xOut = createEle("button"),
				pageData = createEle("div");

			pageData.className = "pageData";
			pageData.onload = myUI.evalATH(jData,aTH,d,toolHolder,x,y,blokker,pageData);

			blokker.className = "blokker";
			blokker.append(xOut,pageData);

			xOut.innerHTML = "X";
			xOut.className = "xOut";
			xOut.onclick = function(){ return blokker.remove(); };

			body.append(blokker);
		}
	},
	evalATH: function(jData,aTH,d,toolHolder,x,y,blokker,pageData){
		var header = createEle("h4"), ex, goto;

		if(y === "1"){
			ex = "Archive";
			goto = myUI.gotoArchive(jData,aTH,d,toolHolder,x,y,blokker,pageData);
		}
		if(y === "2"){
			ex = "Settings";
			goto = myUI.gotoSettings(jData,aTH,d,toolHolder,x,y,blokker,pageData);
		}
		if(y === "3"){
			ex = "Goals";
			goto = myUI.gotoGoals(jData,aTH,d,toolHolder,x,y,blokker,pageData);
		}

		header.innerHTML = ex;
		header.onload = goto;
		
		blokker.append(header);
	},
	gotoArchive:function(jData,aTH,d,toolHolder,x,y,blokker,pageData){
		var aHolder = createEle("div"),
			theArchive = createEle("div");

		theArchive.className = "theArchive";

		for (var i = 0; i < jData.gridCount + 1; i++) {
			var elems = createEle("p");
			var fTime = formatDateObject(jData.dateGrid[i].time);
			elems.innerHTML = fTime;

			theArchive.append(elems);
		}

		aHolder.className = "aHolder";
		aHolder.append(theArchive);

		pageData.append(aHolder);
	},
	gotoSettings:function(jData,aTH,d,toolHolder,x,y,blokker,pageData){
		var sHolder = createEle("div"),
			buttonHolder = createEle("div");

			var clrBtn = createEle("button");

			clrBtn.className = "buttons";
			clrBtn.innerHTML = "CLEAR ALL";
			clrBtn.onclick = myUI.clearWarn(jData);

			buttonHolder.className = "buttonHolder";
			buttonHolder.append(clrBtn);

			sHolder.className = "sHolder";
			sHolder.append(buttonHolder);

			pageData.append(sHolder);
	},
	clearWarn: function(jData){
		return function(){
			var warnPage = createEle("div"),
				xOut = createEle("span"),
				pQ = createEle("p"),
				yBtn = createEle("button");

			xOut.innerHTML = "X";
			xOut.className = "xOut";
			xOut.onclick = function(){ return warnPage.remove() };

			pQ.innerHTML = "YOU WISH TO CLEAR ALL DATA FOR THIS PROGRAM?<br/>";

			yBtn.innerHTML = "🗑️";
			yBtn.onclick = myUI.clearHistory(jData);

			warnPage.className = "warnPage";
			warnPage.append(xOut,pQ,yBtn);

			body.append(warnPage);
		}
	},
	clearHistory: function(jData){ 
		return function(){
			localStorage.removeItem("jData");
			setTimeout(function(){
				location.reload();
			},1);
		}
	},
	gotoGoals:function(jData,aTH,d,toolHolder,x,y,blokker,pageData){
		var gHolder = createEle("div"),
			blckHoldBtn = createEle("button");

			blckHoldBtn.innerHTML = "🕳️";
			blckHoldBtn.onclick = myUI.launchBlackHole(jData,gHolder);

			gHolder.className = "gHolder";
			gHolder.append(blckHoldBtn);

			pageData.append(gHolder);
	},
	launchBlackHole: function(jData,gHolder){
		return function(){
			gHolder.innerHTML = "";
			var space = createEle("div"),
				hole = createEle("div");

			hole.className = "hole";

			space.className = "space";
			space.append(hole);

			setTimeout(function(){
				gHolder.append(space);
			},1);
		}
	},
	updateList: function(jData,listHolder,toolHolder){
		var d = new Date();
		var listSection = createEle("div"),
		    dayMark = d.getDate();
		if (jData.dailyRegister != dayMark){
			for (var t = 0; t < taskArr.length; t++) {
				jData.stepGrid[t][1] = false;
			}
		}

		jData.dailyRegister = dayMark;

		listSection.className = "listSection";

		for (var i = 0; i < taskArr.length; i++) {
			var task = createEle("p");

			task.innerHTML = taskArr[i];
			task.className = "tasks";
			task.setAttribute("data-index", i);

			if(jData.stepGrid[i][1] === false ){
				task.style.background = "#8F99A6";
				task.onclick = myUI.listSelection(jData,task,i,toolHolder);
			} else {
				task.style.background = "lightgrey";
				task.innerHTML += "<span class='taskMark' data-index='"+ i +"' onclick='myUI.removeCheck(this)'>✔️</span>";
				task.onclick = null;
			}

			listSection.append(task);
		}

		listHolder.append(listSection);

		saveLS("jData", jData);
	},
	removeCheck: function(x){
		var jData = parseLS("jData"),
			listHolder = bySel(".listHolder"),
			task = x.parentNode;
			toolHolder = bySel(".toolHolder_full");
		
		var i = x.getAttribute("data-index");

		jData.stepGrid[i][1] = false;
		jData.score = jData.score - jData.stepGrid[i][2];

		x.remove();
		task.style.background = "#8F99A6";

		toolHolder.innerHTML = "DAILY SCORE: " + jData.score;
		listHolder.innerHTML = "";
		setTimeout(function(){
			saveLS("jData",jData);
			myUI.updateList(jData,listHolder,toolHolder);
		},1);
	},
	listSelection: function(jData,task,i,toolHolder){
		return function(){
			var t= jData.stepGrid[i],
				tsk = t[0],
				tskBool = t[1];

			task.style.background = "lightgrey";
			task.onclick = null;
			task.innerHTML += "<span class='taskMark' data-index='"+ i +"' onclick='myUI.removeCheck(this)'>✔️</span>";

			jData.score = jData.score + jData.stepGrid[i][2];
			jData.stepGrid[i][1] = true;
			var toolHolder = bySel(".toolHolder_full");
			toolHolder.innerHTML = "DAILY SCORE: " + jData.score;
			setTimeout(function(){
				saveLS("jData", jData);
			},2);
		}
	},
	updateBlob: function(jData,blobHolder){
		if(jData.journalEntries === 0){
			blobHolder.append("There are no entries. Use the text area to log an entry");
		}
		for (var i = 0; i < jData.journalEntries; i++) {
			var bObj = createEle("p"),
				jDate = jData.journal[i].entryID,
				label = createEle("div");

		var fd = formatDateObject(jDate);

			label.innerHTML = fd;
			label.className = "labels";

			bObj.className = "bObj";
			bObj.style.opacity = 0;
			bObj.onclick = myUI.getData(jData,bObj,i,label,fd);
			bObj.style.transitionDelay = i+"0ms";
			bObj.append(label);

			blobHolder.append(bObj);
		}
		myUI.reverseList(blobHolder);

		setTimeout(function(){
			for (var k = 0; k < jData.journalEntries; k++) {
				var bH = blobHolder.childNodes;
				bH[k].style.opacity = 1;
			} 
		},666);
	},
	getData: function(jData, bObj, i, label,fd){
		return function(){
			var lnth = myHeight() - 80,
				wdth = myWidth() - 20;

			var pattern = "<div style='position:fixed;top:0;left:0;background:black;height:100%;width:100%;'><h3 style='text-align:center;margin:5px;background:silver;'>"+ label.innerHTML +"</h3>";
				pattern += "<p style='padding:5px 50px;background:silver;height:90%;margin:5px;'>"+ jData.journal[i].content+ "</p></div>";

			var popup = window.open("","msg", "width="+wdth+",height="+lnth+"", "_top");
			var alrt = "Preparing to close window for entry date: " + fd + "!";

			if(popup.document.body.innerHTML != ""){
				popup.onbeforeunload = function(e){
				e.preventDefault();

				popup.close;
			}
				var popup = window.open("","msg", "width=600,height=800", "_top");

				return popup.document.write(pattern),
					   popup.onblur = function(){
						alert(alrt);
					   		popup.close();
					   };
			} else {
				return popup.document.write(pattern),
						popup.onblur = function(){
						alert(alrt);
					   		popup.close();
					   };
			}
		}
	},
	reverseList: function(blobHolder){
		var blobC = blobHolder.childNodes;
		
		setTimeout(function(){
			for (var i = 0; i < blobC.length; i++){
	        	var blobCC = blobC[i].childNodes;
	        	for (var k = 0; k < blobCC.length; k++) {
					blobHolder.insertBefore(blobC[i], blobHolder.firstChild);
	        	}
	    	}
    	}, 200);
	},
	validateText: function(jData, txArea, jEntry){
		return function() {
			var tx = txArea.value.trim();

			if(tx === ""){
				jEntry.disabled = true;
			}else{
				jEntry.disabled = false;
			}
		}
	},
	runForm: function(jData, txArea, jEntry, blobHolder){
		return function(){
			var d = new Date();
			var jj = jData.journal,
				tx = txArea.value.trim(),
				je = jData.journalEntries + 1,
				jd = JSON.stringify(jData),
				ts = d.getTime();
				var tX = tx.replace(/[\n\r]/g, "<br/>");

				var arr = [ 
					je = {
						"entryID": ts,
						"content": tX
					}
				];
			Array.prototype.push.apply(jj, arr);

			jData.journal = jj;

			jData.journalEntries++;
			
			saveLS("jData", jData);

			txArea.value = "";
			jEntry.disabled = true;
			blobHolder.innerHTML = " ";
			myUI.updateBlob(jData,blobHolder,d);
		};
	},
	invokeDownload: function(jd,ts){
		var file = new File([jd], "jData_" + ts + ".txt", {type: "text/plain;charset=utf-6"});

		saveAs(file);
	},
	evalSize: function(){
		console.log("full");
	}
};

window.onload = function(){
	myUI.init();
};