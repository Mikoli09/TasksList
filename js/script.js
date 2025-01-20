{
    let tasksTable = [];
    let hideDoneTasks = false;


    const removeTask = (index) => {
        tasksTable = [
            ...tasksTable.slice(0, index),
            ...tasksTable.slice(index + 1)
        ];

        render();
    };

    const toggleTaskDone = (index) => {

        const changeStatus = checkedIndex => tasksTable[checkedIndex].status === "done" ? "toDo" : "done";

        tasksTable = [
            ...tasksTable.slice(0, index),
            { ...tasksTable[index], status: changeStatus(index) },
            ...tasksTable.slice(index + 1)
        ]

        render();
    };

    const bindTasksEvents = () => {

        const toggleDoneButtons = document.querySelectorAll(".js-listButton");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const removeButtons = document.querySelectorAll(".js-listButton--remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const switchButtonStatus = () => {
        hideDoneTasks = !hideDoneTasks;
    };

    const hideFinishedTasks = () => {

        switchButtonStatus();

        render();
    };

    const toggleAllDone = ({ content, status }) => ({
        content,
        status: "done"
    });

    const toggleAllTasksDone = () => {
        tasksTable = [
            ...tasksTable.map(toggleAllDone)
        ];

        render();
    };

    const bindButtonsEvents = () => {

        const hideDoneButton = document.querySelector(".js-header__button--hide");

        if (!hideDoneButton) {
            console.log("Brak przycisku");
            return;
        }
        hideDoneButton.addEventListener("click", hideFinishedTasks);


        const setAllTasksDoneButton = document.querySelector(".js-header__button--allDone");

        if (!setAllTasksDoneButton) {
            return;
        }

        setAllTasksDoneButton.addEventListener("click", toggleAllTasksDone);

    };

    const checkIfHide = (elementStatus) => {
        if (!hideDoneTasks) {
            return "";
        }
        return elementStatus === "done" ? " task__hidden" : ""
    };

    const checkmarkVisible = elementStatus => elementStatus === "done" ? "✔" : "";
    
    const checkIfLineThrough = elementStatus => elementStatus === "done" ? "content__done\"" : "\"";

    const renderTasks = () => {
        let htmlString = "";

        for (const { content, status } of tasksTable) {
            htmlString +=
                `
                            <li class="task${checkIfHide(status)}">
                            <button class="listButton js-listButton">${checkmarkVisible(status)}</button> 
                            <span class="content ${checkIfLineThrough(status)}> ${content}</span>
                            <button class="listButton listButton--remove js-listButton--remove">🗑</button>
                             </li>
                            `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const headerButtonVisibility = () => tasksTable.length != 0 ? "" : "task__hidden";

    const textSwap = () => hideDoneTasks ? "Pokaż ukryte" : "Ukryj ukończone";

    const everyTaskFinished = () => {

        const checkIfAllDone = ({ status }) => status === "done";

        return tasksTable.every(checkIfAllDone) ? "disabled" : "";
    };

    const renderButtons = () => {

        let headerContainerString =
            `
            <span class="header__span">Lista zadań</span>
            <button class="header__button js-header__button--hide ${headerButtonVisibility()}">${textSwap()}</button>
            <button ${everyTaskFinished()} class="header__button js-header__button--allDone ${headerButtonVisibility()}">Ukończ wszystkie</button>
            `

        document.querySelector(".header__container").innerHTML = headerContainerString;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindTasksEvents();
        bindButtonsEvents();
    };

    const addNewTablePosition = (newTaskContent) => {

        tasksTable = [
            ...tasksTable,
            { content: newTaskContent, status: "toDo" },
        ];

        render();

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