
class Book{
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;

        
    }

}

class Display{
    add(book) {
        let booksobj;
        let bookData = localStorage.getItem('books');
            if (bookData == null) {
                booksobj = [];
            }
            else {
                booksobj = JSON.parse(bookData);
            }
            

        booksobj.push(book);
        localStorage.setItem('books', JSON.stringify(booksobj));
        this.view();
       
    }

    view(){
        let bookData = localStorage.getItem('books');
        let booksobj;
        if (bookData == null) {
            booksobj = [];
        }
        else {
            booksobj = JSON.parse(bookData);
        }
        let uistring='';
        
        if (booksobj.length != 0) {
        
            booksobj.forEach((book, index) => {
                uistring += `<tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
            </tr>`
        let tbody = document.getElementById("tbody");
        tbody.innerHTML=uistring;

                
    
            });
    
        }


    }
    clear() {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }
    validate(book)
    {
        if(book.name.length<1 || book.author.length<1)
        {
            return false;
        }
        
        else return true;
    }
    show(type){
    
        let messageBox = document.getElementById('alertMessage');
         if(type=='success')
         {
           messageBox.innerHTML=`<div class="alert alert-success d-flex align-items-center" role="alert">
                                   <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                                   <div>
                                       Yeah! Your Book has been added successfully.
                                   </div>
                               </div>`

            
           
         }
         if(type=='danger')
         {
           
           messageBox.innerHTML=`<div class="alert alert-warning d-flex align-items-center" role="alert">
                                       <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                       <div>
                                       Sorry!! Please enter valid Book Name and Author Name.
                                       </div>
                                   </div>   `
         
         }
         setTimeout(() => {
           messageBox.innerHTML='';
       }, 3000);
   }

}


//eventlistner

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', addBooks);            //*****************

function addBooks(e) {
    e.preventDefault();
    let bookName = document.getElementById('bookName').value;
    let authorName = document.getElementById('authorName').value;
    let bookType;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if (fiction.checked) bookType = fiction.value;
    if (programming.checked) bookType = programming.value;
    if (cooking.checked) bookType = cooking.value;

    let book = new Book(bookName, authorName, bookType);  //instance cannot name same as object
    let display = new Display();

    ////
    
    ////

    if(display.validate(book))
    {
        display.add(book);
        display.clear();
        display.show('success');
        display.view();
        
    }
    else{
        display.show('danger');
    }

   
}