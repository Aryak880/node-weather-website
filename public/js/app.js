const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value

    messageOne.innerHTML = 'Loading...'
    messageTwo.innerHTML = ''

    fetch(`/weather?address=${location}`).then(res => { 
        res.json().then(data => {
            if(data.error){
                messageOne.innerHTML = 'Error: ' + data.error
                messageTwo.innerHTML = ''

            }else{
                const {clouds, description, feels_like, humidity, placeName, timeZone, windSpeed} = data

                messageOne.innerHTML = ''

                messageTwo.innerHTML = 
                `Place name: ${placeName} <br />
                Feels Like(temp): ${feels_like} <br />
                Humidity: ${humidity} <br />
                Description: ${description} <br />
                Clouds: ${clouds}% <br />
                Wind Speed: ${windSpeed}km/h <br />
                Time Zone: ${timeZone}<br />
                `
            }
                
        })
    })
})

