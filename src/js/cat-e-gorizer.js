
const fetchPets = (endpoint) => {
   return fetch(endpoint).then((response) => {
      if(response.ok) {
         return response.json();
      }
      throw new Error('Could not fetch pets...');
   }).catch((error) => {
      console.log('There was a problem fetching the pets: ' + error.message);
   });
}

const filterByOwnersGender = (list, gender) => {
   return list.filter((item) =>{
      return item.gender === gender;
   })
};

const filterPetByType = (list,type) => {
   let filteredPets = [];
   list.map((item) => {
      if (!item.hasOwnProperty('pets') || item.pets === null) return false;
      const petsList = item.pets;
      petsList.map((pet) => {
         if (pet.type === type ) filteredPets.push(Object.assign({},
            pet,
            {
               ownerName: item.name,
               ownerAge: item.age,
               ownerGender: item.gender,
            }));
         return pet.type === type;
      });
   });
   return filteredPets;
};

const sortPetsByName = (petA, petB) => {
   const petNameA = petA.name;
   const petNameB = petB.name;
   return (petNameA < petNameB) ? -1 : (petNameA > petNameB) ? 1 : 0;
};

const addCatsToList = (cats, element) => {
   cats.forEach((item, index) => {
      let catItem = document.createElement("li");
      catItem.classList.add('its-a-cat');
      catItem.innerHTML = item.name;
      catItem.dataset.ownerName = item.ownerName;
      catItem.dataset.ownerAge = item.ownerAge;
      catItem.setAttribute('style', 'animation-delay: ' + index * 0.5 + 's');
      element.appendChild(catItem);
   });
}

const CATegorize = () => {
   const endpoint = document.querySelector('.pets-source').value;
   const fetchedPets = fetchPets(endpoint).then((data) => {

      const femaleOwners = filterByOwnersGender(data, 'Female');
      const maleOwners = filterByOwnersGender(data, 'Male');

      let catsWithFemaleOwners = filterPetByType(femaleOwners, 'Cat');
      let catsWithMaleOwners = filterPetByType(maleOwners, 'Cat');

      catsWithFemaleOwners.sort(sortPetsByName);
      catsWithMaleOwners.sort(sortPetsByName);

      const catListHolder = document.querySelector('.cat-egories');
      let catsWithFemaleOwnersList = document.querySelector('.catsWithFemaleOwners');
      let catsWithMaleOwnersList = document.querySelector('.catsWithMaleOwners');

      addCatsToList(catsWithFemaleOwners, catsWithFemaleOwnersList);
      addCatsToList(catsWithMaleOwners, catsWithMaleOwnersList);


   });
};
