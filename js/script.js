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

    const taskDoneButton = (indexWTabeli) => {
        taskTable[indexWTabeli].status === "done" ? taskTable[indexWTabeli].status = "toDo" : taskTable[indexWTabeli].status = "done";
        render();
    };


    const render = () => {
        let htmlString = "";

        for (const taskTableElement of taskTable) {
            htmlString += `
                <li ${taskTableElement.status === "done" ? "class=\"task__done\"" : "class=\"task\"" }>
                <button class="doneButton js-doneButton"">ZROBIONE</button>
                ${taskTableElement.content}
                <button class="removeButton js-removeButton">USUŃ</button>
                 </li>
        `};
        document.querySelector(".js-tasks").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });

            const toggleDoneButtons = document.querySelectorAll(".js-doneButton");

            toggleDoneButtons.forEach((doneButton, index) => {
                doneButton.addEventListener("click", () => {
                    taskDoneButton(index);
                });

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

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        //console.log(newTaskContent);

        if (newTaskContent === "") {
            document.querySelector(".js-newTask").focus();
            return;
        };
        addNewTablePosition(newTaskContent);
        console.log(taskTable);

    };



    init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
}