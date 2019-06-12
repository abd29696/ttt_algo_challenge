var totalHappinessIndex;
var writerCheck;

//import excel file and store it into map -> data 

var data = [
			{writer_id: w_1, tale_id: t_1},
			{writer_id: w_2, tale_id: t_2}
			];
//sort data according to writer_id

//store all unique writers in an array -> writers

var happinessIndex = [];
for(i = 0; i < writers.length(); i++){
	var addHappinessIndex = {
				writerId: writers[i],
				happinessIndex: 0;
				flag: 0
	};
	happinessIndex.push(addHappinessIndex);
}

var publishSchedule = [];
var publishQueue = [];
var dailyTaleLimit = 0;
var publish_date = 0;
for(i = 0 ; i < data.length(); i++){

	if(dailyTaleLimit != 10){
		if(writerCheck != data[i].writer_id){
			writerCheck = data[i].writer_id;
			publish_date++; 
			var publishDetails = {
						publishDate: publish_date,
						writerId: data[i].writer_id,
						taleId: data[i].tale_id
					};
			publishQueue.push(publishDetails);
			dailyTaleLimit++;
			
			happinessIndex[data[i].writer_id].happinessIndex = happinessIndex[data[i].writer_id].happinessIndex+10;
			happinessIndex[data[i].writer_id].flag = 1;
		}
	}
	else{
		publishSchedule.push(publishQueue);
		dailyTaleLimit = 0;
		for(j = 0; j < hapinessIndex.length(); j++){
			if(happinessIndex[data[j].writer_id].flag != 1){
				happinessIndex[data[j].writer_id].happinessIndex = happinessIndex[data[j].writer_id].happinessIndex - 1;
			}
			else{
				happinessIndex[data[j].writer_id].flag = 0;
			}
		}

	}	
	

	console.log(publishQueue);
}
			


