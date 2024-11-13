// Contador global de ID para as tarefas
let taskId = 1;

// Função para adicionar a tarefa
document.getElementById('addButton').addEventListener('click', function() {
    // Pegando os valores de input
    const taskInput = document.getElementById('taskInput').value.trim();
    const prioritySelect = document.getElementById('prioritySelect').value;

    // Se o campo de tarefa estiver vazio, não faz nada
    if (taskInput === '') {
        alert('Por favor, insira uma tarefa.');
        return;
    }

    // Criando a nova linha da tabela
    const tr = document.createElement('tr');

    // Definindo os valores das colunas
    const tdId = document.createElement('td');
    const tdTask = document.createElement('td');
    const tdPriority = document.createElement('td');
    const tdActions = document.createElement('td');

    // Atribuindo o número da tarefa (ID) e os valores nas colunas
    tdId.textContent = taskId++;  // Incrementa o ID a cada nova tarefa
    tdTask.textContent = taskInput;  // Nome da tarefa
    tdPriority.textContent = prioritySelect.charAt(0).toUpperCase() + prioritySelect.slice(1);  // Prioridade formatada

    // Botões de ação: editar, excluir e concluir
    tdActions.innerHTML = `
        <button class="btn btn-warning btn-sm edit-btn"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-sm delete-btn"><i class="fas fa-trash-alt"></i></button>
        <button class="btn btn-success btn-sm done-btn"><i class="fas fa-check"></i></button>
    `;

    // Adicionando a nova linha na tabela
    const taskList = document.getElementById('taskList');
    taskList.appendChild(tr);

    // Adicionando as células à linha
    tr.appendChild(tdId);
    tr.appendChild(tdTask);
    tr.appendChild(tdPriority);
    tr.appendChild(tdActions);

    // Função para excluir a tarefa
    tdActions.querySelector('.delete-btn').addEventListener('click', function() {
        tr.remove();
    });

    // Função para editar a tarefa
    tdActions.querySelector('.edit-btn').addEventListener('click', function() {
        const input = document.createElement('input');
        input.value = tdTask.textContent;  // Preenche o input com o nome da tarefa atual
        tdTask.textContent = '';  // Limpa o conteúdo da célula
        tdTask.appendChild(input);  // Coloca o input no lugar do texto

        // Salva a edição ao perder o foco ou ao pressionar Enter
        input.addEventListener('blur', function() {
            tdTask.textContent = input.value.trim() || tdTask.textContent;  // Atualiza ou mantém o original
        });

        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                tdTask.textContent = input.value.trim() || tdTask.textContent;
            }
        });
    });

    // Função para concluir (salvar) a tarefa
    tdActions.querySelector('.done-btn').addEventListener('click', function() {
        tdTask.textContent = tdTask.textContent;  // No caso do "concluir", simplesmente salva o texto
    });

    // Limpa o input de tarefa após adicionar
    document.getElementById('taskInput').value = '';
});
