let tarefas = []

function adicionarTarefa(){
    let input = document.getElementById("inputTarefa")
    let texto = input.value

    if (texto === "") return

    tarefas.push(texto)

    input.value = ""
    renderizar()
}

function renderizar(){
    let lista = document.getElementById("lista")
    lista.innerHTML = ""

    tarefas.forEach(tarefa => {
        lista.innerHTML += `<li>${tarefa}</li>`
    });
}