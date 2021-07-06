const taskContainer = document.querySelector(".task__container");
console.log(taskContainer);

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

const saveChanges = () => {
  const taskData = {
    id: "${Date.now()}",
    ImageUrl: document.getElementById("imageurl").value,
    TaskTitle: document.getElementById("tasktitle").value,
    TaskType: document.getElementById("tasktype").value,
    TaskDescription: document.getElementById("taskdescription").value,
  };

  const createNewCard = newCard(taskData);

  taskContainer.insertAdjacentHTML("beforeend", createNewCard);
};
