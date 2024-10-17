fetch('http://localhost:3000/notes')
  .then((res) => res.json())
  .then((notes) => {

    notes.forEach(note => {
        const notes = document.getElementById("notes");
        notes.innerHTML +=  `
            <div class="col-md-3 mb-2 ">
            <div class="p-1">
            <img src=${note.image} class="img-fluid " width="200vw" "height="60vh"/>
            <h5>${note.subject}</h5>
            <p>${note.content}</p>
            <p> <strong>Topics included:</strong>${note.topics}</p>
            <p> <a href ="${note.resources}" target="_blank" class="link-dark">${note.resources}</a></p>
            <button onclick="singleNote('${(note.id)}')" class="btn btn-primary ms-4 btn-sm">View note</buton>
            <button onclick="editMyNote('${(note.id)}')" class="btn btn-success ms-4 btn-sm">Update</buton>
            <button onclick="deleteNote('${(note.id)}')" class="btn btn-danger ms-4 btn-sm" >Delete</buton>
            </div>
            </div>
         `
    }) 
  })

//add notes

const addNote = document.getElementById("add_note");

addNote.addEventListener("submit", (e) => {
 e.preventDefault();

 const image = document.getElementById("image").value;
 const subject = document.getElementById("subject").value;
 const content = document.getElementById("content").value;
 const topics = document.getElementById("topics").value;
 const resources = document.getElementById("resources").value;


 fetch('http://localhost:3000/notes', {
    method: 'POST',
    body: JSON.stringify({
      content: content,
      subject: subject,
      image: image,
      topics :topics,
      resources:resources

    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((res) => res.json())
    .then((data) => {
        alert("Notes added successfully");
    });
})

//update notes
function editMyNote(id){
    fetch(`http://localhost:3000/notes/${id}`)
  .then((res) => res.json())
  .then((note) => {
     
    const edit = document.getElementById("edit");
    edit.innerHTML += `<h5>Edit notes</h5>
              <div id="message" class="text-success" role="alert">
                <!-- This is where the success message will be displayed -->
              </div>
              <form id="edit_note">
                <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="edit_image"
                      value="${note.image}"
                      required
                      placeholder="Image URL"
                    />
                  </div>
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="edit_subject"
                    value="${note.subject}"
                    required
                    placeholder="subject"
                  />
                </div>
                

                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="edit_content"
                    value="${note.content}"
                    required
                    placeholder="content"
                    
                  />
                </div>

                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="edit_topics"
                    value="${note.topics}"
                    required
                    placeholder="topics"
                    
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="url" 
                    class="form-control"
                    id="edit_resources"
                    value="${note.resources}"
                    required
                    placeholder="resources"
                    
                  />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>

    `
 

  const editNotes = document.getElementById("edit_note");
  editNotes.addEventListener("submit",event => {
    event.preventDefault();

    const image = document.getElementById("edit_image").value;
    const subject = document.getElementById("edit_subject").value;
    const content = document.getElementById("edit_content").value;
    const topics = document.getElementById("edit_topics").value;
    const resources = document.getElementById("edit_resources").value;

    fetch(`http://localhost:3000/notes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            content: content,
            subject: subject,
            image: image,
            topics :topics,
            resources:resources
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then(() => {
            alert("Note editted successfully");
        });
  })
});
}

//delete notes
function deleteNote(id){

    fetch(`http://localhost:3000/notes/${id}`, {
        method: 'DELETE',
      })
      .then((res)=> res.json() )
  .then(() => {
    alert("deleted successfully");
})
}

//single note
function singleNote(id){
    fetch(`http://localhost:3000/notes/${id}`)
  .then((res) => res.json())
  .then((note) => {

    const aNote = document.getElementById("aNote");
    aNote.innerHTML +=`
    <div class="col-md-3 mb-2">
            <div class="p-1">
            <img src=${note.image} class="img-fluid " width="200vw" "height="60vh"/>
            <h5>${note.subject}</h5>
            <p>${note.content}</p>
            <p> <strong>Topics included:</strong>${note.topics}</p>
            <p> <a href ="${note.resources}" target="_blank" class="link-dark">${note.resources}</a></p>
            <button onclick="editMyNote('${(note.id)}')" class="btn btn-success ms-4 btn-sm">Update</buton>
            <button onclick="deleteNote('${(note.id)}')" class="btn btn-danger btn-sm" >Delete</buton>
            </div>
            </div>
    `
})
}

//progress 
fetch('http://localhost:3000/progress')
  .then((res) => res.json())
  .then((data) => {
    data.forEach(progress =>{
        const data = document.getElementById("progress");
        data.innerHTML += `
        <div class="col-md-3 mb-2">
        <div class="p-1">
        <h6><strong>Unit:</strong>${progress.unit}</h6>
        <p><strong>Percentage:</strong>${progress.completionPercentage}</p>
        <p><strong>Topics Completed:</strong>${progress.topicsCompleted}</p>
        <p><strong>Total Topics:</strong>${progress.totalTopics}</p>
        <button onclick="updateProgress('${(progress.id)}')" class="btn btn-success ms-4 btn-sm">Update</buton>
        </div>
        </div>
        `
    })
  });

  //add progress
   const addProgress = document.getElementById("add_progress");
   addProgress.addEventListener("submit", event => {
    event.preventDefault();

    const unit = document.getElementById("unit").value;
    const completion = document.getElementById("completion").value;
    const topics_completed = document.getElementById("topics_completed").value;
    const total_topics = document.getElementById("total_topics").value;

    
    fetch('http://localhost:3000/progress', {
        method: 'POST',
        body: JSON.stringify({
         unit:unit,
         completionPercentage:completion,
         topicsCompleted:topics_completed,
         totalTopics:total_topics

        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then(() => {
            alert("Progress added successfully")
        });
   })

   //update progress
   function updateProgress(id){

    fetch(`http://localhost:3000/progress/${id}`)
  .then((res) => res.json())
  .then((progress) => {

    const update = document.getElementById("update");

    update.innerHTML += ` <h5>Edit Progress</h5>
                <div id="message" class="text-success" role="alert">
                  <!-- This is where the success message will be displayed -->
                </div>
                <form id="edit_progress">
                  <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="edit_unit"
                        value="${progress.unit}"
                        required
                        placeholder="unit"
                      />
                    </div>
                  <div class="mb-3">
                    <input
                      type="number"
                      class="form-control"
                      id="edit_completion"
                      value="${progress.completionPercentage}"
                      required
                      placeholder="percentage"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="edit_topics_completed"
                      value="${progress.topicsCompleted}"
                      required
                      placeholder="Topics"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="edit_total_topics"
                      value="${progress.totalTopics}"
                      required
                      placeholder="Total Topics"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
   `
  const editProgress = document.getElementById("edit_progress");
  editProgress.addEventListener("submit",event =>{
    event.preventDefault();


    const unit = document.getElementById("edit_unit").value
    const completionPercentage = document.getElementById("edit_completion").value
    const topicsCompleted = document.getElementById("edit_topics_completed").value
    const totalTopics = document.getElementById("edit_total_topics").value

    fetch(`http://localhost:3000/progress/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          unit:unit,
          completionPercentage:completionPercentage,
          topicsCompleted:topicsCompleted,
          totalTopics:totalTopics
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then(() => {
            alert("progress successfully updated")
        });
  })
  });
   }