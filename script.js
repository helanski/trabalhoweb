/// script.js

// Arrays para armazenar as tarefas por prioridade
let highPriorityTasks = [];
let mediumPriorityTasks = [];
let lowPriorityTasks = [];

document.getElementById('addButton').addEventListener('click', function() {
  const taskInput = document.getElementById('taskInput').value.trim();
  const prioritySelect = document.getElementById('prioritySelect').value;
  
  // Verifica se o input de tarefa não está vazio
  if (taskInput !== '') {
    // Cria o objeto da tarefa
    const newTask = {
      task: taskInput,
      priority: prioritySelect
    };
    
    // Adiciona a tarefa ao array da prioridade correspondente
    if (prioritySelect === 'alta') {
      highPriorityTasks.push(newTask);
    } else if (prioritySelect === 'media') {
      mediumPriorityTasks.push(newTask);
    } else {
      lowPriorityTasks.push(newTask);
    }
    
    // Atualiza a tabela exibindo as tarefas ordenadas por prioridade
    updateTaskTable();
    
    // Limpa o campo de input
    document.getElementById('taskInput').value = '';
  } else {
    alert("Por favor, insira uma tarefa.");
  }
});

// Função para atualizar a tabela com as tarefas organizadas por prioridade
function updateTaskTable() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Limpa a tabela antes de atualizar

  // Função para criar uma linha de tarefa
  function createRow(task, index) {
    const row = document.createElement('tr');
    
    // Número da tarefa
    const taskNumberCell = document.createElement('td');
    taskNumberCell.textContent = index + 1;
    
    // Nome da tarefa
    const taskNameCell = document.createElement('td');
    taskNameCell.textContent = task.task;
    
    // Prioridade
    const priorityCell = document.createElement('td');
    priorityCell.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
    priorityCell.classList.add(`${task.priority}-priority`); // Aplica a classe de prioridade

    // Ações (ícone de editar e excluir)
    const actionCell = document.createElement('td');
    actionCell.innerHTML = `
      <i class="fa fa-edit action-btn" onclick="editTask(${index}, '${task.priority}')"></i>
      <i class="fa fa-trash action-btn ms-2" onclick="deleteTask(${index}, '${task.priority}')"></i>
    `;
    
    // Adiciona as células na linha
    row.appendChild(taskNumberCell);
    row.appendChild(taskNameCell);
    row.appendChild(priorityCell);
    row.appendChild(actionCell);

    return row;
  }

  // Exibe as tarefas na ordem correta: alta > média > baixa
  const allTasks = [
    ...highPriorityTasks.map((task, index) => createRow(task, index)),
    ...mediumPriorityTasks.map((task, index) => createRow(task, index)),
    ...lowPriorityTasks.map((task, index) => createRow(task, index))
  ];

  // Adiciona as linhas da tabela
  allTasks.forEach(row => taskList.appendChild(row));
}

// Função para editar a tarefa
function editTask(index, priority) {
  const newTaskName = prompt("Editar tarefa:", getTaskNameByPriority(index, priority));
  if (newTaskName) {
    // Atualiza o nome da tarefa no array
    if (priority === 'alta') {
      highPriorityTasks[index].task = newTaskName;
    } else if (priority === 'media') {
      mediumPriorityTasks[index].task = newTaskName;
    } else {
      lowPriorityTasks[index].task = newTaskName;
    }
    
    // Atualiza a tabela
    updateTaskTable();
  }
}

// Função para apagar a tarefa
function deleteTask(index, priority) {
  // Remove a tarefa do array de acordo com a prioridade
  if (priority === 'alta') {
    highPriorityTasks.splice(index, 1);
  } else if (priority === 'media') {
    mediumPriorityTasks.splice(index, 1);
  } else {
    lowPriorityTasks.splice(index, 1);
  }

  // Atualiza a tabela
  updateTaskTable();
}
