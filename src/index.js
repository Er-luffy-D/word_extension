import { generate } from "random-words";
import { API_KEY } from "./constant";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function translate(word) {
  const ey =API_KEY ; 
  try{
    const genAI = new GoogleGenerativeAI(ey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `give me not more than 2 translation of word ${word} in german with its meaning and elaborate it not more than 20 words, words and don't make it too big and give me in json format `;
    const result = await model.generateContent(prompt);
    
    const translate=document.getElementById("Translate")
    var jsonString = result.response.text();
    jsonString=jsonString.replaceAll("```","").replaceAll("json","")
    jsonString=JSON.parse(jsonString)
    translate.innerHTML =`${jsonString.translations
      .map(
        (word) =>
          `<div class="word-entry">
               <strong>German: </strong>${word.german}<br>
               <strong>Meaning: </strong>${word.meaning}
               </div>`
              )
              .join("")}</b>`;
            }
            catch(error){
              const translate=document.getElementById("Translate")
              translate.innerHTML=`Error, Something is not right`          
            }
}
document.addEventListener("DOMContentLoaded", () => {
  const randomWord = generate();
  document.getElementById("word").innerText = randomWord;
  translate(randomWord);
});
