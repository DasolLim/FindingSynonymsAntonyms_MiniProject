const fs = require('fs')
const words = require('./words.json');

function findFilePromise (fileName, file){
    let filePromise = new Promise ((resolve, reject) => {
        fs.readFile(fileName, file, (error, word) => {
            if(word){
                resolve(word);
            }else{
                reject(error);
            }
        });
    });
return filePromise;

}
let wordType = {
    type: {
        "Synonyms": 0,
        "Related": 0,
        "Near Antonyms": 0,
        "Antonyms": 0
    }
}   

let healthPromise = findFilePromise("Optimism_and_your_health.txt", "utf8");
healthPromise.then((result) =>{
    let firstText = result.toLowerCase();
    let text = firstText.split(/[\s,.!?\t\n]+/);
    for(let w in words.Antonyms){
        for(let t in text){
            if(text[t].includes(words["Antonyms"][w])){
                wordType.type["Antonyms"]++;
            }
        }
    }
    for(let w in words.Synonyms){
        for(let t in text){
            if(text[t].includes(words["Synonyms"][w])){
                wordType.type["Synonyms"]++;
            }
        }
    }
    for(let w in words['Near Antonyms']){
        for(let t in text){
            if(text[t].includes(words["Near Antonyms"][w])){
                wordType.type["Near Antonyms"]++;
            }
        }
    }
    for(let w in words.Related){
        for(let t in text){
            if(text[t].includes(words["Related"][w])){
                wordType.type["Related"]++;
            }
        }
    }
    fs.writeFile('result.txt', JSON.stringify(wordType.type),()=>{console.log("done")});
}).catch((result) => {console.log(result);});