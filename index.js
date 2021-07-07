const taskContainer = document.querySelector(".task__container");
console.log(taskContainer);

//Global Store
const globalStore = [];
//

// creating a new card using card credentials from html...
const newCard = ({
  id,
  ImageUrl,
  TaskTitle,
  TaskType,
  TaskDescription,
}) => `<div class="col-md-6 col-lg-4" id=${id}>
           <div class ="card ">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
<button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
  </div>
    <img 
    src=${ImageUrl} 
    class="card-img-top rounded"
    alt="..." />

  <div class="card-body">
    <h5 class="card-title">${TaskTitle}</h5>
    <p class="card-text">${TaskDescription}</p>
    <span class="badge bg-primary"> ${TaskType} </span>
  </div>
  <div class="card-footer text-muted"><button type="button" class="btn btn-outline-primary float-end">Open Task</button>

  </div>
</div>
</div>`;

const loadInitialTaskCards = () => {
  //logic for this array

  //access localstorage
  const getInitialData = localStorage.getItem("tasky");
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

const saveChanges = () => {
  const taskData = {
    id: "${Date.now()}",
    ImageUrl: document.getElementById("imageurl").value,
    TaskTitle: document.getElementById("tasktitle").value,
    TaskType: document.getElementById("tasktype").value,
    TaskDescription: document.getElementById("taskdescription").value,
  };

  //HTML code
  const createNewCard = newCard(taskData);

  taskContainer.insertAdjacentHTML("beforeend", createNewCard);
  globalStore.push(taskData);
  console.log(globalStore);

  //add to local storage
  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore })); //setItem
};
