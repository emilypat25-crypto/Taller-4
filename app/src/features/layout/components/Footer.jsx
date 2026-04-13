export const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { label: "Privacidad", icon: "bi-shield-check" },
    { label: "Términos", icon: "bi-file-text" },
    { label: "Soporte", icon: "bi-headset" },
  ];

  return (
    <footer
      className="d-flex flex-column flex-md-row align-items-center justify-content-between px-4 py-3 gap-2"
      style={{
        borderTop: "1px solid rgba(124,58,237,0.1)",
        background: "rgba(15,12,26,0.5)",
        backdropFilter: "blur(8px)",
        fontSize: "12px",
      }}
    >
      {/* Logo + copyright */}
      <div className="d-flex align-items-center gap-2" style={{ color: "#334155" }}>
        <div
          className="d-flex align-items-center justify-content-center rounded-2"
          style={{ width: 20, height: 20, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", fontSize: "10px", color: "#fff" }}
        >
          $
        </div>
        <span>© {year} FinanzApp</span>
        <span style={{ color: "#1e293b" }}>·</span>
        <span>Todos los derechos reservados</span>
      </div>

      {/* Links */}
      <div className="d-flex align-items-center gap-3">
        {links.map(({ label, icon }) => (
          <button
            key={label}
            className="d-flex align-items-center gap-1 border-0 bg-transparent p-0"
            style={{ color: "#334155", cursor: "pointer", transition: "color .2s", fontSize: "12px" }}
            onMouseEnter={e => e.currentTarget.style.color = "#a78bfa"}
            onMouseLeave={e => e.currentTarget.style.color = "#334155"}
          >
            <i className={`bi ${icon}`} style={{ fontSize: "11px" }} />
            {label}
          </button>
        ))}
      </div>

      {/* Estado del sistema */}
      <div className="d-flex align-items-center gap-2" style={{ color: "#334155" }}>
        <span
          className="rounded-circle d-inline-block"
          style={{ width: 6, height: 6, background: "#22c55e", boxShadow: "0 0 5px #22c55e" }}
        />
        <span>Sistema operativo</span>
      </div>
    </footer>
  );
};
