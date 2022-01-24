//Intital game environment goes here.

//Ask for username, if exists, pull data from DB and update state using records
//If username does not exist in DB, create new entry with following stats:
//Initailize State
// username: As Entered by User
// totalWins: 0
// availWins: 0
// curStage: 0
// winMulti: 1
// multiCost: 25
// numGens: 0
// genCost: 50
// genSpeed: 10
// speedCost: 150
// genStorage: 3
// storageCost: 500
//then update the state with these base stats

//Render Header - WINFALL - TotalWins: x TimePlayed: HH:MM Username: Name

//Render Button that when clicked adds winMulti wins to totalWins and availWins
//Render Available wins under button

//Render level 1 if totalWins is above 20
//Render level 2 if totalWins is above 60
//Render Level 3 if totalWins is above 150
//Render Level 4 if totalWins is above 300

//Render message with Save button at bottom of screen. On click of save, save state to DB