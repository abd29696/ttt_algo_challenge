var writers = [];
var flags = [];
var happinessIndex = [];
var totalHappinessIndex;
var writerCheck = '';
var writerCheckPublished = '';
var publishQueue = [];
var dailyTaleLimit = 0;
var publish_date = 1;
var sortedData = data;
var listOfTales = [];
var listofWriters = [];
var talesPublished = [];
var talePublishDate = 0;
var undefinedCount = 0;
var w = 0;
var t = 0;
var authorCheck;
var taleCheck;
var limitDaily = 0;
var listOfTalesPublished = [];
var listofWritersPublished = [];
var totalScheduleDays = 30; //schedule for a month
var allKeys = [];
var allValues = [];

//distinctWriters();
sortedData.sort(GetSortOrder("writerid"));
keyValuePairWriters();
sortLength();
makeSchedule();
talesPublished.splice(0,1);
console.table(talesPublished);
talesPublished.sort(GetSortOrder("writerId"));
keyValuePairPublishedWriters();
listofWriters.sort(GetSortOrder("writerid"));
listofWritersPublished.sort(GetSortOrder("writerId"));
setHappinessIndex();
console.table(happinessIndex);


function keyValuePairWriters(){
	for(i = 0 ; i < sortedData.length; i++){
		if(writerCheck == ''){
			writerCheck = sortedData[i].writerid;
			listOfTales.push(sortedData[i].taleid);
		}
		else if(writerCheck != sortedData[i].writerid){
			var listofWritersTales = {
				writerid: writerCheck,
				tales: listOfTales
			}
			listofWriters.push(listofWritersTales);
			writerCheck = sortedData[i].writerid;
			listOfTales = [];
			listOfTales.push(sortedData[i].taleid);

		}
		else{
			listOfTales.push(sortedData[i].taleid);

		}
		
		if(i == sortedData.length - 1){
			var listofWritersTales = {
				writerid: writerCheck,
				tales: listOfTales
			}
			listofWriters.push(listofWritersTales);
		}

	}
}

function keyValuePairPublishedWriters(){
	for(i = 0 ; i < talesPublished.length; i++){
		if(writerCheckPublished == ''){
			writerCheckPublished = talesPublished[i].writerId;
			listOfTalesPublished.push(talesPublished[i].taleId);
		}
		else if(writerCheckPublished != talesPublished[i].writerId){
			var listofWritersTales = {
				writerId: writerCheckPublished,
				taleId: listOfTalesPublished
			}
			listofWritersPublished.push(listofWritersTales);
			writerCheckPublished = talesPublished[i].writerId;
			listOfTalesPublished = [];
			listOfTalesPublished.push(talesPublished[i].taleId);
		}
		else{
			listOfTalesPublished.push(talesPublished[i].taleId);

		}
		if(i == talesPublished.length - 1){
			var listofWritersTales = {
				writerId: writerCheckPublished,
				taleId: listOfTalesPublished
			}
			listofWritersPublished.push(listofWritersTales);
				
		}

	}
}


function makeSchedule(){
	while( talePublishDate < totalScheduleDays){
			if(talesPublished.length == 0){
				var publish0 = {
					publishDate: undefined,
					writerId: undefined,
					taleId: undefined
				}
				talesPublished.push(publish0);
				var publish = {
					publishDate: talePublishDate + 1,
					writerId: listofWriters[w].writerid,
					taleId: listofWriters[w].tales[t]
				}
				talesPublished.push(publish);
				limitDaily++;
			}
			else{

				authorCheck = listofWriters[w].writerid;
				undefinedCheck();
				const checkWriter = obj => obj.writerId === authorCheck;
				if(talesPublished.some(checkWriter) == true){
					taleCheck = listofWriters[w].tales[t];
					const checkTale = obj => obj.taleId === taleCheck;
					if(talesPublished.some(checkTale) == true){
						if(w < listofWriters.length - 1){
							w++;
						}
						else if(w == listofWriters.length - 1){
							w = 0;
							t++;
						}
					}
					else{
						var publish = {
							publishDate: talePublishDate + 1,
							writerId: listofWriters[w].writerid,
							taleId: listofWriters[w].tales[t]
						}
						talesPublished.push(publish);
						limitDaily++;
						undefinedCount = 0;
					}
				}
				else{
					var publish = {
						publishDate: talePublishDate + 1,
						writerId: listofWriters[w].writerid,
						taleId: listofWriters[w].tales[t]
					}
					talesPublished.push(publish);
					limitDaily++;
					undefinedCount = 0;
				}
			
			}
			if(undefinedCount >= listofWriters.length)
				break;
			
			if(limitDaily == 10){
				talePublishDate++;
				limitDaily = 0;
			}
	}
}

function distinctWriters(){
	for (var i = 0; i < data.length; i++){
		if (flags[data[i].writerid]) continue;
		flags[data[i].writerid] = true;
		writers.push(data[i].writerid);
	}
}

function setHappinessIndex(){
	for(i = 0; i < listofWriters.length; i++){
		var addHappinessIndex = {
			writerId: listofWriters[i].writerid,
			talesSubmitted: listofWriters[i].tales.length,
			talesPublished: listofWritersPublished[i].taleId.length,
			happinessIndex: Math.round((listofWritersPublished[i].taleId.length/listofWriters[i].tales.length)*10),
			//flag: 0,
			
		};
		happinessIndex.push(addHappinessIndex);
	}
}

function GetSortOrder(prop) {  
    return function(a, b) {  
        if (a[prop] > b[prop]) {  
            return 1;  
        } else if (a[prop] < b[prop]) {  
            return -1;  
        }  
        return 0;  
    }  
}

function sortLength() {  
	len = listofWriters.length;
	var swapped; 
	for(i=0; i<len-1; i++){
		swapped = false;
		for(j=0; j<len-i-1; j++){
			if(listofWriters[j].tales.length < listofWriters[j+1].tales.length){
				var temp = listofWriters[j];
				listofWriters[j] = listofWriters[j+1];
				listofWriters[j+1] = temp;
				swapped = true;
			}
		}
		if(swapped == false){
			break;
		}
	}
}

function undefinedCheck(){
	if(typeof listofWriters[w].tales[t] == "undefined"){
		if(w == listofWriters.length - 1){
			w = 0;
			t++;
		}
		else{
			w++;
		}
		undefinedCount++;
	}

}


