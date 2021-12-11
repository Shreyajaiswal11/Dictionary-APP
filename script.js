let searchbox=document.getElementById('input');
let btnbox=document.getElementById('btn');
let API_KEY='6ad69e23-ed61-4da7-a351-73ce98c6c135';
let defbox=document.querySelector('.def');
let audiobox= document.querySelector('.audio')
let notFound=document.querySelector('.not-found');

btnbox.addEventListener('click', (e)=>
{
e.preventDefault();
// clear-data
audiobox.innerHTML='';
notFound.innerText='';
defbox.innerText='';

let word=searchbox.value
if(word === ''){
    alert('Word is required');
    return;
}
 getdata(word)

})
// Function to call API
async function getdata(word){
    const response= await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${API_KEY}`);
    let data= await response.json();
    // if data is Empty
    if(!data.length){
        notFound.innerText="No Result Found";
        return;
    }
    // if result is suggestion
    if(typeof data[0] === 'string'){
        let heading = document.createElement('h3');
        heading.innerText='did you mean?'
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggestion=document.createElement('span');
            suggestion.innerText=element;
            suggestion.classList.add('suggested');
            notFound.appendChild(suggestion);
        });
        return;
    }
    let defination=data[0].shortdef[0];
    defbox.innerText=defination;
    
    // for getting audio
    const soundName= data[0].hwi.prs[0].sound.audio;
    if(soundName){
        renderSound(soundName);
    }
    function renderSound(soundName){
     let subfolder=soundName.charAt(0);
     let soundsrc=`https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?${API_KEY}`;
    
    let aud=document.createElement('audio');
    aud.src=soundsrc;
    aud.controls=true;
    audiobox.appendChild(aud);
    console.log(data);
}
}