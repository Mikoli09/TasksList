{
    const taskTable = [];

    const removeTask = (index) => {
        taskTable.splice(index, 1);
        render();
    };

    const toggleTaskDone = (index) => {
        taskTable[index].status === "done" ? taskTable[index].status = "toDo" : taskTable[index].status = "done";
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-listButton--remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-listButton");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const taskTableElement of taskTable) {
            htmlString +=
                `
                <li class="task">
                <button class="listButton js-listButton">${taskTableElement.status === "done" ? "✔" : ""}</button> 
                <span class="content ${taskTableElement.status === "done" ? "content__done\"" : "\""}> ${taskTableElement.content}</span>
                <button class="listButton listButton--remove js-listButton--remove">🗑</button>
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

        newTaskContent.value = "";
        document.querySelector(".js-newTask").focus();
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