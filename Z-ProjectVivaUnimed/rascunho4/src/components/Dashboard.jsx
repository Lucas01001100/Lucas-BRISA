import Sidebar from "./Sidebar";

export default function Dashboard({ go }) {
  return (
    <div className="screen active">
      <Sidebar go={go} />
      <div className="main">
        <h1>Visão Geral Operacional</h1>
        <div className="grid grid-3">
          <div className="card">
            <div>Taxa de No-show</div>
            <div className="metric">00.0%</div>
          </div>
          <div className="card">
            <div>Taxa de Ocupação</div>
            <div className="metric">00.0%</div>
          </div>
          <div className="card">Frequência semanal</div>
        </div>
        <div className="card">Alerta crítico</div>
        <div className="card">Insight estratégico</div>
      </div>
    </div>
  );
}
