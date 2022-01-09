const addButton = document.querySelector("#add");

// To save the notes in local storage after refresh
const updateLSData = () => {
    const textAreaData = document.querySelectorAll("textarea");
    const notes = [];
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");

    const htmlData = `
        <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"> <i class="fas fa-trash-alt"></i></button>
        </div>

        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    </div> `;

    note.insertAdjacentHTML("afterbegin", htmlData);

    // getting refrences to toggle 
    const editButton = note.querySelector(".edit");
    const delButton = note.querySelector(".delete");
    const mainDiv = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    // deleting the node
    delButton.addEventListener("click", () => {
        note.remove();
        updateLSData() //permanently delete after delete from system
    });

    //toggle using edit button
    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener("click", () => {
        mainDiv.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    textArea.addEventListener("change", (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    });
    document.body.appendChild(note); //append node every time on clicking add note  
};
// end of func
// getting data from local storage
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach((note) => addNewNote(note));
}
addButton.addEventListener("click", () => addNewNote());