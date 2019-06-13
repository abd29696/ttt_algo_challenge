var writers = [];
var flags = [];
var happinessIndex = [];
var totalHappinessIndex;
var writerCheck = '';
var publishQueue = [];
var dailyTaleLimit = 0;
var publish_date = 1;
var sortedData = data;


distinctWriters();

sortedData.sort(GetSortOrder("writerid"));

// var twoDData = [];
// sortedData.forEach(function(object){
//     twoDData.push([object.writerid,object.taleid]);
// });

// var result = sortedData.reduce(function(map, obj) {
//     map[obj.writerid] = obj.taleid;
//     return map;
// }, {});

var listOfTales = [];
var listofWriters = [];

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

}
setHappinessIndex();

var talesPublished = [];
var talePublishDate = 0;
var w = 0;
var t = 0;
var authorCheck;
var taleCheck;
while( talePublishDate < 30){
		if(talesPublished.length == 0){
			var publish = {
				publishDate: talePublishDate,
				writerId: listofWriters[w].writerid,
				taleId: listofWriters[w].tales[t]
			}
			talesPublished.push(publish);
		}
		else{
			authorCheck = listofWriters[w].writerid;
			if(talesPublished.writerId.includes(authorCheck)){
				taleCheck = listofWriters[w].tales[t];
				if(talesPublished.taleId.includes(taleCheck)){
					if(t<listofWriters[w].tales.length){
						t++;
					}
					
				}
				else{
					var publish = {
						publishDate: talePublishDate,
						writerId: listofWriters[w].writerid,
						taleId: listofWriters[w].tales[t]
					}
					talesPublished.push(publish);
					if(t<listofWriters[w].tales.length){
						t++;
					}
				}
			}
			else{
				var publish = {
					publishDate: talePublishDate,
					writerId: listofWriters[w].writerid,
					taleId: listofWriters[w].tales[t]
				}
				talesPublished.push(publish);
				w++;
			}
		
		}
}


for(i = 0 ; i < listofWriters.length; i++){

	if(dailyTaleLimit != 10){
		if(writerCheck != sortedData[i].writerid){
			writerCheck = sortedData[i].writerid;
			var publishDetails = {
						publishDate: publish_date,
						writerId: sortedData[i].writerid,
						taleId: sortedData[i].taleid
					};
			publishQueue.push(publishDetails);
			dailyTaleLimit++;
			
			//happinessIndex[writerCheck].happinessIndex = happinessIndex[sortedData[i].writerid].happinessIndex+1; //wrong syntax - find writer and add 10 to it's happiness index
			//happinessIndex[sortedData[i].writerid].flag = 1; //wrong syntax - find writer and make flag 1
		}
	}
	else{
		dailyTaleLimit = 0;
		publish_date++; 
		// for(j = 0; j < hapinessIndex.length; j++){
		// 	if(happinessIndex[sortedData[j].writerid].flag != 1){ // wrong syntax - if flag of writer is 1
		// 		happinessIndex[sortedData[j].writerid].happinessIndex = happinessIndex[sortedData[j].writerid].happinessIndex - 1; //wrong syntax - subtract 1 from the happiness index
		// 	}
		// 	else{
		// 		happinessIndex[sortedData[j].writerid].flag = 0; //wrong syntax - set flag to 0 again
		// 	}
		// }

	}	
}

function distinctWriters(){
	for (var i = 0; i < data.length; i++){
		if (flags[data[i].writerid]) continue;
		flags[data[i].writerid] = true;
		writers.push(data[i].writerid);
	}
}

// function setHappinessIndex(){
	// for(i = 0; i < writers.length; i++){
		// var addHappinessIndex = {
			// writerId: writers[i],
			// happinessIndex: 0,
			// flag: 0,
		// };
		// happinessIndex.push(addHappinessIndex);
	// }
// }
function setHappinessIndex(){
	for(i = 0; i < listofWriters.length; i++){
		var addHappinessIndex = {
			writerId: listofWriters[i].writerid,
			talesSubmitted: listofWriters[i].tales.length,
			talesPublished: 0,
			happinessIndex: 0,
			flag: 0,
			
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

			


