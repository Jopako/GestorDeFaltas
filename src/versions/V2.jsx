import React, { useState } from 'react'
import { alunos, turmas } from '../data'

const s = {
  page: {
    fontFamily: "'IBM Plex Sans', sans-serif",
    background: '#f4f6f9',
    minHeight: '100vh',
    padding: '0',
  },
  topbar: {
    background: '#1a3a5c',
    color: '#fff',
    padding: '10px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
  },
  breadcrumb: {
    background: '#e8edf3',
    padding: '6px 24px',
    fontSize: '12px',
    color: '#555',
    borderBottom: '1px solid #ccd3dc',
  },
  main: { padding: '24px', maxWidth: '900px', margin: '0 auto' },
  card: {
    background: '#fff',
    border: '1px solid #d0d7e2',
    borderRadius: '4px',
    marginBottom: '20px',
    overflow: 'hidden',
  },
  cardHeader: {
    background: '#2c5282',
    color: '#fff',
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: '500',
  },
  cardBody: { padding: '16px' },
  label: { fontSize: '13px', color: '#444', display: 'block', marginBottom: '4px' },
  input: {
    border: '1px solid #aab',
    borderRadius: '3px',
    padding: '6px 10px',
    fontSize: '13px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
  },
  row: { display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-end' },
  btnPrimary: {
    background: '#2c5282',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    padding: '7px 20px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  btnSecondary: {
    background: '#fff',
    color: '#444',
    border: '1px solid #aab',
    borderRadius: '3px',
    padding: '7px 16px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  status: (loading) => ({
    padding: '8px 14px',
    borderRadius: '3px',
    fontSize: '13px',
    background: loading ? '#fff8e1' : '#e8f5e9',
    color: loading ? '#795548' : '#2e7d32',
    border: `1px solid ${loading ? '#ffe082' : '#a5d6a7'}`,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  }),
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
  th: {
    background: '#e8edf3',
    border: '1px solid #d0d7e2',
    padding: '7px 10px',
    textAlign: 'left',
    fontWeight: '500',
    color: '#333',
  },
  td: { border: '1px solid #d0d7e2', padding: '7px 10px', color: '#333' },
}

export default function V2() {
  const [busca, setBusca] = useState('')
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState(null)
  const [statusMsg, setStatusMsg] = useState(null)

  function buscar() {
    if (!busca.trim()) return
    setLoading(true)
    setStatusMsg('Buscando discente...')
    setResultado(null)
    setTimeout(() => {
      const found = alunos.find(
        a => a.matricula === busca.trim() || a.nome.toLowerCase().includes(busca.toLowerCase())
      )
      setLoading(false)
      if (found) {
        setStatusMsg('Discente encontrado.')
        setResultado(found)
      } else {
        setStatusMsg('Discente não encontrado.')
        setResultado('nao_encontrado')
      }
    }, 900)
  }

  return (
    <div style={s.page}>
      <div style={s.topbar}>
        <span style={{ fontWeight: '500' }}>SIGAA</span>
        <span>|</span>
        <span>Sistema Integrado de Gestão de Atividades Acadêmicas</span>
      </div>
      <div style={s.breadcrumb}>
        Graduação &rsaquo; Relatório de Faltas por Período &rsaquo; <b>Buscar Discente</b>
      </div>

      <div style={s.main}>
        <div style={s.card}>
          <div style={s.cardHeader}>Informe os Critérios de Busca</div>
          <div style={s.cardBody}>
            <p style={{ fontSize: '13px', color: '#555', marginTop: 0 }}>
              Utilize este formulário para realizar a busca das faltas por período de um determinado discente.
            </p>

            {statusMsg && (
              <div style={s.status(loading)}>
                {loading ? '⏳' : resultado === 'nao_encontrado' ? '⚠️' : '✅'}
                {statusMsg}
              </div>
            )}

            <div style={s.row}>
              <div style={{ flex: 2 }}>
                <label style={s.label}>Nome ou Matrícula</label>
                <input
                  style={s.input}
                  value={busca}
                  onChange={e => setBusca(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && buscar()}
                  placeholder="Digite o nome ou número de matrícula"
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={s.label}>Período</label>
                <input style={s.input} defaultValue="2026 - 1" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={s.btnPrimary} onClick={buscar} disabled={loading}>
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
              <button style={s.btnSecondary} onClick={() => { setBusca(''); setResultado(null); setStatusMsg(null) }}>
                Limpar
              </button>
            </div>
          </div>
        </div>

        {resultado && resultado !== 'nao_encontrado' && (
          <div style={s.card}>
            <div style={s.cardHeader}>
              Resultado — {resultado.nome} ({resultado.matricula})
            </div>
            <div style={s.cardBody}>
              <table style={s.table}>
                <thead>
                  <tr>
                    {['Ano-Período', 'Componente', 'Aulas Lançadas', '% Faltas', 'Faltas'].map(h => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {turmas.map(t => {
                    const faltas = resultado.turmas[t.id] || 0
                    const pct = Math.round((faltas / t.aulas) * 100)
                    const critico = pct >= 25
                    return (
                      <tr key={t.id} style={{ background: critico ? '#fff8e1' : '#fff' }}>
                        <td style={s.td}>2026 - 1</td>
                        <td style={s.td}>{t.id} — {t.nome}</td>
                        <td style={s.td}>{t.aulas}</td>
                        <td style={{ ...s.td, color: critico ? '#b71c1c' : '#2e7d32', fontWeight: critico ? '500' : '400' }}>
                          {pct}%
                        </td>
                        <td style={s.td}>{faltas}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
