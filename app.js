let kittens = []
let kitten = {}
loadKittens()

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  
  let form = event.target

  let name = form.name.value

  kitten = kittens.find(kitten => kitten.name == name)

  if(kitten){
    alert("This kitten name is already being used!")
  }
  else {
    kitten = {
      name: name,
      mood: "Tolerant",
      affection: 5,
      id: generateId()
    }
  kittens.push(kitten)
  saveKittens()
  }

  form.reset()
  drawKittens()
  console.log(kitten);
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to local storage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from local storage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if(kittensData){
    kittens = kittensData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  loadKittens()
  let kittensElement = document.getElementById("kittens")
  let kittenTemplate = ""

  kittens.forEach(kitten => {
  kittenTemplate += `
    <div class="bg-dark text-light kitten ${kitten.mood}  m-1">
      <img class="kitten" src="https://robohash.org/${kitten.name}?set=set4&size=150x150"> 
      <div class="d-flex justify-content-center m-1">Name: ${kitten.name}</div>
      <div class="d-flex justify-content-center m-1">Affection: ${kitten.affection}</div>
      <div class="d-flex justify-content-center m-1">Mood: ${kitten.mood}</div>
      <div class="d-flex justify-content-center">
        <button class="button m-1" onclick="catnip('${kitten.id}')">CATNIP</button>
        <button class="btn-cancel m-1" onclick="pet('${kitten.id}')">PET</button>
      </div>
      <div class="d-flex justify-content-center">  
        <button class="text-danger btn-remove m-1">
          <i class="fa-solid fa-trash" onclick="clearKittens('${kitten.id}')"></i> 
        </button>
      </div>  
    </div>
    `
})
  kittensElement.innerHTML = kittenTemplate
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(kitten => kitten.id === id)
}




/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let thisKitten = findKittenById(id)
  let randomNumber = Math.random()

  if (randomNumber > .5) {
    thisKitten.affection ++;
    setKittenMood(thisKitten)
    saveKittens()
  }
  else {
  thisKitten.affection --;
  setKittenMood(thisKitten)
  saveKittens()}

  console.log(thisKitten);
  drawKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let thisKitten = findKittenById(id)
  thisKitten.mood = "Tolerant"
  thisKitten.affection = 5;
  saveKittens()
  drawKittens()
  console.log(thisKitten);
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  document.getElementById("kittens").classList.remove(kitten.mood)

  if (kitten.affection >=7) {kitten.mood = "Happy"}
  if (kitten.affection <= 6 && (kitten.affection >= 4)) {kitten.mood = "Tolerant"}
  if (kitten.affection <=3 && (kitten.affection >=1)) {kitten.mood = "Angry"}
  if (kitten.affection <=0){kitten.mood = "Gone"}

  document.getElementById("kittens").classList.add(kitten.mood)
  saveKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(id){
  console.log(id)
  let index = kittens.findIndex(kitten => kitten.id === id)
  kittens.splice(index, 1)
  saveKittens()
  drawKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("add-cat").classList.remove("hidden")
  console.log('Good Luck, Take it away')
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();