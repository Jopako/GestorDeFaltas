import React, { useState } from 'react'
import { alunos, turmas } from '../data'

const COLORS = {
  navy: '#1a3a5c',
  blue: '#2c5282',
  blueMid: '#3a6ea8',
  bg: '#f0f4f9',
  cardBg: '#fff',
  border: '#ccd3dc',
  headerBg: '#e8edf3',
  danger: '#c62828',
  dangerBg: '#ffebee',
  warn: '#e65100',
  warnBg: '#fff3e0',
  ok: '#2e7d32',
  okBg: '#e8f5e9',
  text: '#1a1a2e',
  muted: '#5a6475',
}

const s = {
  page: { fontFamily: "'IBM Plex Sans', sans-serif", background: COLORS.bg, minHeight: '100vh' },
  topbar: {
    background: COLORS.navy,
    color: '#fff',
    padding: '10px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
  },
  breadcrumb: {
    background: '#dde4ee',
    padding: '6px 24px',
    fontSize: '12px',
    color: '#555',
    borderBottom: `1px solid ${COLORS.border}`,
  },
  main: { padding: '24px', maxWidth: '960px', margin: '0 auto' },
  card: {
    background: COLORS.cardBg,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '6px',
    marginBottom: '20px',
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
  },
  cardHeader: {
    background: COLORS.blue,
    color: '#fff',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: '500',
  },
  cardBody: { padding: '20px' },
  label: { fontSize: '13px', color: COLORS.muted, display: 'block', marginBottom: '4px', fontWeight: '500' },
  input: (err) => ({
    border: `1.5px solid ${err ? COLORS.danger : COLORS.border}`,
    borderRadius: '4px',
    padding: '8px 12px',
    fontSize: '13px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s',
    background: err ? COLORS.dangerBg : '#fff',
  }),
  errMsg: { color: COLORS.danger, fontSize: '12px', marginTop: '4px', display: 'block' },
  hint: { color: COLORS.muted, fontSize: '12px', marginTop: '3px', display: 'block' },
  suggest: {
    border: `1px solid ${COLORS.border}`,
    borderRadius: '4px',
    background: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    top: '100%',
    left: 0,
  },
  suggestItem: {
    padding: '9px 14px',
    fontSize: '13px',
    cursor: 'pointer',
    borderBottom: `1px solid ${COLORS.border}`,
    transition: 'background 0.15s',
  },
  btnPrimary: {
    background: COLORS.blue,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '9px 24px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
  },
  btnSecondary: {
    background: '#fff',
    color: COLORS.muted,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '4px',
    padding: '9px 16px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
  th: {
    background: COLORS.headerBg,
    border: `1px solid ${COLORS.border}`,
    padding: '8px 12px',
    textAlign: 'left',
    fontWeight: '500',
    color: COLORS.text,
    whiteSpace: 'nowrap',
  },
  td: { border: `1px solid ${COLORS.border}`, padding: '8px 12px', color: COLORS.text },
  badge: (nivel) => ({
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '500',
    background: nivel === 'critico' ? COLORS.dangerBg : nivel === 'alerta' ? COLORS.warnBg : COLORS.okBg,
    color: nivel === 'critico' ? COLORS.danger : nivel === 'alerta' ? COLORS.warn : COLORS.ok,
  }),
}

function nivel(pct, max) {
  const limite = max * 100 / 100
  if (pct >= 25) return 'critico'
  if (pct >= 15) return 'alerta'
  return 'ok'
}

export default function V3() {
  const [busca, setBusca] = useState('')
  const [sugestoes, setSugestoes] = useState([])
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')
  const [showSug, setShowSug] = useState(false)

  function onInput(e) {
    const val = e.target.value
    setBusca(val)
    setErro('')
    if (val.length >= 2) {
      const sug = alunos.filter(
        a => a.nome.toLowerCase().includes(val.toLowerCase()) || a.matricula.includes(val)
      )
      setSugestoes(sug)
      setShowSug(true)
    } else {
      setSugestoes([])
      setShowSug(false)
    }
  }

  function selecionarAluno(aluno) {
    setBusca(aluno.nome)
    setShowSug(false)
    setSugestoes([])
    executarBusca(aluno)
  }

  function executarBusca(alunoFixo) {
    const q = busca.trim()
    if (!q) {
      setErro('Por favor, informe o nome ou matrícula do discente.')
      return
    }
    setLoading(true)
    setErro('')
    setTimeout(() => {
      const found = alunoFixo || alunos.find(
        a => a.matricula === q || a.nome.toLowerCase().includes(q.toLowerCase())
      )
      setLoading(false)
      if (found) {
        setResultado(found)
      } else {
        setErro('Nenhum discente encontrado com esse nome ou matrícula. Verifique os dados informados.')
        setResultado(null)
      }
    }, 700)
  }

  function limpar() {
    setBusca('')
    setResultado(null)
    setErro('')
    setSugestoes([])
  }

  return (
    <div style={s.page}>
      <div style={s.topbar}>
        <span style={{ fontWeight: '500' }}>SIGAA</span>
        <span>|</span>
        <span>Sistema Integrado de Gestão de Atividades Acadêmicas</span>
      </div>
      <div style={s.breadcrumb}>
        Graduação &rsaquo; Relatório de Faltas &rsaquo; <b>Buscar Discente</b>
      </div>

      <div style={s.main}>
        <div style={s.card}>
          <div style={s.cardHeader}>Critérios de Busca</div>
          <div style={s.cardBody}>
            <p style={{ fontSize: '13px', color: COLORS.muted, marginTop: 0 }}>
              Informe o nome completo ou número de matrícula do discente. Os resultados exibem
              as turmas abertas no período selecionado.
            </p>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ flex: '2 1 240px', position: 'relative' }}>
                <label style={s.label}>Nome ou Matrícula *</label>
                <input
                  style={s.input(!!erro)}
                  value={busca}
                  onChange={onInput}
                  onKeyDown={e => e.key === 'Enter' && executarBusca()}
                  onBlur={() => setTimeout(() => setShowSug(false), 200)}
                  placeholder="Ex: Ana Beatriz ou 20230001"
                  autoComplete="off"
                />
                {erro && <span style={s.errMsg}>⚠ {erro}</span>}
                {!erro && <span style={s.hint}>Digite ao menos 2 caracteres para sugestões</span>}

                {showSug && sugestoes.length > 0 && (
                  <div style={s.suggest}>
                    {sugestoes.map(a => (
                      <div
                        key={a.matricula}
                        style={s.suggestItem}
                        onMouseDown={() => selecionarAluno(a)}
                        onMouseEnter={e => e.target.style.background = '#f0f4f9'}
                        onMouseLeave={e => e.target.style.background = '#fff'}
                      >
                        <strong>{a.nome}</strong>
                        <span style={{ color: COLORS.muted, fontSize: '12px', marginLeft: '8px' }}>
                          {a.matricula}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ flex: '1 1 130px' }}>
                <label style={s.label}>Período</label>
                <select style={{ ...s.input(false), cursor: 'pointer' }}>
                  <option>2026 - 1</option>
                  <option>2025 - 2</option>
                  <option>2025 - 1</option>
                </select>
                <span style={s.hint}>Semestre letivo</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button style={s.btnPrimary} onClick={() => executarBusca()} disabled={loading}>
                {loading ? '⏳ Buscando...' : '🔍 Buscar'}
              </button>
              <button style={s.btnSecondary} onClick={limpar}>Limpar</button>
            </div>
          </div>
        </div>

        {resultado && (
          <div style={s.card}>
            <div style={s.cardHeader}>
              Faltas — {resultado.nome}
              <span style={{ marginLeft: '12px', fontWeight: '300', fontSize: '12px', opacity: 0.8 }}>
                Matrícula: {resultado.matricula}
              </span>
            </div>
            <div style={s.cardBody}>
              <p style={{ fontSize: '12px', color: COLORS.muted, marginTop: 0, marginBottom: '12px' }}>
                <span style={s.badge('ok')}>&#9679; Normal</span>{' '}
                <span style={s.badge('alerta')}>&#9679; Atenção ≥ 15%</span>{' '}
                <span style={s.badge('critico')}>&#9679; Crítico ≥ 25%</span>
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={s.table}>
                  <thead>
                    <tr>
                      {['Período', 'Componente', 'Aulas', '% Faltas', 'Faltas', 'Situação'].map(h => (
                        <th key={h} style={s.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {turmas.map(t => {
                      const faltas = resultado.turmas[t.id] || 0
                      const pct = Math.round((faltas / t.aulas) * 100)
                      const nv = nivel(pct)
                      return (
                        <tr key={t.id}>
                          <td style={s.td}>2026 - 1</td>
                          <td style={s.td}><code style={{ fontSize: '12px' }}>{t.id}</code> {t.nome}</td>
                          <td style={s.td}>{t.aulas}</td>
                          <td style={{ ...s.td, fontWeight: '500', color: nv === 'critico' ? COLORS.danger : nv === 'alerta' ? COLORS.warn : COLORS.ok }}>
                            {pct}%
                          </td>
                          <td style={s.td}>{faltas}</td>
                          <td style={s.td}>
                            <span style={s.badge(nv)}>
                              {nv === 'critico' ? 'Crítico' : nv === 'alerta' ? 'Atenção' : 'Normal'}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
