{

    const taskTable = [
        {
            status: "pierwsze zadanie do zrobienia",
            object: "done",
        },
        {
            status: "drugie zadanie do zrobienia",
            object: "inporogress",
        },
    ];

    console.log(taskTable[0], taskTable[1]);

    const render = () => {
        let htmlString = "";

        for (const taskItem of taskTable) {
            htmlString += `
                <li>
                ${taskItem.status}
                 </li>
        `};
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };


    init = () => {
        render();
    };

    init();

}