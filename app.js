
async function getLocation() {
    let longitude = document.querySelector('.longitude')
    let latitude = document.querySelector('.latitude')
  
    let response = await fetch('http://api.open-notify.org/iss-now.json');
    let respList = await response.json();
    let iss_pos = await respList.iss_position;
  
    const longitede1 = Number(iss_pos.longitude),
      latitude1 = Number(iss_pos.latitude)
    longitude.innerHTML = `
      longitede: ${longitede1}
      `
    latitude.innerHTML = `
      latitude: ${latitude1}
      `
  
    initMap(longitede1, latitude1)
  }
  
  
  async function getPeoplesList() {
    let list = document.querySelector('.peoples__list');
  
    let response = await fetch('http://api.open-notify.org/astros.json');
    let respList = await response.json();
    let peoplesList = await respList.people;
    let count = 0;
    list.innerHTML = ''
    let peoplesNameList = await peoplesList.forEach(element => {
  
      if (element.craft == "ISS") {
        count++;
        list.innerHTML += `
          <li class="list__item">${element.name}</li>
          `;
      }
  
      document.querySelector('.peoples__count').innerHTML = `Total amount: ${count} people on ISS`
    
          
    });
  
  
  
    
  
  }
  
  function getTime() {
    let time = document.querySelector('.time__time')
    time.innerHTML = ''
    time.append(moment().utc(new Date).format('HH:mm'))
  
  
    let date = document.querySelector('.time__date');
    date.innerHTML = ''
    date.append(moment().format('dddd, Do MMMM YYYY'))
  }
  
  function initMap(longitede = 0, latitude = 0) {
  
    const myLatLng = { lat: latitude, lng: longitede };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatLng,
    });
  
    new google.maps.Marker({
      position: myLatLng,
      map,
    });
  
  }
  getTime()
  getPeoplesList()
  getLocation()
  
  setInterval(() => {
    getTime()
    getPeoplesList()
    getLocation()
  }, 5000)
  
  
  
  
  
  