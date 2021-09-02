const inputField = document.getElementById('input-field');

const loadData = () => {
  // console.log('Clicked');
  const inputText = inputField.value;

  // console.log(inputValue);
  const url = `https://openlibrary.org/search.json?q=${inputText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data));
  inputField.value = '';
};

const booksNumber = document.getElementById('books-number');
const cardDiv = document.getElementById('cards');

const displayData = (booksObject) => {
  cardDiv.textContent = '';
  // console.log(booksObject);
  // console.log('clicked');
  const numOfBooks = booksObject.numFound;
  if (numOfBooks === 0) {
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
      let imgUrl = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`;
      // if cover not found default cover photo will set
      if (element.cover_i === undefined) {
        imgUrl = `img/default.jpg`;
      }

      // console.log(imgUrl);
      const singleCard = document.createElement('div');
      singleCard.classList.add('card', 'col-4');
      const authorsArr = element.author_name;
      singleCard.innerHTML = `
      <img src="${imgUrl}" height=300 class="card-img-top" alt="Book Cover Not Found" />
        <div class="card-body">
          <h5 class="card-title text-white bg-success">Books Name: ${element.title}</h5>
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
