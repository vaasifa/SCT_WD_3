// State Arrays Initialization (Load existing browser memory data profiles directly or assign empty arrays)
let tasks = JSON.parse(localStorage.getItem('todo_tasks')) || [];
let currentFilter = 'all';

// DOM Element Selectors Mapping Nodes References
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const dateTimeInput = document.getElementById('dateTimeInput');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filter-btn');

// Sync Engine function utility mapping to update local state updates to disk instantly
function saveTasksToDisk() {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
}

// Handler intercepts submitted input metrics definitions
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = taskInput.value.trim();
    if (!text) return;

    // Build operational task entry object configuration
    const newTask = {
        id: Date.now().toString(), // Generate high probability collision proof unique ID string mapping
        title: text,
        dueDate: dateTimeInput.value ? formatDisplayDate(dateTimeInput.value) : "",
        completed: false
    };

    tasks.push(newTask);
    saveTasksToDisk();
    renderTasks();

    // Flash reset data profiles across interface input components
    todoForm.reset();
});

// Format technical DateTime string values into clean readable layout presentation variants
function formatDisplayDate(dateTimeString) {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleDateString('en-US', options);
}

// Function managing item assembly processing layout loops logic configurations rulesets
function renderTasks() {
    taskList.innerHTML = "";

    // Parse array tracking parameters variations metrics filtered out targets matching selections keys
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'pending') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true; // Catch 'all'
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', task.id);

        li.innerHTML = `
            <div class="task-content">
                <span class="task-text">${task.title}</span>
                ${task.dueDate ? `<span class="task-date">📅 Due: ${task.dueDate}</span>` : ''}
            </div>
            <div class="task-actions">
                <button class="action-btn complete-toggle">${task.completed ? 'Undo' : 'Done'}</button>
                <button class="action-btn edit-trigger">Edit</button>
                <button class="action-btn delete-trigger">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Event Delegation capture processing loops intercepting action clicks within rows nodes directly
taskList.addEventListener('click', (e) => {
    const targetButton = e.target;
    const taskItemRow = targetButton.closest('.task-item');
    if (!taskItemRow) return;
    
    const taskId = taskItemRow.getAttribute('data-id');
    const index = tasks.findIndex(t => t.id === taskId);
    if (index === -1) return;

    // Handle STATUS Toggle Action Path
    if (targetButton.classList.contains('complete-toggle')) {
        tasks[index].completed = !tasks[index].completed;
        saveTasksToDisk();
        renderTasks();
    }
    
    // Handle EDIT Description Action Path
    else if (targetButton.classList.contains('edit-trigger')) {
        const textNode = taskItemRow.querySelector('.task-text');
        const currentText = tasks[index].title;
        
        const updatedText = prompt("Modify task description details description:", currentText);
        if (updatedText !== null && updatedText.trim() !== "") {
            tasks[index].title = updatedText.trim();
            saveTasksToDisk();
            renderTasks();
        }
    }
    
    // Handle DELETE Target row entry Action Path
    else if (targetButton.classList.contains('delete-trigger')) {
        if(confirm("Permanently delete this task item entry track?")) {
            tasks.splice(index, 1);
            saveTasksToDisk();
            renderTasks();
        }
    }
});

// Segment filter menu switching buttons tracking triggers bindings
filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        currentFilter = e.target.getAttribute('data-filter');
        renderTasks();
    });
});

// Bootstrap Setup Event Loop initialization run triggers
renderTasks();