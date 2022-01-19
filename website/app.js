/* Global Variables */
const gButton = document.getElementById('generate');
const gFeelings = document.getElementById('feelings');
const urlP1='https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey='&appid=597e1ba195b16bf7c694b1acc7729db3&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear();
//console.log(newDate);

//functions
async function urlRequest(){
    const zipValue=document.querySelector('#zip').value;
    try{
        const myData= await fetchFromAPI(apiKey,zipValue);
        await postData('postdata',myData);
        // console.log(res2.temp);
        await updatUI();
    }
    catch(error){
        console.log('error',error);
    }
}
//
async function fetchFromAPI(apiKey,zipValue){
    const response=await fetch(urlP1+zipValue+apiKey);
    try{
        const data = await response.json();
        if(data.cod!=200){
            alert(data.message);
            return false;
        }
        const temp= data.main.temp;
        const myData={
        temp: temp,
        feelings: gFeelings.value,
        date: newDate
        }
        return myData;
    }
    catch(error){
        console.log('error',error);
    }
}
//
async function postData (url='',data={}){
    const response=await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    try{
        return response.json();
    }
    catch(error){
        console.log('error',error);
    }
}

//
async function updatUI(){
    const request = await fetch('/getdata');
    const data = await request.json();
    try{
        const dateE =document.getElementById('date');
        const feelingsE =document.getElementById('content');
        const tempE =document.getElementById('temp');
        // console.log(data.temp);
        // dateE.innerHTML=data.feelings;
        // console.log(dateE);
        dateE.innerHTML=`Date: ${data.date}`;
        tempE.innerHTML=`Temp: ${data.temp} °C`;
        feelingsE.innerHTML=`Your Message: ${data.feelings}`;
    }
    catch(error){
        console.log('error',error);
    }
}

//events
gButton.addEventListener('click',urlRequest);