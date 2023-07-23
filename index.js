//initialize firebase app
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//url from firebase
const appSettings = {
    databaseURL: "https://playground-1d4d5-default-rtdb.europe-west1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
//setting up reference 
const shoppingListDB = ref(database, "shoppingList")


var addBtn = document.getElementById('add-btn')
var inputText = document.getElementById('input-field')
addBtn.addEventListener('click',function(){
   
    var inputField = inputText.value
    if(inputField != ""){
        push(shoppingListDB, inputField)
        var li = document.createElement('li');
    
        clearInputField(inputText)
    }
   
})

//retrieve data from database
onValue(shoppingListDB, function(snapshot){

    if(snapshot.exists()){
        let itemArr = Object.entries(snapshot.val())
        clearShoppingList()
        for(let i=0; i<itemArr.length; i++){
            var ul = document.getElementById('shopping-list')
            var li = document.createElement('li');
            var text = document.createTextNode(itemArr[i][1]);
            li.appendChild(text)
            ul.appendChild(li)
            li.addEventListener('dblclick',function(){
                //get the reference to the itemID from the db
                let exactLocationOfStoryInDB = ref(database, `shoppingList/${itemArr[i][0]}`)
                // call the remove function to remove item
                remove(exactLocationOfStoryInDB)
            }) 
        }
    }else{
        document.getElementById('shopping-list').innerHTML = "No items here... yet!"
    }
    
})
function clearShoppingList(){
    var ul = document.getElementById('shopping-list').innerHTML = ""
}
//clear input field
function clearInputField(input){
   input.value = ""
}







