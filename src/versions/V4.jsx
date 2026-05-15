import React, { useState } from 'react'
import { alunos, turmas } from '../data'

const C = {
  navy: '#0f2a45',
  blue: '#1a56a0',
  accent: '#2775d0',
  bg: '#f2f5f9',
  surface: '#fff',
  border: '#dde3ec',
  danger: '#b91c1c',
  dangerBg: '#fef2f2',
  dangerBorder: '#fecaca',
  warn: '#c2410c',
  warnBg: '#fff7ed',
  warnBorder: '#fed7aa',
  ok: '#166534',
  okBg: '#f0fdf4',
  okBorder: '#bbf7d0',
  text: '#111827',
  muted: '#6b7280',
  light: '#9ca3af',
}

const chip = (nv) => ({
  padding: '3px 10px',
  borderRadius: '12px',
  fontSize: '11px',
  fontWeight: '500',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  background: nv === 'critico' ? C.dangerBg : nv === 'alerta' ? C.warnBg : C.okBg,
  color: nv === 'critico' ? C.danger : nv === 'alerta' ? C.warn : C.ok,
  border: `1px solid ${nv === 'critico' ? C.dangerBorder : nv === 'alerta' ? C.warnBorder : C.okBorder}`,
})

function calcNivel(pct) {
  if (pct >= 25) return 'critico'
  if (pct >= 15) return 'alerta'
  return 'ok'
}

const Bar = ({ pct }) => {
  const nv = calcNivel(pct)
  const color = nv === 'critico' ? C.danger : nv === 'alerta' ? C.warn : C.accent
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: color, borderRadius: '3px', transition: 'width 0.5s ease' }} />
      </div>
      <span style={{ fontSize: '12px', fontWeight: '500', color, minWidth: '34px', textAlign: 'right' }}>
        {pct}%
      </span>
    </div>
  )
}

const SummaryCard = ({ label, value, sub, color }) => (
  <div style={{
    background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px',
    padding: '14px 18px', flex: 1, minWidth: '120px',
  }}>
    <p style={{ margin: 0, fontSize: '12px', color: C.muted, marginBottom: '4px' }}>{label}</p>
    <p style={{ margin: 0, fontSize: '22px', fontWeight: '500', color: color || C.text }}>{value}</p>
    {sub && <p style={{ margin: 0, fontSize: '11px', color: C.light, marginTop: '2px' }}>{sub}</p>}
  </div>
)

