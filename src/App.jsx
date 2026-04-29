import { useState, useEffect } from 'react'
import './App.css'
import { List } from './components/list'
import { Dialog } from './components/dialog';

function App() {

  // use state para controlar o abrir e fechar
  const [abrirDialog, setAbrirDialog] = useState(false);

  // use state para editar
  const [tarefaEditando, setTarefaEditando] = useState(null);

  // carregar tarefas
  function carregarTarefas() {
    const dados = localStorage.getItem('tarefas');

    if (!dados) return [];

    return JSON.parse(dados);
  }

  const [tarefas, setTarefas] = useState(() => carregarTarefas());

  // filtro para saber quais tarefas estao concluidas e quais nao
  const tarefasFazer = tarefas.filter(t => !t.concluida);
  const tarefasConcluidas = tarefas.filter(t => t.concluida);

  // funcao para deletar as tarefas
  function deletarTarefa(id) {
    setTarefas(prev => prev.filter(tarefa => tarefa.id !== id));
  }

  // funcao para editar as tarefas
  function editarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    setTarefaEditando(tarefa);
    setAbrirDialog(true);
  }



  // funcoes para abrir e fechar o modal de adicionar tarefa 
  function AbrirAddTarefa() {
    setTarefaEditando(null);
    setAbrirDialog(true);
  }

  function FecharAddTarefa() {
    setAbrirDialog(false);
  }


  // funcao para adicionar nova tarefa
  function salvarTarefa(texto) {
    if (tarefaEditando) {
      // EDITAR
      setTarefas(prev =>
        prev.map(t =>
          t.id === tarefaEditando.id
            ? { ...t, texto }
            : t
        )
      );
    } else {
      // ADICIONAR
      const nova = {
        id: Date.now(),
        texto,
        concluida: false
      };

      setTarefas(prev => [...prev, nova]);
    }

    setTarefaEditando(null);
    FecharAddTarefa();
  }

  // funcao para mudar o status da tarefa
  function toggleTarefa(id) {
    setTarefas(prev =>
      prev.map(tarefa =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }

  // renderizar as tarefas quando adicionar ou editar
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);
  return (
    <>
      <section className='lista-todo'>
        <h1 className='titulo-principal'>Todo List</h1>
        {/* utilizando o componente para ter as duas listas */}
        <List
          titulo="Para fazer"
          itens={tarefasFazer}
          onClickItem={toggleTarefa}
          onDeleteItem={deletarTarefa}
          onEditItem={editarTarefa}
        />

        <List
          titulo="Concluídas"
          itens={tarefasConcluidas}
          onClickItem={toggleTarefa}
          onDeleteItem={deletarTarefa}
          onEditItem={editarTarefa}
        />
        <button onClick={AbrirAddTarefa} className='btn-add-tarefa'>Adicionar tarefa</button>

        {/* modal para editar ou adicionar uma nova tarefa */}
        <Dialog aberto={abrirDialog} fechar={FecharAddTarefa} onSalvar={salvarTarefa} tarefa={tarefaEditando} />
      </section>
    </>
  )
}

export default App
