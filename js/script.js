{

    const taskTable = [
        {
            object: "pierwsze zadanie do zrobienia",
            status: "done",
        },
        {
            object: "drugie zadanie do zrobienia",
            status: "in progress",
        },
    ];


    const render = () => {
        let htmlString = "";

        for (const taskItem of taskTable) {
            htmlString += `
                <li ${taskItem.status === "done" ? "class=\"task__done\"" : ""}>
                ${taskItem.object}
                 </li>
        `};
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };



    const addNewPosition = (newTaskContent) => {
        taskTable.push({
            object: newTaskContent,
            status: "in progress",
        });

        render();
    };

const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        console.log(newTaskContent);

        if (newTaskContent === "") {
            document.querySelector(".js-newTask").focus();
            return;
        };

        addNewPosition(newTaskContent);
    };



    init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
}