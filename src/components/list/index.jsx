import './list.styles.css'

// import de icones
import { Trash, Pen } from 'lucide-react'

// passando as props necessarias
export function List({ titulo, itens, onClickItem, onDeleteItem, onEditItem }) {
  return (
    <div className="tarefas-todo">
      <h2 className="titulo-todo">{titulo}</h2>

      {/* listagem de cada item */}
      <ul className="lista-itens">
        {itens.map((item) => (
          <li 
            key={item.id} 
            className={item.concluida ? 'concluida' : ''}
          >
            <span 
              className="texto-tarefa"
              onClick={() => onClickItem(item.id)}
            >
              {item.texto}
            </span>

            <div className="acoes">
              <button 
                className="btn-deletar"
                onClick={() => onDeleteItem(item.id)}
              >
                <Trash />
              </button>

              <button 
                className="btn-editar"
                onClick={() => onEditItem(item.id)}
              >
                <Pen />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}