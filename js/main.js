
const searchField = document.getElementById('search-field');
const searchText = searchField.value;
const resultCountField = document.getElementById('result-count');
const booksContainer = document.getElementById('books-items');
const errorField = document.getElementById('error');

const searchBook = () => {
    searchField.value = '';

    // load search 
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchBook(data.docs))
   
}
const displaySearchBook = books => {
    //  display result count number
    resultCountField.innerText = `${books.length} results were found`;

    // clear
    booksContainer.textContent= '';

    // display books result
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col-lg-6');
        div.classList.add('col-12');
        div.innerHTML = `
        <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img style="height: 100%" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body my-2">
              <h4 class="card-title">${book?.title}</h4>
              <p class="card-text ms-auto"><span class="fw-bold">Author:</span> ${book.author_name?.[0] || 'Not Found'}</p>
              <p class="card-text"><span class="fw-bold">Subject for:</span> ${book?.subject?.slice(0, 3) || 'Not Found'}</p>             
              <p class="card-text"><span class="fw-bold">Publisher:</span> ${book?.publisher?.[0] || 'Not Found'}</p>
              <p class="card-text"><span class="fw-bold">Published:</span> at ${book?.first_publish_year || 'Not Found'}</p>
            </div>
          </div>
        </div>
        </div>
        `;
        booksContainer.appendChild(div);
        
    });
}
