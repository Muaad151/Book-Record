class Book {
    constructor(name, author, isbn) {
        this.name = name;
        this.author = author;
        this.isbn = isbn;
    }

}



class UI {

    static display_books() {
        const storedBooks = Store.get_books();
        console.log(storedBooks)
        const books = storedBooks;
        books.forEach(function(book) {
            UI.add_book_to_list(book);
        })

    }

    static add_book_to_list(book) {
        let list = document.querySelector(".book-list");
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td class="text-center"><a href="#"><i class="fa fa-minus red"></i></a></td>
      `
        list.appendChild(row);
    }

    static display_alert(msg, color) {
        alert = document.createElement("p");
        alert.innerText = msg;
        alert.classList.add(`alert-${color}`);
        alert.classList.add(`alert`);
        const container = document.querySelector(".container");
        const bookform = document.querySelector("#book-form");
        container.insertBefore(alert, bookform);
        setTimeout(function() {
            alert.innerText = "";
            alert.classList.remove(`alert-${color}`);
            alert.classList.remove(`alert`);
        }, 1000)
    }


    static set_default() {
        const title = document.querySelector("#title");
        const author = document.querySelector("#author");
        const isbn = document.querySelector("#isbn");

        title.value = "";
        author.value = "";
        isbn.value = "";
    }

    static delete_book(el) {
        if (el.classList.contains("fa-minus")) {
            let row = el.parentElement.parentElement.parentElement;
            const list = document.querySelector(".book-list");
            list.removeChild(row);
            UI.display_alert("deleted", "danger");
            Store.remove_book(el.parentElement.parentElement.previousElementSibling.innerText)
        }
    }
}

class Store {
    static get_books() {
        let books = Boolean(localStorage.getItem("books")) ? JSON.parse(localStorage.getItem("books")) : [];
        console.log(books);
        return books
    }
    static add_books(book) {
        let books = Store.get_books();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }
    static remove_book(isbn) {
        let books = Store.get_books();
        books.forEach(function(book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }

}



document.addEventListener("DOMContentLoaded", UI.display_books);

document.getElementById("book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    if (title && author && isbn) {
        const book = new Book(title, author, isbn);
        console.log(book);
        UI.add_book_to_list(book);
        UI.display_alert("added succesfully", "success")
        UI.set_default();
        Store.add_books(book);
    } else { UI.display_alert("please fill all", "danger"); }
})


document.addEventListener("click", (e) => {
    // console.log(e.target)
    UI.delete_book(e.target);

})