let tarefas = []
let filtroAtual = "todas"

document.addEventListener("DOMContentLoaded", () => {

    let tarefasSalvas = localStorage.getItem("tarefas")

    if (tarefasSalvas){
        tarefas = JSON.parse(tarefasSalvas)
        renderizar()
    }

    let input = document.getElementById("inputTarefa")

    input.addEventListener("keydown", (e) => {
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

function atualizarContador(){
    let total = tarefas.length
    let concluidas = tarefas.filter(t => t.concluida).length
    let pendentes = total - concluidas

    let contador = document.getElementById("contador")
    contador.textContent = `Total: ${total} | Pendentes : ${pendentes} | Concluidas : ${concluidas}  `
}

function limparConcluidas(){
    tarefas = tarefas.filter(t => !t.concluida)
    salvarTarefas()
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

        let botaoExcluir = document.createElement("button")
        botaoExcluir.textContent = "Excluir"

        let botaoEditar= document.createElement("button")
        botaoEditar.textContent = "Editar"

        botaoExcluir.onclick = () => {
            tarefas.splice(indice, 1)
            salvarTarefas()
            renderizar()
        }

        botaoEditar.onclick = () => {
            let inputEdicao = document.createElement("input")
            inputEdicao.value = tarefa.texto
            inputEdicao.focus()

            inputEdicao.addEventListener("keydown", (e) => {
                if (e.key === "Enter"){
                    let novoTexto = inputEdicao.value.trim()
                    if (novoTexto === "") return
                    tarefa.texto = novoTexto
                    salvarTarefas()
                    renderizar()
                }  
                if (e.key === "Escape") {
                    renderizar()
                }
            })

            let botaoSalvar = document.createElement("button")
            botaoSalvar.textContent = "Salvar"

            botaoSalvar.onclick = () => {
                let novoTexto = inputEdicao.value.trim()
                if (novoTexto === "") return
                tarefa.texto = novoTexto
                salvarTarefas()
                renderizar()
            }

            li.innerHTML = ""
            li.append(inputEdicao)
            li.append(botaoSalvar)
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
        li.append(botaoExcluir)
        li.append(botaoEditar)
        lista.append(li)
    })

    atualizarContador()
}

