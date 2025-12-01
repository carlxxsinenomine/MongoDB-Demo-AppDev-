let books = []; //empty library

// Load books on page load
window.onload = function() {
    renderBooks();
};

function renderBooks() {

    const tbody = document.getElementById('booksTableBody'); //open 
    tbody.innerHTML = '';
    
    books.forEach(book => {
        
        const row = tbody.insertRow();

        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.description}</td>
        
            <td class="operations">
                <button class="btn-edit" onclick="editBook(${book.id})">Edit</button>
                <button class="btn-delete" onclick="deleteBook(${book.id})">Delete</button>
            </td>
        
            `;
    });
}

let editingBookId = null;

function addBook() {
    
    const id = document.getElementById('bookId').value;
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const description = document.getElementById('bookDescription').value;

    if (!id || !title || !author || !description) {
        
        alert('Please fill in all fields');
        return;
    }

    if (editingBookId !== null) {
        
        // Update existing book
        const bookIndex = books.findIndex(book => book.id === editingBookId);
        
        if (bookIndex !== -1) {
            
            books[bookIndex] = {

                id: parseInt(id),
                title: title,
                author: author,
                description: description
            };
        }

        editingBookId = null;
    } 
    
    else {

        // Check if ID already exists
        if (books.some(book => book.id == id)) {
    
            alert('A book with this ID already exists');
            return;
        }

        // Add new book
        books.push({
    
            id: parseInt(id),
            title: title,
            author: author,
            description: description
        });
    }

    renderBooks();
    clearForm();
}

function editBook(id) {
    
    const book = books.find(b => b.id === id);
    
    if (book) {
    
        editingBookId = id;
        document.getElementById('bookId').value = book.id;
        document.getElementById('bookTitle').value = book.title;
        document.getElementById('bookAuthor').value = book.author;
        document.getElementById('bookDescription').value = book.description;
    }
}

function deleteBook(id) {
    
    if (confirm('Are you sure you want to delete this book?')) {
    
        books = books.filter(book => book.id !== id);
        renderBooks();
    }
}

function clearForm() {
    
    editingBookId = null;
    document.getElementById('bookId').value = '';
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookDescription').value = '';
}
