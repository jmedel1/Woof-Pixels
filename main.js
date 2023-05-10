const dogsList = document.getElementById('dogs-list');
const dogs = [];

// Define displayDogs function
const displayDogs = (dogs) => {
    dogsList.innerHTML = '';
    
    dogs.forEach(dog => {
      const li = document.createElement('li');
      li.textContent = `Name: ${dog.name}, Age: ${dog.age}`;

          // Add a remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove');
    removeBtn.addEventListener('click', () => {
      removeDog(dog.id);
    });
    li.appendChild(removeBtn);

     // Add photo
     if (dog.photoUrl) {
        const img = document.createElement('img');
        img.src = dog.photoUrl;
        li.appendChild(img);
      }
  
      dogsList.appendChild(li);
    });
  }

  // Remove dogs name
const removeDog = (id) => {
    fetch(`http://localhost:3000/dogs/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Unable to remove dog.');
      }
      return response.json();
    })
    .then(data => {
      fetchDogs();
    })
    .catch(error => {
      console.error(error);
    });
  }

  // Fetch dogs data from the server
const fetchDogs = async (sortBy = 'id') => {
    try {
      const response = await fetch(` http://localhost:3000/posts?_sort=${sortBy}`);
      const dogs = await response.json();

      // Parse the age values as numbers before sorting
      dogs.forEach(dog => {
        dog.age = parseInt(dog.age);
      });

         // Sort the dogs by age
         dogs.sort((a, b) => a.age - b.age);
  
         displayDogs(dogs);
       } catch (error) {
         console.error(error);
       }
     };

     // Add sort by age button
const sortByAgeBtn = document.getElementById('sort-by-age-btn');

sortByAgeBtn.addEventListener('click',() => {
  fetchDogs('age');
});

// Add dog button
const addDogBtn = document.getElementById('add-dog-form');

addDogBtn.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the dog name and age from the input fields
    const name = document.getElementById('name-input').value;
    const age = document.getElementById('age-input').value;