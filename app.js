const datePicker = document.querySelector('.calendar>input')
const showDate = document.querySelector('.date')
const showPlanButton = document.querySelector('.calendar>button')
const enterPlan = document.querySelector('.input>input')
const addPlanButton = document.querySelector('.input>button')
const plans = document.querySelector('.plan')
const allButtons = document.querySelectorAll('button')
const timeSpace = document.querySelector('.time')
const settings = document.querySelector('.fa-cog')
const menu = document.querySelector('.menu')
const theme = document.querySelector('.circle');
const body = document.querySelector('body')
//change theme
theme.addEventListener('click',()=>{
    theme.style.left=='20%' ? theme.style.left ='60%' : theme.style.left='20%'
    theme.style.backgroundImage=='url("./img/sun.jfif")' ? theme.style.backgroundImage = 'url("./img/moon.jfif")' : theme.style.backgroundImage ='url("./img/sun.jfif")'
    theme.style.backgroundImage == 'url("./img/moon.jfif")' ? menu.style.backgroundColor = 'black' : menu.style.backgroundColor = 'yellow'
    theme.style.backgroundImage == 'url("./img/moon.jfif")' ? body.style.backgroundColor = 'black' : body.style.backgroundColor = 'rgb(233, 230, 224)'
})

//up-down menu
settings.addEventListener('click',()=>{
    menu.style.top == '-100vh' ? menu.style.top = '0' : menu.style.top = '-100vh'
})
//shows the current time
const getDate = () =>{
    let time = new Date();
    let hour = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    let day = days[time.getDay()]
    hour < 10 ? hour=`0+${hour}` : hour=hour
    minute < 10 ? minute=`0${minute}` : minute=minute
    second < 10 ? second=`0${second}` : second=second
    timeSpace.innerHTML = `${hour}:${minute}:${second}  ${day}`

    setTimeout(getDate,1000)
}
getDate()


//This function takes an array and prints each element of the array to the screen
const showPlans = (plansArray) => {
    for(let i=0 ; i<plansArray.length; i++){
        let plan = document.createElement('div')
        plan.innerHTML = `<div class="pln">${plansArray[i]}<i class="far fa-minus-square"></i>`
        plans.appendChild(plan)
    }
}

//This function prints all the plans on the selected date. If there is no plan that day, "there is no plan" will print.
showPlanButton.addEventListener('click',() =>{ 
    plans.innerHTML = ''
    showDate.innerText = `Choosen Date: ${datePicker.value}`
    let plansArray = JSON.parse(localStorage.getItem(`${datePicker.value}`))
    if(!localStorage.getItem(`${datePicker.value}`) || plansArray.length == 0){
        let noPlan = document.createElement('div')
        noPlan.innerHTML='<div class="noPlan">There Is No Plan</div>'
        plans.appendChild(noPlan)
    }else{
        plans.innerHTML = ''
        let plansArray =JSON.parse(localStorage.getItem(`${datePicker.value}`))
        for(let i = 0; i < plansArray.length; i++){
            let plan = document.createElement('div')
            plan.innerHTML = `<div class="pln">${plansArray[i]}<i class="far fa-minus-square"></i>`
            plans.appendChild(plan);
        }
    }
    
})

//This function prints the added plans to the screen and saves them to the local storage. If there is no plan previously added that day, it first creates a local storage location for that day and then transfers the plans to it.
addPlanButton.addEventListener('click',() => {
    showDate.innerText = `${datePicker.value}`
    plans.innerHTML = ''
    if(!localStorage.getItem(`${datePicker.value}`)){
        let plansArray = []
        plansArray.push(enterPlan.value)
        localStorage.setItem(`${datePicker.value}`,`${JSON.stringify(plansArray)}`)
        let plan = document.createElement('div')
        plan.innerHTML = `<div class="pln">${enterPlan.value}<i class="far fa-minus-square"></i>`
        plans.appendChild(plan)
    }else{
        plans.innerHTML = ""
        let plansArray = JSON.parse(localStorage.getItem(`${datePicker.value}`))
        plansArray.push(enterPlan.value)
        localStorage.setItem(`${datePicker.value}`,`${JSON.stringify(plansArray)}`)
        showPlans(plansArray)
        
    }
})

//clicking the buttons deletes the value inside the input
for(let i =0 ; i<allButtons.length ; i++){
    allButtons[i].addEventListener('click',()=>{
        enterPlan.value = '';
    })
}

//deletes the desired plan from both the screen and local storage
const deletePlan = (event) =>{
    let trush = event.target.className
    if(trush[8] === 'i'){
        plans.innerHTML = ""
        let plansArray = JSON.parse(localStorage.getItem(`${datePicker.value}`))
        plansArray.splice(plansArray.indexOf(event.target.closest('div').innerText),1)
        localStorage.setItem(`${datePicker.value}`,`${JSON.stringify(plansArray)}`)
        showPlans(plansArray)
    }
}
addEventListener('click',deletePlan)






