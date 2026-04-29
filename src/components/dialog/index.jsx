import { useState, useEffect } from 'react';
import './dialog.styles.css';

export function Dialog({ aberto, fechar, onSalvar, tarefa }) {
  const [input, setInput] = useState('');

  // Preenche o input com o texto da tarefa ao editar
  // ou limpa o campo ao criar uma nova tarefa
  useEffect(() => {
    if (tarefa) {
      setInput(tarefa.texto);
    } else {
      setInput('');
    }
  }, [tarefa]);

  // Não renderiza o dialog se estiver fechado
  if (!aberto) return null;

  // Salva o valor do input
  function handleSalvar() {
    if (!input.trim()) return;

    onSalvar(input);
    setInput('');
  }

  // Fecha o dialog e limpa o input
  function handleFechar() {
    setInput('');
    fechar();
  }

  return (
    <div className="dialog">
      <div className="dialog-content">
        {/* Define o título conforme o modo (editar ou criar) */}
        <h2 className="dialog-title">
          {tarefa ? 'Editar tarefa' : 'Nova tarefa'}
        </h2>

        {/* Campo de entrada da tarefa */}
        <input
          className="dialog-input"
          type="text"
          placeholder="Digite a tarefa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Ações do dialog */}
        <div className="dialog-actions">
          <button 
            className="btn-cancelar"
            onClick={handleFechar}
          >
            Cancelar
          </button>

          <button 
            className="btn-salvar"
            onClick={handleSalvar}
          >
            {tarefa ? 'Editar' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
}