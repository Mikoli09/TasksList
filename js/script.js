{

    const taskTable = [];


    const removeTask = (index) => {
        taskTable.splice(index, 1);
        render();
    };

    const toggletaskDone = (index) => {
        taskTable[index].status === "done" ? taskTable[index].status = "toDo" : taskTable[index].status = "done";
        render();
    };


    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");  // node list

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-toggleDoneButton");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggletaskDone(index);
            });
        });
    };




    const render = () => {
        let htmlString = "";

        for (const taskTableElement of taskTable) {
            htmlString +=
                `
                <li class="task">
                <button class="toggleDoneButton js-toggleDoneButton">${taskTableElement.status === "done" ? "✔" : ""}</button> 
                <span class="content ${taskTableElement.status === "done" ? "content__done\"" : "\""}> ${taskTableElement.content}</span>
                <button class="removeButton js-removeButton">🗑</button>
                 </li>
                `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();

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