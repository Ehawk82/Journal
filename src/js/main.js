var myUI, jdata;

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
				dailyGrid = createEle("div"),
				dailyBlob = createEle("div"),
				blobHolder = createEle("div"),
				txArea = createEle("textarea"),
				jEntry = createEle("button");

			startMenu.remove();

			toolHolder.className = "toolHolder";

			//toolHolder.append("tools");

			var fd = formatDateObject(d);

			txArea.placeholder = fd;
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
				label = createEle("div");

		var fd = formatDateObject(jDate);

			label.innerHTML = fd;
			label.className = "labels";

			bObj.className = "bObj";
			bObj.style.opacity = 0;
			bObj.onclick = myUI.getData(jData, bObj, i, label);
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
	getData: function(jData, bObj, i, label){
		return function(){
			var pattern = "<div style='position:fixed;top:0;left:0;background:black;height:100%;width:100%;'><h3 style='text-align:center;margin:5px;background:silver;'>"+ label.innerHTML +"</h3>";
				pattern += "<p style='padding:5px 50px;background:silver;height:90%;margin:5px;'>"+ jData.journal[i].content+ "</p></div>";

			var popup = window.open("","msg", "width=600,height=800", "_self");

			if(popup.document.body.innerHTML != ""){
				popup.onbeforeunload = function(e){
				e.preventDefault();

				popup.close();
			}
				var popup = window.open("","msg", "width=600,height=800", "_self");

				return popup.document.write(pattern);
			} else {
				return popup.document.write(pattern),
					   popup.onblur = popup.close;
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