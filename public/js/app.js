

console.log('Client side js is running')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    message1.textContent='Loading the results'
    message2.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=data.error
        }
        else{
            message1.textContent=data.location
            message2.textContent="The temperature is "+data.temperature+" degree celsius. But it feels like "+data.Feels_like+" degree celsius"
        }
        setTimeout(()=>{
            message1.textContent="Input new Location"
            message2.textContent=""
        }, 5000)
    })
})

})