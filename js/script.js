{

    const taskTable = [
        {
            content: "pierwsze zadanie do zrobienia",
            status: "done",
        },
        {
            content: "drugie zadanie do zrobienia",
            status: "toDo",
        },
    ];


    const removeTask = (index) => {
        taskTable.splice(index, 1);
        render();
    };

    const taskDone = (index) => {
        taskTable[index].status === "done" ? taskTable[index].status = "toDo" : taskTable[index].status = "done";
        render();
    };


    const render = () => {
        let htmlString = "";

        for (const taskTableElement of taskTable) {
            htmlString +=
                `
                <li class="task" >
                <button class="doneButton js-doneButton">${taskTableElement.status === "done" ? "✔" : ""}</i></button> 
                <span class="content ${taskTableElement.status === "done" ? "content__done\"" :"\""}> ${taskTableElement.content}</span>
                <button class="removeButton js-removeButton">🗑</button>
                 </li>
                `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString; // - w lekcji był w tym miejscu, ale nie wiem dlaczego


        const removeButtons = document.querySelectorAll(".js-removeButton");  // node list

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
        const toggleDoneButtons = document.querySelectorAll(".js-doneButton");

        toggleDoneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                taskDone(index);
            });

        });
    };



    const addNewTablePosition = (newTaskContent) => {
        taskTable.push({
            content: newTaskContent,
            status: "toDo",
        });
        render();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        let newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent.trim() === "") {
            document.querySelector(".js-newTask").focus();
            return;
        };

        addNewTablePosition(newTaskContent);

        document.querySelector(".js-newTask").value = "";
    };



    init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
}