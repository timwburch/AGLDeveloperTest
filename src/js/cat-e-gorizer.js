
const catHerder = (endpoint) => {
   fetch(endpoint).then((response) => {
     if(response.ok) {
       return response.json();
     }
     throw new Error('Could not fetch cats...');
   }).then((data) => {
     console.log(data);
   }).catch((error) => {
     console.log('There was a problem fetching the cats: ' + error.message);
   });
}
