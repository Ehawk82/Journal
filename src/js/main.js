var myUI, jdata;

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var day = ["0","1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th","16th","17th","18th","19th","20th","21st","22nd","23rd","24th","25th","26th","27th","28th","29th","30th","31st"];

jdata = {
	timestamp: 0,
	collections: {},
	uBool: false,
	name: "",
	journal: [],
	journalEntries: 0,
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
				dailyBlob = createEle("div"),
				blobHolder = createEle("div"),
				txArea = createEle("textarea"),
				jEntry = createEle("button");

			startMenu.remove();

			toolHolder.className = "toolHolder";

			ofs.innerHTML = "⬜";
		    ofs.onclick = openFullscreen(ofs,cfs);
		    ofs.disabled = false;

		    cfs.innerHTML = "◻️";
		    cfs.onclick = closeFullScreen(cfs,ofs);
		    cfs.disabled = true;

			toolHolder.append(ofs,cfs);

			txArea.placeholder = "Journal entry for " + days[wkDay] + ", " + months[mnths] + " " + day[dy] + ", " + yr;
			txArea.onkeyup = myUI.validateText(jData, txArea, jEntry);

			jEntry.innerHTML = "SUBMIT";
			jEntry.disabled = true;
			jEntry.onclick = myUI.runForm(jData, txArea, jEntry, blobHolder);

			blobHolder.className = "blobHolder";
			blobHolder.onload = myUI.updateBlob(jData,blobHolder,d);

			dailyGrid.className = "dailyGrid";
			dailyGrid.append(txArea,jEntry);

			dailyBlob.className = "dailyBlob";
			dailyBlob.append(blobHolder);

			homePage.className = "homePage";
			homePage.append(dailyGrid,dailyBlob);

			body.append(toolHolder,homePage);

			setTimeout(function(){
				makeFull(toolHolder);
				makeFull(homePage);
			},100);
		}
	},
	updateBlob: function(jData,blobHolder,d){
		for (var i = 0; i < jData.journalEntries; i++) {
			var bObj = createEle("p"),
				jDate = jData.journal[i].entryID,
				date = new Date(jDate),
				hr = date.getHours(),
				min = date.getMinutes(),
				sec = date.getSeconds(),
			    wkDay = date.getDay(),
				mnths = date.getMonth(),
				dy = date.getDate(),
				yr = date.getFullYear(),
				label = createEle("div");

			if (hr   < 10) {hr   = "0"+hr;}
    		if (min < 10) {min = "0"+min;}
    		if (sec < 10) {sec = "0"+sec;}

			label.innerHTML = months[mnths]+" "+day[dy]+", "+yr+" at "+hr+":"+ min +":"+sec;
			label.className = "labels";

			bObj.className = "bObj";
			bObj.style.opacity = 0;
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
	reverseList: function(blobHolder){
		var blobC = blobHolder.childNodes;
		
		setTimeout(function(){
			for (var i = 0; i < blobC.length; i++){
	        	var blobCC = blobC[i].childNodes;
	        	for (var k = 0; k < blobCC.length; k++) {
					blobHolder.insertBefore(blobC[i], blobHolder.firstChild);
	        	}
	    	}
    	},200);
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
				ts = d.getTime(),
				arr = [ 
					je = {
						"entryID": ts,
						"content": tx
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