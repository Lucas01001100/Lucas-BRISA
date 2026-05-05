export default function Login({ go }) {
  return (
    <div className="screen active">
      <div className="login-container">
        <div className="login-left">
          <div className="logo">Unimed</div>
          <h2>Agenda VivaUnimed</h2>
        </div>

        <div className="login-right">
          <div className="login-box">
            <h2>Bem-vindo</h2>
            <input placeholder="E-mail" />
            <input type="password" placeholder="Senha" />
            <button className="full-btn" onClick={() => go("dashboard")}>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
