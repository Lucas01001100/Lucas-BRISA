import Sidebar from "./Sidebar";

export default function Agenda({ go }) {
  const hoje = new Date();
  const diasNoMes = new Date(
    hoje.getFullYear(),
    hoje.getMonth() + 1,
    0
  ).getDate();

  const dias = Array.from({ length: diasNoMes }, (_, i) => i + 1);

  return (
    <div className="screen active">
      <Sidebar go={go} />
      <div className="main">
        <h1>Agenda</h1>
        <div className="grid grid-3">
          <div className="card">
            <div className="calendar">
              {dias.map((dia) => (
                <div
                  key={dia}
                  className={`day ${dia === hoje.getDate() ? "active" : ""}`}
                >
                  {dia}
                </div>
              ))}
            </div>
          </div>
          <div></div>
          <div className="card">
            <h3>Consultas</h3>
            <div className="appointment confirmed">08:00 Confirmada</div>
            <div className="appointment noshow">09:15 No-show</div>
            <div className="appointment pending">10:30 Pendente</div>
            <div className="appointment done">11:45 Realizada</div>
          </div>
        </div>
      </div>
    </div>
  );
}
