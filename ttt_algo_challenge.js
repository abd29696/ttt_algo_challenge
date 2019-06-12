var totalHappinessIndex;
var writerCheck;

//import excel file and store it into map -> data from https://docs.google.com/spreadsheets/d/1SysSboswRbeHczH7_yRxQXwdJB7geUfN8L1H4hgWsJE/edit?usp=sharing

var data = [
		{writer_id: 1, tale_id: t_1},
		{writer_id: 2, tale_id: t_2} 
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
var publish_date = 1;
for(i = 0 ; i < data.length(); i++){

	if(dailyTaleLimit != 10){
		if(writerCheck != data[i].writer_id){
			writerCheck = data[i].writer_id;
			var publishDetails = {
						publishDate: publish_date,
						writerId: data[i].writer_id,
						taleId: data[i].tale_id
					};
			publishQueue.push(publishDetails);
			dailyTaleLimit++;
			
			happinessIndex[data[i].writer_id].happinessIndex = happinessIndex[data[i].writer_id].happinessIndex+10; //wrong syntax - find writer and add 10 to it's happiness index
			happinessIndex[data[i].writer_id].flag = 1; //wrong syntax - find writer and make flag 1
		}
	}
	else{
		publishSchedule.push(publishQueue);
		dailyTaleLimit = 0;
		publish_date++; 
		for(j = 0; j < hapinessIndex.length(); j++){
			if(happinessIndex[data[j].writer_id].flag != 1){ // wrong syntax - if flag of writer is 1
				happinessIndex[data[j].writer_id].happinessIndex = happinessIndex[data[j].writer_id].happinessIndex - 1; //wrong syntax - subtract 10 from the happiness index
			}
			else{
				happinessIndex[data[j].writer_id].flag = 0; //wrong syntax - set flag to 0 again
			}
		}

	}	
	

	
}
console.log(publlishSchedule);
			


