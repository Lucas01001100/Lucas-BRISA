export default function Sidebar({ go }) {
  return (
    <div className="sidebar">
      <div className="logo">Unimed</div>
      <div className="menu-item" onClick={() => go("dashboard")}>Dashboard</div>
      <div className="menu-item" onClick={() => go("agenda")}>Agenda</div>
      <div className="menu-item" onClick={() => go("profissionais")}>Cadastro Profissionais</div>
      <div className="menu-item" onClick={() => go("noshow")}>Cadastro No-show</div>
    </div>
  );
}
