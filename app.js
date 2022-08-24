  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCn4wNZMe8p4A-qoNJh-2NEtzCw-LL8QO0",
    authDomain: "todo-app-8b7bf.firebaseapp.com",
    projectId: "todo-app-8b7bf",
    storageBucket: "todo-app-8b7bf.appspot.com",
    messagingSenderId: "35218906034",
    appId: "1:35218906034:web:ce223e326d119e289aa2ab",
    measurementId: "G-FB0PNB48D5"
  };





var inputValue = document.getElementById('item');
// Initialization of Firebase
const app = firebase.initializeApp(firebaseConfig);

// Key Generate here
var key = app.database().ref('/').child('todolist').push().key

// Retreive from firebase database
app.database().ref('/').child('todolist/').on('child_added', function (data) {
    console.log(data.val().value, data.key)

    var taskText = document.createTextNode(data.val().value);
    var table = document.getElementById('table');
    var txtTd = document.createElement('td');
    var editTd = document.createElement('td');
    var delBtnTd = document.createElement('td');
    var editBtn = document.createElement("button");
    var delBtn = document.createElement("button");

    txtTd.appendChild(taskText);
    var editBtnTxt = document.createTextNode("Edit");
    var delBtnTxt = document.createTextNode("Delete");
    editBtn.appendChild(editBtnTxt);
    delBtn.appendChild(delBtnTxt);
    editBtn.setAttribute('class', "editBtn");
    delBtn.setAttribute('class', "delBtn");
    editBtn.setAttribute('onclick', "editItem(this)");
    delBtn.setAttribute('onclick', "delItem(this)");

    editBtn.setAttribute('id', data.key);
    delBtn.setAttribute('id', data.key);

    editTd.appendChild(editBtn);
    delBtnTd.appendChild(delBtn);
    txtTd.setAttribute('class', "itemtTd");
    editTd.setAttribute('class', "editTd");
    delBtnTd.setAttribute('class', "delTd");
    var tr = document.createElement("tr");
    tr.appendChild(txtTd);
    tr.appendChild(editTd);
    tr.appendChild(delBtnTd);
    table.appendChild(tr);
})

function addtodo() {
    
    if (!inputValue.value.trim()) {
        alert("Enter your task")
    }
    else {
        var key = firebase.database().ref('/').child('todolist').push().key
        // adding Data to firebase
        app.database().ref('/').child('todolist').push({ value: inputValue.value, key: key })
        var val = {
            value: inputValue.value,
            key: key
        }

        input_value.value = ""
    }
}

function editItem(e) {
    var val = e.parentNode.previousSibling.innerText;

    var uptval = prompt('Enter new Task', val)
    if (!uptval.trim()) {
        alert("Empty Input, Changes not saved")
    }
    else {
        var update = {
            value: uptval,
            key: e.id
        }

        app.database().ref('/todolist').child(e.id).set(update)
        e.parentNode.previousSibling.innerText = update.value
    }


}

function delItem(e) {
    e.parentNode.parentNode.remove();
    app.database().ref('/todolist').child(e.id).remove()
}

function deleteAlltodo() {
    var table = document.getElementById('table');
    table.innerHTML = ""
    app.database().ref('/todolist').remove()
}