export default function V4() {
  const [busca, setBusca] = useState('')
  const [sugestoes, setSugestoes] = useState([])
  const [showSug, setShowSug] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')
  const [view, setView] = useState('tabela')
  const [showHelp, setShowHelp] = useState(false)
  const [periodo, setPeriodo] = useState('2026-1')

  function onInput(e) {
    const val = e.target.value
    setBusca(val)
    setErro('')
    if (val.length >= 2) {
      setSugestoes(alunos.filter(a =>
        a.nome.toLowerCase().includes(val.toLowerCase()) || a.matricula.includes(val)
      ))
      setShowSug(true)
    } else {
      setSugestoes([])
      setShowSug(false)
    }
  }

  function selecionar(aluno) {
    setBusca(aluno.nome)
    setShowSug(false)
    executar(aluno)
  }

  function executar(fixo) {
    const q = busca.trim()
    if (!q) { setErro('Informe o nome ou matrícula antes de buscar.'); return }
    setLoading(true); setErro(''); setResultado(null)
    setTimeout(() => {
      const found = fixo || alunos.find(a =>
        a.matricula === q || a.nome.toLowerCase().includes(q.toLowerCase())
      )
      setLoading(false)
      if (found) setResultado(found)
      else setErro(`Não encontramos nenhum discente para "${q}". Verifique o nome ou matrícula e tente novamente.`)
    }, 600)
  }

  const criticos = resultado
    ? turmas.filter(t => calcNivel(Math.round((resultado.turmas[t.id] || 0) / t.aulas * 100)) === 'critico').length
    : 0
  const alertas = resultado
    ? turmas.filter(t => calcNivel(Math.round((resultado.turmas[t.id] || 0) / t.aulas * 100)) === 'alerta').length
    : 0

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", background: C.bg, minHeight: '100vh' }}>

      {/* Topbar */}
      <div style={{ background: C.navy, color: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontWeight: '500', fontSize: '14px', letterSpacing: '0.5px' }}>SIGAA</span>
          <span style={{ color: '#9ca3c4', fontSize: '13px' }}>/ Relatório de Faltas</span>
        </div>
        <button
          onClick={() => setShowHelp(v => !v)}
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: '#fff', padding: '4px 12px', fontSize: '12px', cursor: 'pointer' }}
        >
          ? Ajuda
        </button>
      </div>

      {/* Help panel */}
      {showHelp && (
        <div style={{ background: '#e8f0fb', borderBottom: `1px solid #c3d3ef`, padding: '14px 24px', fontSize: '13px', color: C.text }}>
          <strong>Como usar:</strong> Digite o nome ou matrícula do aluno no campo de busca. Sugestões aparecerão automaticamente.
          As faltas são exibidas com indicadores visuais: <span style={chip('ok')}>● Normal</span>{' '}
          <span style={chip('alerta')}>● Atenção</span>{' '}
          <span style={chip('critico')}>● Crítico (≥ 25% do total de aulas)</span>.
          Alunos com situação crítica estão em risco de reprovação por falta.
          <button onClick={() => setShowHelp(false)} style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer', color: C.muted }}>✕ fechar</button>
        </div>
      )}

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 24px' }}>

        {/* Search card */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
          <p style={{ fontSize: '13px', color: C.muted, margin: '0 0 16px' }}>
            Busque um discente para visualizar o histórico de faltas no período selecionado.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: '2 1 220px', position: 'relative' }}>
              <label style={{ fontSize: '12px', color: C.muted, display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Nome ou Matrícula
              </label>
              <input
                value={busca}
                onChange={onInput}
                onKeyDown={e => e.key === 'Enter' && executar()}
                onBlur={() => setTimeout(() => setShowSug(false), 150)}
                placeholder="Ex: Bruno Carvalho ou 20230042"
                autoComplete="off"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  border: `1.5px solid ${erro ? C.danger : C.border}`,
                  borderRadius: '6px', padding: '9px 12px', fontSize: '13px',
                  background: erro ? C.dangerBg : '#fff', outline: 'none',
                }}
              />
              {erro && (
                <div style={{ marginTop: '6px', padding: '8px 12px', background: C.dangerBg, border: `1px solid ${C.dangerBorder}`, borderRadius: '5px', fontSize: '12px', color: C.danger }}>
                  ⚠ {erro}
                </div>
              )}
              {showSug && sugestoes.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 20, background: '#fff', border: `1px solid ${C.border}`, borderRadius: '6px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', marginTop: '2px', overflow: 'hidden' }}>
                  <p style={{ margin: 0, padding: '6px 12px', fontSize: '11px', color: C.light, borderBottom: `1px solid ${C.border}` }}>
                    {sugestoes.length} resultado(s) encontrado(s)
                  </p>
                  {sugestoes.map(a => (
                    <div
                      key={a.matricula}
                      onMouseDown={() => selecionar(a)}
                      style={{ padding: '10px 14px', fontSize: '13px', cursor: 'pointer', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between' }}
                      onMouseEnter={e => e.currentTarget.style.background = C.bg}
                      onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                    >
                      <span style={{ fontWeight: '500' }}>{a.nome}</span>
                      <span style={{ color: C.muted, fontSize: '12px' }}>{a.matricula}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ flex: '1 1 120px' }}>
              <label style={{ fontSize: '12px', color: C.muted, display: 'block', marginBottom: '5px', fontWeight: '500' }}>Período</label>
              <select
                value={periodo}
                onChange={e => setPeriodo(e.target.value)}
                style={{ width: '100%', border: `1.5px solid ${C.border}`, borderRadius: '6px', padding: '9px 12px', fontSize: '13px', background: '#fff', cursor: 'pointer' }}
              >
                <option value="2026-1">2026 - 1</option>
                <option value="2025-2">2025 - 2</option>
                <option value="2025-1">2025 - 1</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button
              onClick={() => executar()}
              disabled={loading}
              style={{ background: C.accent, color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 22px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
            <button
              onClick={() => { setBusca(''); setResultado(null); setErro('') }}
              style={{ background: '#fff', color: C.muted, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '10px 16px', fontSize: '13px', cursor: 'pointer' }}
            >
              Limpar
            </button>
          </div>
        </div>

        {/* Result */}
        {resultado && (
          <>
            {/* Summary cards */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <SummaryCard label="Discente" value={resultado.nome.split(' ').slice(0,2).join(' ')} sub={resultado.matricula} />
              <SummaryCard label="Turmas" value={turmas.length} sub="no período" />
              <SummaryCard label="Situação crítica" value={criticos} sub="≥ 25% de faltas" color={criticos > 0 ? C.danger : C.ok} />
              <SummaryCard label="Atenção" value={alertas} sub="≥ 15% de faltas" color={alertas > 0 ? C.warn : C.ok} />
            </div>

            {/* View toggle + table */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: C.text }}>
                  Detalhamento de Faltas — {periodo.replace('-', ' - ')}
                </span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {['tabela', 'visual'].map(v => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      style={{
                        padding: '4px 12px', fontSize: '12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid',
                        borderColor: view === v ? C.accent : C.border,
                        background: view === v ? '#ebf2fc' : '#fff',
                        color: view === v ? C.accent : C.muted,
                        fontWeight: view === v ? '500' : '400',
                      }}
                    >
                      {v === 'tabela' ? '⊞ Tabela' : '▦ Visual'}
                    </button>
                  ))}
                </div>
              </div>

              {view === 'tabela' ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr>
                        {['Componente', 'Aulas', 'Faltas', '% Faltas', 'Situação'].map(h => (
                          <th key={h} style={{ background: '#f8fafc', borderBottom: `1px solid ${C.border}`, padding: '9px 14px', textAlign: 'left', fontWeight: '500', color: C.muted, fontSize: '12px' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {turmas.map((t, i) => {
                        const faltas = resultado.turmas[t.id] || 0
                        const pct = Math.round((faltas / t.aulas) * 100)
                        const nv = calcNivel(pct)
                        return (
                          <tr key={t.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafbfd' }}>
                            <td style={{ padding: '10px 14px', borderBottom: `1px solid ${C.border}`, color: C.text }}>
                              <span style={{ fontWeight: '500', fontSize: '12px', color: C.muted }}>{t.id}</span>
                              <br />
                              {t.nome}
                            </td>
                            <td style={{ padding: '10px 14px', borderBottom: `1px solid ${C.border}`, color: C.muted }}>{t.aulas}</td>
                            <td style={{ padding: '10px 14px', borderBottom: `1px solid ${C.border}`, fontWeight: '500', color: nv === 'ok' ? C.ok : nv === 'alerta' ? C.warn : C.danger }}>{faltas}</td>
                            <td style={{ padding: '10px 14px', borderBottom: `1px solid ${C.border}`, minWidth: '160px' }}>
                              <Bar pct={pct} />
                            </td>
                            <td style={{ padding: '10px 14px', borderBottom: `1px solid ${C.border}` }}>
                              <span style={chip(nv)}>
                                {nv === 'critico' ? '● Crítico' : nv === 'alerta' ? '● Atenção' : '● Normal'}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {turmas.map(t => {
                    const faltas = resultado.turmas[t.id] || 0
                    const pct = Math.round((faltas / t.aulas) * 100)
                    const nv = calcNivel(pct)
                    const barColor = nv === 'critico' ? C.danger : nv === 'alerta' ? C.warn : C.accent
                    return (
                      <div key={t.id} style={{ background: '#f8fafc', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '14px 16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <div>
                            <span style={{ fontWeight: '500', fontSize: '13px', color: C.text }}>{t.nome}</span>
                            <span style={{ marginLeft: '8px', fontSize: '11px', color: C.muted }}>{t.id}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '12px', color: C.muted }}>{faltas} de {t.aulas} aulas</span>
                            <span style={chip(nv)}>
                              {nv === 'critico' ? '● Crítico' : nv === 'alerta' ? '● Atenção' : '● Normal'}
                            </span>
                          </div>
                        </div>
                        <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: barColor, borderRadius: '4px', transition: 'width 0.6s ease' }} />
                        </div>
                        <p style={{ margin: '5px 0 0', fontSize: '11px', color: C.light }}>
                          Limite permitido: 25% ({Math.floor(t.aulas * 0.25)} faltas) — atual: {pct}%
                        </p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {criticos > 0 && (
              <div style={{ marginTop: '14px', padding: '12px 16px', background: C.dangerBg, border: `1px solid ${C.dangerBorder}`, borderRadius: '8px', fontSize: '13px', color: C.danger }}>
                ⚠ <strong>Atenção:</strong> Este discente possui {criticos} componente(s) em situação crítica.
                Alunos que ultrapassarem 25% de faltas estão sujeitos a reprovação por frequência.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
