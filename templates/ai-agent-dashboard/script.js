function runAgent(agentName) {

    const activityList =
        document.getElementById("activityList");

    const activity =
        document.createElement("div");

    activity.className = "activity";

    activity.innerHTML = `
        <div class="activity-icon">↗</div>

        <div>
            <strong>${agentName}</strong>

            <p>
                Started a new task
            </p>

            <small>
                Just now
            </small>
        </div>
    `;

    activityList.prepend(activity);

    updateTaskCount();
}

function updateTaskCount() {

    const taskCount =
        document.getElementById("taskCount");

    let count =
        parseInt(taskCount.textContent);

    count++;

    taskCount.textContent = count;
}

function addAgent() {

    const agentList =
        document.getElementById("agentList");

    const agent =
        document.createElement("div");

    agent.className = "agent-card";

    agent.innerHTML = `
        <div class="agent-icon purple">
            ✦
        </div>

        <div class="agent-info">

            <h3>New AI Agent</h3>

            <p>
                Custom intelligent automation agent
            </p>

            <span class="status online">
                ● Online
            </span>

        </div>

        <button onclick="runAgent('New AI Agent')">
            Run
        </button>
    `;

    agentList.appendChild(agent);
}

function clearTasks() {

    const taskRows =
        document.querySelectorAll(
            ".task-row:not(.heading)"
        );

    taskRows.forEach(row => {

        const status =
            row.querySelector(".completed");

        if (status) {
            row.remove();
        }

    });
}

document.querySelector(".notification")
    .addEventListener("click", function() {

        alert("You have 3 new agent notifications.");

    });