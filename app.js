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
    let tarefa = {
        texto: input.value.trim(),
        concluida: false
    }

    if (tarefa.texto === "") return
    
    tarefas.push(tarefa)
    input.value = ""

    salvarTarefas()
    renderizar()
}

function renderizar(){
    let lista = document.getElementById("lista")
    lista.innerHTML = ""

    tarefas.forEach((tarefa, indice) => {
        let li = document.createElement("li")
        li.textContent = tarefa.texto

        let botao = document.createElement("button")
        botao.textContent = "Excluir"

        botao.onclick = () => {
            tarefas.splice(indice, 1)
            salvarTarefas()
            renderizar()
        }

        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"

        checkbox.checked = tarefa.concluida

        checkbox.onchange = () => {
            tarefa.concluida = checkbox.checked
            salvarTarefas()
            renderizar()
        }

        li.append(checkbox)
        li.append(botao)
        lista.append(li)
    })
}

