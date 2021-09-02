const inputField = document.getElementById('input-field');
const booksNumber = document.getElementById('books-number');
const cardDiv = document.getElementById('cards');
document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
cardDiv.textContent = '';

const loadData = () => {
  // console.log('Clicked');
  const inputText = inputField.value;

  if (inputText === '') {
    displayError();
  } else {
    // Display Spinner
    document.getElementById('spinner').style.display = 'block';
    // Hide error
    document.getElementById('error-message').style.display = 'none';
    // Clear Team Details
    cardDiv.textContent = '';
    // Clear Search Result
    booksNumber.innerText = '';
    // load data
    const url = `https://openlibrary.org/search.json?q=${inputText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayData(data));
  }
  inputField.value = '';
};

//function display data
const displayData = (booksObject) => {
  // console.log(booksObject);
  // console.log('clicked');

  //Show number of books found by search
  const numOfBooks = booksObject.numFound;
  if (numOfBooks === 0) {
    displayError();
  } else {
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('spinner').style.display = 'none';
    booksNumber.innerText = `About ${booksObject.numFound} Books Found.`;
  }

  // loop through the docs array
  const booksArray = booksObject.docs;
  // console.log(booksArray);
  booksArray.forEach((element) => {
    const index = booksArray.indexOf(element);
    // console.log(element);
    if (index <= 9) {
      console.log(element);
      let imgUrl = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`;
      // if cover not found default cover photo will set
      if (element.cover_i === undefined) {
        imgUrl = `img/default.jpg`;
      }

      // console.log(imgUrl);
      const singleCard = document.createElement('div');
      singleCard.classList.add('card', 'col');
      const authorsArr = element.author_name;
      singleCard.innerHTML = `
      <img src="${imgUrl}" height=300 class="card-img-top" alt="Book Cover Not Found" />
        <div class="card-body">
          <h5 class="card-title text-white bg-success">Books Name: ${
            element.title
          }</h5>
          <h6v id="author" class="card-title">First Publish Year: ${
            element.first_publish_year
              ? element.first_publish_year
              : 'Publish year not found'
          }</h6v>
          <p class="card-text">Authors: ${authorsArr}</p>
        </div>
      `;
      cardDiv.appendChild(singleCard);
    }
  });
};
// display Error
const displayError = () => {
  document.getElementById('error-message').style.display = 'block';
  document.getElementById('spinner').style.display = 'none';
  document.getElementById('cards').textContent = '';
  booksNumber.innerText = '';
};
