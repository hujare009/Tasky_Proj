const taskContainer = document.querySelector(".task__container");

//Global Store
let globalStore = [];

// creating a new card using card credentials from html...
const newCard = ({
  id,
  imageUrl,
  taskTitle,
  taskType,
  taskDescription,
}) => `<div class="col-md-6 col-lg-4" id=${id}>
           <div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success">
    <i class="fas fa-pencil-alt" >
    </i>
    </button>
<button type="button" id=${id} class="btn btn-outline-danger">
<i class="fas fa-trash" id=${id} onclick="deleteCard.apply(this, arguments)">
</i>
</button>
  </div>
    <img src=${imageUrl} 
    class="card-img-top rounded" 
    alt="..." 
    />
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${taskDescription}</p>
    <span class="badge bg-primary">${taskType}</span>
  </div>
  <div class="card-footer text-muted"><button type="button" class="btn btn-outline-primary float-end">Open Task</button>

  </div>
</div>
        </div>`;
const loadInitialTaskCards = () => {
  //logic for this array

  //access localstorage
  const getInitialData = localStorage.getItem("tasky"); //null
  if (!getInitialData) return;

  //convert stringfield-object to object
  const { cards } = JSON.parse(getInitialData);

  //map around the array HTML card and inject it to DOM
  cards.map((cardObject) => {
    const createNewCard = newCard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(cardObject);
  });
};

const updateLocalStorage = (data) =>
  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));

const saveChanges = () => {
  const taskData = {
    id: "${Date.now()}",
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,
  };

  //HTML code
  const createNewCard = newCard(taskData);

  taskContainer.insertAdjacentHTML("beforeend", createNewCard);
  globalStore.push(taskData);
  console.log(globalStore);

  //add to local storage
  updateLocalStorage(); //setItem
};

const deleteCard = (event) => {
  // initially we want id of card
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName; //BUTTON

  //search the globalStore, remove that object which matches with id
  /*
  newUpdatedArray.map((cardObject) => {
    const createNewCard = newCard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
  });*/

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  updateLocalStorage(); // it will update storage when del.or create

  // access dom to remove the slides.
  if (tagname === "BUTTON") {
    //task__container.
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode //it will reches to parent node (task__container) parent node of all cards and then parent node will ask which child to del.
    );
  }
  //task__container.
  return taskContainer.removeChild(
    event.target.parentNode.parentNode.parentNode.parentNode
  );

  //loop overthe new globalStore, and inject update card to DOM
};
