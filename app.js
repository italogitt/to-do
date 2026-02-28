let tarefas = []

document.addEventListener("DOMContentLoaded", () => {

    let tarefasSalvas = localStorage.getItem("tarefas")

    if (tarefasSalvas){
        tarefas = JSON.parse(tarefasSalvas)
        renderizar()
    }
})

function salvarTarefas(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function adicionarTarefa(){
    let input = document.getElementById("inputTarefa")
    let texto = input.value.trim()

    if (texto === "") return
    
    tarefas.push(texto)
    input.value = ""

    salvarTarefas()
    renderizar()
}

function renderizar(){
    let lista = document.getElementById("lista")
    lista.innerHTML = ""

    tarefas.forEach((tarefa, indice) => {
        let li = document.createElement("li")
        li.textContent = tarefa

        let botao = document.createElement("button")
        botao.textContent = "Excluir"

        botao.onclick = () => {
            tarefas.splice(indice, 1)
            salvarTarefas()
            renderizar()
        }

        li.append(botao)
        lista.append(li)
    })
}

