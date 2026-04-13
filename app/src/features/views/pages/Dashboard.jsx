import { useState, useMemo } from "react";

const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const CAT_ICONS = {
    Alimentación: "bi-cart-fill",
    Transporte: "bi-bus-front-fill",
    Ocio: "bi-controller",
    Servicios: "bi-lightning-charge-fill",
    Salud: "bi-heart-pulse-fill",
    Ingreso: "bi-briefcase-fill",
    Ahorro: "bi-piggy-bank-fill",
    Otro: "bi-tag-fill",
};

const CAT_COLORS = {
    Alimentación: "#818cf8",
    Transporte: "#34d399",
    Ocio: "#f87171",
    Servicios: "#fb923c",
    Salud: "#38bdf8",
    Ingreso: "#22c55e",
    Ahorro: "#a78bfa",
    Otro: "#94a3b8",
};

const fmtCOP = (n) => "$" + Math.abs(n).toLocaleString("es-CO");
const hoy = () => new Date().toISOString().split("T")[0];
const mesKey = (mes, anio) => `${anio}-${String(mes + 1).padStart(2, "0")}`;

export const Dashboard = () => {
    const now = new Date();
    const [mesActual, setMesActual] = useState(now.getMonth());
    const [anioActual, setAnioActual] = useState(now.getFullYear());
    const [movimientos, setMovimientos] = useState([]);
    const [mostrarTodos, setMostrarTodos] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        fecha: hoy(), categoria: "", valor: "", descripcion: "", responsable: "",
    });

    const cambiarMes = (dir) => {
        let m = mesActual + dir;
        let a = anioActual;
        if (m > 11) { m = 0; a++; }
        if (m < 0) { m = 11; a--; }
        setMesActual(m);
        setAnioActual(a);
        setMostrarTodos(false);
    };

    const claveMes = mesKey(mesActual, anioActual);

    const movMes = useMemo(
        () => movimientos.filter((m) => m.mes === claveMes),
        [movimientos, claveMes]
    );

    const ingresos = useMemo(() =>
        movMes.filter(m => m.valor > 0).reduce((a, m) => a + m.valor, 0), [movMes]);
    const gastos = useMemo(() =>
        movMes.filter(m => m.valor < 0).reduce((a, m) => a + Math.abs(m.valor), 0), [movMes]);
    const saldo = ingresos - gastos;

    const personas = useMemo(() => [...new Set(movimientos.map(m => m.responsable))].filter(Boolean), [movimientos]);
    const personasMes = useMemo(() => [...new Set(movMes.map(m => m.responsable))].filter(Boolean), [movMes]);
    const cuota = personasMes.length > 0 ? gastos / personasMes.length : 0;

    const categorias = useMemo(() => {
        const cats = {};
        movMes.filter(m => m.valor < 0).forEach(m => {
            cats[m.categoria] = (cats[m.categoria] || 0) + Math.abs(m.valor);
        });
        return Object.entries(cats).sort((a, b) => b[1] - a[1]);
    }, [movMes]);

    const guardar = () => {
        const { fecha, categoria, valor, descripcion, responsable } = form;
        if (!fecha || !categoria || !valor || Number(valor) <= 0 || !descripcion.trim() || !responsable) {
            setError("Completa todos los campos obligatorios.");
            setTimeout(() => setError(""), 3000);
            return;
        }
        const d = new Date(fecha + "T12:00:00");
        const mes = mesKey(d.getMonth(), d.getFullYear());
        const esIngreso = categoria === "Ingreso";
        setMovimientos((prev) => [{
            id: Date.now(), fecha, categoria,
            valor: esIngreso ? Number(valor) : -Number(valor),
            descripcion: descripcion.trim(), responsable, mes,
        }, ...prev]);
        setForm({ fecha: hoy(), categoria: "", valor: "", descripcion: "", responsable: "" });
        setError("");
    };

    const txMostrar = mostrarTodos ? movMes : movMes.slice(0, 5);

    return (
        <div>

            {/* ── HEADER ── */}
            <div className="db-header-row">
                <div>
                    <h1 className="db-title">Gastos Diarios</h1>
                    <p className="db-subtitle">Control de gastos por periodo · Totales · Saldos · Liquidación</p>
                </div>
                <div className="db-mes-box">
                    <span className="db-mes-label">Mes/Año</span>
                    <button className="db-nav-btn" onClick={() => cambiarMes(-1)}>‹</button>
                    <strong className="db-mes-text">{MESES[mesActual]} {anioActual}</strong>
                    <button className="db-nav-btn" onClick={() => cambiarMes(1)}>›</button>
                </div>
            </div>

            {/* ── TARJETAS RESUMEN ── */}
            <div className="db-cards-grid">
                <div className="db-card">
                    <p className="db-card-lbl">Ingresos</p>
                    <p className="db-card-val db-card-val--indigo">{fmtCOP(ingresos)}</p>
                    <p className="db-card-chg">
                        {ingresos > 0 ? `${movMes.filter(m => m.valor > 0).length} movimiento(s)` : "Sin movimientos"}
                    </p>
                </div>
                <div className="db-card">
                    <p className="db-card-lbl">Gastos Totales</p>
                    <p className="db-card-val db-card-val--red">{fmtCOP(gastos)}</p>
                    <p className="db-card-chg">
                        {gastos > 0 ? `${movMes.filter(m => m.valor < 0).length} gasto(s)` : "Sin gastos"}
                    </p>
                </div>
                <div className="db-card">
                    <p className="db-card-lbl">Saldo Disponible</p>
                    <p className={`db-card-val ${saldo >= 0 ? "db-card-val--green" : "db-card-val--red"}`}>
                        {fmtCOP(saldo)}
                    </p>
                    <p className={`db-card-chg ${saldo >= 0 ? "db-card-chg--green" : "db-card-chg--red"}`}>
                        {saldo >= 0 ? "Positivo ✓" : "Negativo ✗"}
                    </p>
                </div>
                <div className="db-card">
                    <p className="db-card-lbl">Transacciones</p>
                    <p className="db-card-val db-card-val--orange">{movMes.length}</p>
                    <p className="db-card-chg">Este mes</p>
                </div>
            </div>

            {/* ── GRID PRINCIPAL ── */}
            <div className="db-main-grid">

                {/* COLUMNA IZQUIERDA */}
                <div className="db-left-col">

                    {/* Formulario */}
                    <div className="db-panel">
                        <p className="db-panel-title">Registrar gasto</p>
                        <p className="db-panel-sub">Completa los datos para registrar un nuevo movimiento</p>

                        <div className="db-form-row3">
                            <div>
                                <label className="db-label">Fecha</label>
                                <input className="db-input" type="date" value={form.fecha}
                                    onChange={e => setForm({ ...form, fecha: e.target.value })} />
                            </div>
                            <div>
                                <label className="db-label">Categoría</label>
                                <select className="db-input" value={form.categoria}
                                    onChange={e => setForm({ ...form, categoria: e.target.value })}>
                                    <option value="">Seleccione...</option>
                                    {Object.keys(CAT_ICONS).map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="db-label">Valor ($)</label>
                                <input className="db-input" type="number" min="0" placeholder="Ej: 45000"
                                    value={form.valor}
                                    onChange={e => setForm({ ...form, valor: e.target.value })} />
                            </div>
                        </div>

                        <div className="db-form-row2">
                            <div>
                                <label className="db-label">Descripción</label>
                                <input className="db-input" type="text" placeholder="Detalle del movimiento"
                                    value={form.descripcion}
                                    onChange={e => setForm({ ...form, descripcion: e.target.value })} />
                            </div>
                            <div>
                                <label className="db-label">Responsable</label>
                                <select className="db-input" value={form.responsable}
                                    onChange={e => setForm({ ...form, responsable: e.target.value })}>
                                    <option value="">Seleccione...</option>
                                    <option>Emily</option>
                                    <option>Andres</option>
                                </select>
                            </div>
                        </div>

                        <div className="db-btn-row">
                            <button className="db-btn-save" onClick={guardar}>
                                <i className="bi bi-floppy-fill" /> Guardar
                            </button>
                            <span className="db-tip">Tip: el resumen y la tabla se filtran por el mes/año elegido.</span>
                        </div>
                        {error && <p className="db-error">{error}</p>}
                    </div>

                    {/* Transacciones */}
                    <div className="db-panel">
                        <div className="db-panel-header">
                            <span className="db-panel-title">Últimas transacciones</span>
                            {movMes.length > 5 && (
                                <button className="db-link-btn" onClick={() => setMostrarTodos(!mostrarTodos)}>
                                    {mostrarTodos ? "Ver menos" : "Ver todas →"}
                                </button>
                            )}
                        </div>

                        {movMes.length === 0 ? (
                            <p className="db-empty">Sin movimientos este mes. ¡Agrega el primero!</p>
                        ) : (
                            <div className="db-tx-list">
                                {txMostrar.map((t) => {
                                    const color = t.valor > 0 ? "#22c55e" : (CAT_COLORS[t.categoria] || "#94a3b8");
                                    const icon = CAT_ICONS[t.categoria] || "bi-tag-fill";
                                    const amtColor = t.valor > 0 ? "#22c55e" : "#f87171";
                                    const amtStr = (t.valor > 0 ? "+" : "-") + fmtCOP(t.valor);
                                    return (
                                        <div key={t.id} className="db-tx-row">
                                            <div className="db-tx-icon" style={{ background: color + "18" }}>
                                                <i className={`bi ${icon}`} style={{ fontSize: "13px", color }} />
                                            </div>
                                            <div className="db-tx-info">
                                                <p className="db-tx-name">{t.descripcion}</p>
                                                <p className="db-tx-meta">{t.categoria} · {t.responsable} · {t.fecha}</p>
                                            </div>
                                            <span className="db-tx-amt" style={{ color: amtColor }}>{amtStr}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* COLUMNA DERECHA */}
                <div className="db-right-col">

                    {/* Resumen */}
                    <div className="db-panel">
                        <div className="db-panel-header">
                            <span className="db-panel-title">Resumen</span>
                            <span className="db-badge-mes">{claveMes}</span>
                        </div>

                        <div className="db-res-row">
                            <span className="db-res-lbl">Total gastos</span>
                            <span className="db-res-val db-res-val--red">{fmtCOP(gastos)}</span>
                        </div>
                        <div className="db-res-row">
                            <span className="db-res-lbl">Total ingresos</span>
                            <span className="db-res-val db-res-val--indigo">{fmtCOP(ingresos)}</span>
                        </div>
                        <div className="db-res-row db-res-row--last">
                            <span className="db-res-lbl">Cuota por responsable</span>
                            <span className="db-res-val">{fmtCOP(cuota)}</span>
                        </div>

                        <p className="db-sec-lbl">TOTALES / SALDOS</p>

                        {personas.length === 0 ? (
                            <p className="db-empty">Sin responsables aún.</p>
                        ) : (
                            personas.map((p) => {
                                const gastoP = movMes.filter(m => m.responsable === p && m.valor < 0).reduce((a, m) => a + Math.abs(m.valor), 0);
                                const ingresoP = movMes.filter(m => m.responsable === p && m.valor > 0).reduce((a, m) => a + m.valor, 0);
                                const cuotaP = personasMes.includes(p) ? cuota : 0;
                                const saldoP = gastoP - cuotaP;
                                return (
                                    <div key={p} className="db-persona-card">
                                        <div className="db-persona-header">
                                            <span className="db-persona-name">{p}</span>
                                            <span className={saldoP <= 0 ? "db-badge-aldia" : "db-badge-debe"}>
                                                {saldoP <= 0 ? "Al día" : "Debe"}
                                            </span>
                                        </div>
                                        <div className="db-persona-row">
                                            <span>Gastos</span>
                                            <span className="db-persona-val">{fmtCOP(gastoP)}</span>
                                        </div>
                                        <div className="db-persona-row">
                                            <span>Ingresos</span>
                                            <span className="db-persona-val--green">{fmtCOP(ingresoP)}</span>
                                        </div>
                                        <div className="db-persona-row">
                                            <span>Cuota</span>
                                            <span className="db-persona-val">{fmtCOP(cuotaP)}</span>
                                        </div>
                                        <div className="db-persona-row db-persona-row--saldo">
                                            <span>Saldo</span>
                                            <span className={saldoP <= 0 ? "db-persona-saldo--ok" : "db-persona-saldo--mal"}>
                                                {saldoP <= 0 ? "+" : "-"}{fmtCOP(Math.abs(saldoP))}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Por categoría */}
                    <div className="db-panel">
                        <p className="db-panel-title db-panel-title--mb">Por categoría</p>
                        {categorias.length === 0 ? (
                            <p className="db-empty">Sin gastos aún.</p>
                        ) : (
                            categorias.map(([cat, val]) => {
                                const pct = Math.round((val / gastos) * 100);
                                const color = CAT_COLORS[cat] || "#94a3b8";
                                return (
                                    <div key={cat} className="db-cat-item">
                                        <div className="db-cat-row">
                                            <span className="db-cat-lbl">
                                                <i className={`bi ${CAT_ICONS[cat] || "bi-tag-fill"}`} style={{ marginRight: "6px", color }} />
                                                {cat}
                                            </span>
                                            <span className="db-cat-val">{fmtCOP(val)} ({pct}%)</span>
                                        </div>
                                        <div className="db-track">
                                            <div className="db-bar" style={{ width: `${pct}%`, background: color }} />
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};
