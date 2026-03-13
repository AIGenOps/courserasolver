async function solveQuestions(){

const apiKey = document.getElementById("apikey").value;
let questions = document.getElementById("questions").value;
const removeText = document.getElementById("removeText").value;
const output = document.getElementById("output");

if(!apiKey){
alert("Enter API key");
return;
}

// remove text globally
if(removeText){
const regex = new RegExp(removeText,"g");
questions = questions.replace(regex,"");
}

const prompt = `
You will receive MCQ questions.

Return ONLY the correct answer option.

Example output format:
1. B
2. C
3. A

Questions:
${questions}
`;

output.textContent = "Processing...";

try{

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{ text: prompt }
]
}
]
})
}
);

const data = await response.json();

const result = data.candidates[0].content.parts[0].text;

output.textContent = result;

}
catch(e){
output.textContent = "Error: "+e.message;
}

}
