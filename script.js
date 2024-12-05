document.getElementById('addButton').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput').value.trim();
    const prioritySelect = document.getElementById('prioritySelect').value;

    if (taskInput === '') {
        alert('Por favor, insira uma tarefa.');
        return;
    }

    // Criar objeto de tarefa
    const task = {
        id: taskId++,  // Incrementa o ID
        name: taskInput,
        priority: prioritySelect,
        done: false  // Começa como não concluída
    };

    // Salvar no Firebase
    firebase.database().ref('tasks/' + task.id).set(task);

    // Atualizar a lista na interface
    addTaskToTable(task);

    // Limpar input
    document.getElementById('taskInput').value = '';
});

// Carregar tarefas ao iniciar
firebase.database().ref('tasks').on('value', function (snapshot) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Limpa a tabela

    snapshot.forEach(function (childSnapshot) {
        const task = childSnapshot.val();
        addTaskToTable(task); // Adiciona cada tarefa à tabela
    });
});

function addTaskToTable(task) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${task.id}</td>
        <td style="text-decoration: ${task.done ? 'line-through' : 'none'}">${task.name}</td>
        <td>${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</td>
        <td>
            <button class="btn btn-warning btn-sm edit-btn"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger btn-sm delete-btn"><i class="fas fa-trash-alt"></i></button>
            <button class="btn btn-success btn-sm done-btn"><i class="fas fa-check"></i></button>
        </td>
    `;

    // Eventos: Excluir, Editar, Concluir
    tr.querySelector('.delete-btn').addEventListener('click', function () {
        firebase.database().ref('tasks/' + task.id).remove();
    });

    tr.querySelector('.done-btn').addEventListener('click', function () {
        firebase.database().ref('tasks/' + task.id).update({ done: !task.done });
    });

    document.getElementById('taskList').appendChild(tr);
}
