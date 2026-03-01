let tarefas = []
let filtroAtual = "todas"

document.addEventListener("DOMContentLoaded", () => {

    let tarefasSalvas = localStorage.getItem("tarefas")

    if (tarefasSalvas){
        tarefas = JSON.parse(tarefasSalvas)
        renderizar()
    }

    let input = document.getElementById("inputTarefa")

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            adicionarTarefa()
        }
    })
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

function mudarFiltro(novoFiltro){
    filtroAtual = novoFiltro
    renderizar()
}

function renderizar(){
    let lista = document.getElementById("lista")
    lista.innerHTML = ""

    tarefas.forEach((tarefa, indice) => {
        if (filtroAtual === "pendentes" && tarefa.concluida === true){
            return
        } else if (filtroAtual === "concluidas" && tarefa.concluida === false){
            return
        } 

        let li = document.createElement("li")

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

        if (tarefa.concluida === true ){
            li.style.textDecoration = "line-through"
            li.style.opacity = "0.6"
        } else {
            li.style.textDecoration = "none"
            li.style.opacity = "1"
        }

        li.append(checkbox)
        li.append(document.createTextNode(" " + tarefa.texto))
        li.append(botao)
        lista.append(li)
    })
}

