let taskId = 1; // Inicializa o ID global para as tarefas

// Importar as funções necessárias
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";  // Importando a base de dados
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";  // Importando o app Firebase

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2QLXenwC9L1qqS4XiyYBW4ej4b7KvbhA",
  authDomain: "todolist-caf75.firebaseapp.com",
  projectId: "todolist-caf75",
  storageBucket: "todolist-caf75.firebasestorage.app",
  messagingSenderId: "1084216683407",
  appId: "1:1084216683407:web:0b8e3478020698ce66b9fa",
  measurementId: "G-XGXZ33MYX4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);  // Obter referência ao banco de dados

document.getElementById('addButton').addEventListener('click', function() {
  const taskInput = document.getElementById('taskInput').value.trim();
  const prioritySelect = document.getElementById('prioritySelect').value;

  if (taskInput === '') {
    alert('Por favor, insira uma tarefa.');
    return;
  }

  // Referência ao banco de dados para adicionar a tarefa
  const taskData = {
    id: Date.now(),
    task: taskInput,
    priority: prioritySelect,
    completed: false
  };

  // Adicionando a tarefa ao banco de dados
  const taskRef = ref(database, 'tasks');
  push(taskRef, taskData)
    .then(() => {
      console.log('Tarefa salva com sucesso no Firebase!');
    })
    .catch((error) => {
      console.error('Erro ao salvar a tarefa:', error);
    });

  // Limpa o campo de input
  document.getElementById('taskInput').value = '';
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
