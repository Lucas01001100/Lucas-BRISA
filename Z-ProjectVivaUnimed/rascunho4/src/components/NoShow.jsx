import Sidebar from "./Sidebar";

export default function NoShow({ go }) {
  return (
    <div className="screen active">
      <Sidebar go={go} />
      <div className="main">
        <h1>Nova Vaga No-Show</h1>
        <div className="form">
          <label>Profissional</label>
          <select></select>
          <label>Especialidade</label>
          <select></select>

          <div className="form-row">
            <div className="form-group">
              <label>Unidade</label>
              <select></select>
            </div>
            <div className="form-group">
              <label>Data</label>
              <input type="date" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Horário</label>
              <input type="time" />
            </div>
            <div className="form-group">
              <label>Tipo</label>
              <div className="alert-box">No-show</div>
            </div>
          </div>

          <button className="full-btn">Cadastrar Vaga</button>
        </div>
      </div>
    </div>
  );
}
