const inputField = document.getElementById('input-field');

const loadData = () => {
  // console.log('Clicked');
  const inputText = inputField.value;

  // console.log(inputValue);
  const url = `http://openlibrary.org/search.json?q=${inputText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data));
};

const booksNumber = document.getElementById('books-number');
const cardDiv = document.getElementById('cards');

const displayData = (booksObject) => {
  // console.log(booksObject);
  console.log('clicked');
  const numOfBooks = booksObject.numFound;
  if (inputField.value.length === 0) {
    booksNumber.innerText = 'Please input your Books Name';
  } else if (numOfBooks === 0) {
    booksNumber.innerText = `Sorry!!! No Books Found.`;
  } else {
    booksNumber.innerText = `About ${booksObject.numFound} Books Found.`;
  }
  // loop through the docs array
  const booksArray = booksObject.docs;
  // console.log(booksArray);
  booksArray.forEach((element) => {
    const index = booksArray.indexOf(element);
    // console.log(element);
    if (index <= 4) {
      console.log(element);
      const imgUrl = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`;
      console.log(imgUrl);
      const singleCard = document.createElement('div');
      singleCard.classList.add('card', 'col-4');
      const authorsArr = element.author_name;
      singleCard.innerHTML = `
      <img src="${imgUrl}" class="card-img-top" alt="Book Cover" />
        <div class="card-body">
          <h5 class="card-title">Books Name: ${element.title}</h5>
          <h6v id="author" class="card-title">First Publish Year: ${element.first_publish_year}</h6v>
          <p class="card-text">Authors: ${authorsArr}</p>
        </div>
      `;
      cardDiv.appendChild(singleCard);
    }
  });
};

// function authorName(inputArr) {
//   inputArr.forEach((ele) => {
//     console.log(ele);
//     // document.getElementById('author').innerText = ele;
//   });
// }
