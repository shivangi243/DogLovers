document.addEventListener('DOMContentLoaded', () => {
  const fetchDogButton = document.getElementById('fetchDog');
  const dogImage = document.getElementById('dogImage');
  const breedDetails = document.getElementById('breedDetails');

  fetchDogButton.addEventListener('click', () => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        if (data && data.message) {
          const imageUrl = data.message;
          dogImage.src = imageUrl;

          // Extract breed from image URL and display details
          const breed = extractBreedFromUrl(imageUrl);
          breedDetails.innerHTML = `<h3>Breed: ${breed}</h3>`;
        }
      })
      .catch(error => {
        console.error('Error fetching dog image:', error);
      });
  });

  function extractBreedFromUrl(url) {
    // Example URL: https://dog.ceo/api/img/retriever/golden/n02099601_3004.jpg
    const parts = url.split('/');
    const breed = parts[parts.length - 2];
    return breed.replace(/_/g, ' ').toUpperCase();
  }
});
