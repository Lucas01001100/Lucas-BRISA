import Sidebar from "./Sidebar";

export default function Profissionais({ go }) {
  return (
    <div className="screen active">
      <Sidebar go={go} />
      <div className="main">
        <div className="header">
          <h1>Cadastro de Profissionais</h1>
          <button>Salvar</button>
        </div>
        <div className="grid grid-2">
          <div className="card">
            <label>Nome</label>
            <input />
            <label>CRM</label>
            <input />
            <label>Especialidade</label>
            <select></select>
          </div>
          <div className="card">
            <label>Horário</label>
            <input type="time" />
          </div>
        </div>
      </div>
    </div>
  );
}
