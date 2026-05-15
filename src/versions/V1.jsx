import React, { useState } from 'react'
import { alunos, turmas } from '../data'

export default function V1() {
  const [busca, setBusca] = useState('')
  const [resultado, setResultado] = useState(null)

  function buscar() {
    const found = alunos.find(
      a => a.matricula === busca || a.nome.toLowerCase().includes(busca.toLowerCase())
    )
    setResultado(found || 'nao_encontrado')
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '10px' }}>
      <h2>Relatório de Faltas por Período - Buscar Discente</h2>
      <p>Caro Usuário,</p>
      <p>
        Utilize este formulário para realizar a busca das faltas por período de um determinado
        Discente. <b>Importante:</b> Somente serão listados no relatório as turmas abertas do
        discente selecionado.
      </p>

      <table border="1" width="100%" cellPadding="4">
        <tbody>
          <tr>
            <td><b>INFORME OS CRITÉRIOS DE BUSCA</b></td>
          </tr>
          <tr>
            <td>
              <input
                type="checkbox"
                defaultChecked
              />{' '}
              Matrícula: 20230---
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="checkbox"
                defaultChecked
              />{' '}
              Nome do Discente:
              <input
                type="text"
                value={busca}
                onChange={e => setBusca(e.target.value)}
                style={{ marginLeft: '5px', width: '200px' }}
                placeholder="Digite nome ou matrícula"
              />
            </td>
          </tr>
          <tr>
            <td>
              Período: de{' '}
              <input type="text" defaultValue="01/04/2026" style={{ width: '80px' }} />{' '}
              até{' '}
              <input type="text" defaultValue="05/05/2026" style={{ width: '80px' }} />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="button"
                value="Buscar"
                onClick={buscar}
                style={{ marginRight: '8px' }}
              />
              <input type="button" value="Cancelar" />
            </td>
          </tr>
        </tbody>
      </table>

      {resultado === 'nao_encontrado' && (
        <p style={{ color: 'red' }}>Discente não encontrado.</p>
      )}

      {resultado && resultado !== 'nao_encontrado' && (
        <div style={{ marginTop: '20px' }}>
          <p>
            <b>Aluno:</b> {resultado.nome} &nbsp;&nbsp;
            <b>Matrícula:</b> {resultado.matricula}
          </p>
          <table border="1" cellPadding="4" width="100%">
            <thead>
              <tr style={{ background: '#cccccc' }}>
                <td>Ano-Período</td>
                <td>Componente</td>
                <td>Aulas Lançadas</td>
                <td>% Faltas</td>
                <td>Faltas</td>
              </tr>
            </thead>
            <tbody>
              {turmas.map(t => {
                const faltas = resultado.turmas[t.id] || 0
                const pct = ((faltas / t.aulas) * 100).toFixed(0)
                return (
                  <tr key={t.id}>
                    <td>2026 - 1</td>
                    <td>{t.id} - {t.nome}</td>
                    <td>{t.aulas}</td>
                    <td>{pct}</td>
                    <td>{faltas}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
