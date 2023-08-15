const url = "https://wagon-garage-api.herokuapp.com/"
const garage = 'parking'
// 1. GET ALL THE CARS FROM API
const fetchAllCars = () => {
  fetch(`${url}${garage}/cars`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      // 2. DISPLAY ALL THE CARS
      // 2.1 SELECT THE LIST
      const carsList = document.querySelector('.cars-list')
      carsList.innerText = ''
      // 2.2 insert inside the list our cars in a good fashion
      data.forEach((car) => {
        // car is something like this
        // {
          // id: 15748, brand: 'Lamborghini', model: 'Gallardo', plate: '123MM56', owner: 'mcgovern', ...
        // }
        const carHTML = `<div class="car">
        <div class="car-image">
          <img src="http://loremflickr.com/280/280/${car.brand}${car.model}" />
        </div>
        <div class="car-info">
          <h4>${car.brand} ${car.model}</h4>
          <p><strong>Owner:</strong> ${car.owner}</p>
          <p><strong>Plate:</strong> ${car.plate}</p>
        </div>
      </div>`
        carsList.insertAdjacentHTML('afterbegin', carHTML)
      });
    });
}

const createCar = (event) => {
  event.preventDefault();
  // console.log(event.currentTarget);
  const formData = new FormData(event.currentTarget);
  const newCar = Object.fromEntries(formData);
  // console.log(newCar);
  const carInfo = {
    method: 'POST',
    headers: { "Content-Type": 'application/json' },
    body: JSON.stringify(newCar)
  };
  // 3. DO A POST REQUEST
  fetch(`${url}${garage}/cars`, carInfo)
    .then(response => response.json())
    .then((data) => {
      fetchAllCars();
    })
  event.currentTarget.reset();
}

// 1. SELECT THE FORM TAG
const form = document.querySelector('.car-form');
// 2. ADD AN EVENT LISTENER TO THE SUBMIT EVENT
form.addEventListener('submit', createCar);


// GET ALL CARS ON FIRST PAGE LOAD
fetchAllCars();
