describe("Cat-e-gorizer", function() {
   const endpoint = 'http://agl-developer-test.azurewebsites.net/people.json';
   const mockData = [{"name":"Bob","gender":"Male","age":23,"pets":[{"name":"Garfield","type":"Cat"},{"name":"Fido","type":"Dog"}]},{"name":"Jennifer","gender":"Female","age":18,"pets":[{"name":"Garfield","type":"Cat"}]},{"name":"Steve","gender":"Male","age":45,"pets":null},{"name":"Fred","gender":"Male","age":40,"pets":[{"name":"Tom","type":"Cat"},{"name":"Max","type":"Cat"},{"name":"Sam","type":"Dog"},{"name":"Jim","type":"Cat"}]},{"name":"Samantha","gender":"Female","age":40,"pets":[{"name":"Tabby","type":"Cat"}]},{"name":"Alice","gender":"Female","age":64,"pets":[{"name":"Simba","type":"Cat"},{"name":"Nemo","type":"Fish"}]}];
   const sortedCatNames = ["Garfield","Garfield","Jim","Max","Simba","Tabby","Tom"];

   describe("should process the people data", function() {

      it("should filter the people data by gender", function() {
         // The json result should not contain Male
         const filteredPetsString = JSON.stringify(filterByOwnersGender(mockData, 'Female'));
         expect(filteredPetsString).toMatch(/^((?!Male).)*$/);
      });

      it("should only return pets that are cats", function() {
         // the filtered array should only return cats
         expect(filterPetByType(mockData, 'Cat').length).toBe(7);
      });

      it("should sort cats alphabetically", function() {
         // the filtered array should be sorted alphabetically
         let = filteredPets = filterPetByType(mockData, 'Cat');
         filteredPets.sort(sortPetsByName);
         expect(filteredPets.map(item => { return item.name})).toEqual(sortedCatNames);
      });
   });
});
