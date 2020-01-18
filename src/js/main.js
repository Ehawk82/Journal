var myUI, jdata, taskArr;

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
	"Interact with another human",
	"Go outside",
	"Clean your personal space"
];

jdata = {
	timestamp: 0,
	collections: {},
	uBool: false,
	name: "",
	journal: [],
	journalEntries: 0,
	dateGrid: {},
	steps: 10,
	stepGrid: {
		0: {0: taskArr[0],1: false,2: 10},
		1: {0: taskArr[1],1: false,2: 20},
		2: {0: taskArr[2],1: false,2: 20},
		3: {0: taskArr[3],1: false,2: 10},
		4: {0: taskArr[4],1: false,2: 10},
		5: {0: taskArr[5],1: false,2: 20},
		6: {0: taskArr[6],1: false,2: 10},
		7: {0: taskArr[7],1: false,2: 40},
		8: {0: taskArr[8],1: false,2: 10},
		9: {0: taskArr[9],1: false,2: 20},
		10: {0: taskArr[10],1: false,2: 10},
		11: {0: taskArr[11],1: false,2: 10},
		12: {0: taskArr[12],1: false,2: 10}
	},
	dailyRegister: 0,
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
			listHolder.onload = myUI.updateList(jData,listHolder,d,toolHolder);

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
			homePage.append(dailyGrid,dailyBlob,dailyList,activeTools);

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

		toolPref.innerHTML = "⚙️";
		toolPref.className = "aTButtons";

		goalAsset.innerHTML = "⭐";
		goalAsset.className = "aTButtons";

		aTH.append(archive,toolPref,goalAsset);
	},
	updateList: function(jData,listHolder,d,toolHolder){
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

			if(jData.stepGrid[i][1] === false ){
				task.style.background = "darkgrey";
				task.onclick = myUI.listSelection(jData,task,i,toolHolder);
			} else {
				task.style.background = "lightgrey";
				task.onclick = null;
			}

			listSection.append(task);
		}

		listHolder.append(listSection);

		saveLS("jData", jData);
	},
	listSelection: function(jData,task,i,toolHolder){
		return function(){
			var t= jData.stepGrid[i],
				tsk = t[0],
				tskBool = t[1];

			task.style.background = "lightgrey";
			task.onclick = null;

			jData.score = jData.score + jData.stepGrid[i][2];
			jData.stepGrid[i][1] = true;

			toolHolder.innerHTML = "DAILY SCORE: " + jData.score;

			saveLS("jData", jData);
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
			bObj.onclick = myUI.getData(jData, bObj, i, label,fd);
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
			var alrt = "Preparing to close window for entry date: " + fd + ", if you haven't printed, now is you're chance to do so";

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