// Initial variable common
const generate = document.getElementById("generate");
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
let date = new Date();
let newDate = date.getMonth() + 1 + '.' + date.getDate() + '.' + date.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=ef246b74d66db970baa8812473f75cf7&units=imperial';

// Elemement response
const dateElm = document.getElementById('date').innerHTML;
const tempElm = document.getElementById('temp').innerHTML;
const contentElm = document.getElementById('content').innerHTML;
const cityElm = document.getElementById('city').innerHTML;
const countryElm = document.getElementById('country').innerHTML;
const weatherElm = document.getElementById('weather').innerHTML;

// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", (e)=> {
    e.preventDefault();
    //fetch the url and get the data the needs to be sliced
	let apiURL = `${baseURL}${zip.value}${apiKey}`;
    getApiData(apiURL).then((data)=> {
		//get the info we want from the coming data of the weather
		projectData(data).then((info)=> {
			//post the data to a url called "/add" 
			postData("/add", info).then((data)=> {
				//retrieve the data sent to the server from "/add" post 
				retrieveData("/all");
			});
		});
    });
});

/* Function called by event listener */


/* Function to GET Web API Data*/
const getApiData = async (apiURL)=> {

	const res = await fetch(apiURL);
	try {
		const data = await res.json();
		console.log(data)
		return data;
	} catch(error) {
		console.log("error", error);
		// appropriately handle the error
  }
}

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        return await response.json();
    } catch (e) {
        console.log(e.message);
    }
};

const retrieveData = async (url = '') => { 
	const request = await fetch(url);
	try {
		const allData = await request.json();
		dateElm = allData.date;
		tempElm = allData.temp;
		contentElm = allData.content;
		cityElm = allData.city;
		countryElm = allData.country;
		weatherElm = allData.weather;
	}
	catch(error) {
		console.log("error", error);
		// appropriately handle the error
	}
}

/* Function to GET info Weather basic */
const projectData = async(data)=> {
    try {
        if (data.cod != 200) {
            return data;
        }
		const info = {
			date: newDate,
			temp: Math.round(data.main.temp),
			content: feelings.value,
			city: data.name,
			country: data.sys.country,
			weather: data.weather[0].description
		};
		return info;
    } catch(e) {
        console.log(e);
    }
};
