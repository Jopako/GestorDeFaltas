import React, { useState } from "react";
import V1 from "./versions/V1";
import V2 from "./versions/V2";
import V3 from "./versions/V3";
import V4 from "./versions/V4";

const VERSOES = [
  {
    id: 1,
    titulo: "Versão Inicial",
    subtitulo: "Sem heurísticas aplicadas",
    descricao:
      "Interface baseada no SIGAA original: tabela HTML simples, formulário sem validação, campos ambíguos, sem feedback de ação, sem distinção visual de criticidade.",
    heuristicas: [],
    cor: "#6b7280",
    corBg: "#f3f4f6",
  },
  {
    id: 2,
    titulo: "Evolução 1",
    subtitulo: "H1 + H4 de Nielsen",
    descricao:
      "Aplicamos H1 (Visibilidade do Status do Sistema) com feedback visual de loading e mensagem de resultado, e H4 (Consistência e Padrões) com topbar, breadcrumb e hierarquia visual coerente.",
    heuristicas: [
      {
        num: "H1",
        nome: "Visibilidade do Status",
        desc: "Loading indicator e mensagem de status após busca",
      },
      {
        num: "H4",
        nome: "Consistência e Padrões",
        desc: "Layout consistente com topbar, breadcrumb e hierarquia visual",
      },
    ],
    cor: "#1d4ed8",
    corBg: "#eff6ff",
  },
  {
    id: 3,
    titulo: "Evolução 2",
    subtitulo: "H5 + H6 + H9 de Nielsen",
    descricao:
      "Adicionamos H5 (Prevenção de Erros) com autocomplete e validação em tempo real, H6 (Reconhecimento em vez de Memorização) com sugestões dropdown e H9 (Ajuda aos Usuários a Reconhecer e Recuperar Erros) com mensagens claras e acionáveis.",
    heuristicas: [
      {
        num: "H5",
        nome: "Prevenção de Erros",
        desc: "Campo obrigatório sinalizado, validação antes de submeter",
      },
      {
        num: "H6",
        nome: "Reconhecimento vs. Memorização",
        desc: "Autocomplete com lista de alunos ao digitar",
      },
      {
        num: "H9",
        nome: "Diagnóstico de Erros",
        desc: "Mensagens de erro claras com orientação de como corrigir",
      },
    ],
    cor: "#7c3aed",
    corBg: "#f5f3ff",
  },
  {
    id: 4,
    titulo: "Evolução Final",
    subtitulo: "H2 + H7 + H8 + H10 de Nielsen",
    descricao:
      "Versão completa: H2 (correspondência com o mundo real) com linguagem natural e contexto de reprovação, H7 (flexibilidade) com alternância entre visão tabela e visual, H8 (estética minimalista) com cards de resumo e hierarquia limpa, e H10 (ajuda e documentação) com painel de dicas.",
    heuristicas: [
      {
        num: "H2",
        nome: "Correspondência com o Mundo Real",
        desc: "Linguagem natural, limite de faltas em contexto de reprovação",
      },
      {
        num: "H7",
        nome: "Flexibilidade e Eficiência",
        desc: "Alternância entre visão tabela e visão visual/barras",
      },
      {
        num: "H8",
        nome: "Estética e Design Minimalista",
        desc: "Cards de resumo, hierarquia limpa, sem ruído visual",
      },
      {
        num: "H10",
        nome: "Ajuda e Documentação",
        desc: "Painel de ajuda contextual acessível pelo botão ?",
      },
    ],
    cor: "#0f766e",
    corBg: "#f0fdfa",
  },
];

const VERSIONS_MAP = { 1: V1, 2: V2, 3: V3, 4: V4 };

export default function App() {
  const [versao, setVersao] = useState(1);
  const [showPanel, setShowPanel] = useState(true);
  const V = VERSIONS_MAP[versao];
  const info = VERSOES[versao - 1];

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Floating nav bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "rgba(10, 18, 35, 0.97)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          height: "52px",
          gap: "8px",
          fontFamily: "'IBM Plex Sans', sans-serif",
        }}
      >
        <span
          style={{
            color: "#94a3b8",
            fontSize: "12px",
            marginRight: "8px",
            whiteSpace: "nowrap",
          }}
        >
          IHC — Heurísticas de Nielsen
        </span>

        {VERSOES.map((v) => (
          <button
            key={v.id}
            onClick={() => setVersao(v.id)}
            style={{
              padding: "5px 14px",
              borderRadius: "20px",
              border:
                versao === v.id
                  ? `1.5px solid ${v.cor}`
                  : "1.5px solid rgba(255,255,255,0.12)",
              background: versao === v.id ? v.corBg : "transparent",
              color: versao === v.id ? v.cor : "#94a3b8",
              fontSize: "12px",
              fontWeight: versao === v.id ? "500" : "400",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            {v.titulo}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        <button
          onClick={() => setShowPanel((p) => !p)}
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "6px",
            color: "#cbd5e1",
            padding: "4px 12px",
            fontSize: "12px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {showPanel ? "▲ Ocultar painel" : "▼ Ver heurísticas"}
        </button>
      </div>

      {/* Heuristics info panel */}
      {showPanel && (
        <div
          style={{
            position: "sticky",
            top: "52px",
            left: 0,
            right: 0,
            zIndex: 999,
            background: info.corBg,
            borderBottom: `2px solid ${info.cor}22`,
            padding: "14px 24px",
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}
        >
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      background: info.cor,
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: "500",
                      padding: "2px 10px",
                      borderRadius: "10px",
                    }}
                  >
                    {info.titulo}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#374151",
                      fontWeight: "500",
                    }}
                  >
                    {info.subtitulo}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: "#6b7280",
                    maxWidth: "560px",
                  }}
                >
                  {info.descricao}
                </p>
              </div>

              {info.heuristicas.length > 0 && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {info.heuristicas.map((h) => (
                    <div
                      key={h.num}
                      style={{
                        background: "#fff",
                        border: `1px solid ${info.cor}33`,
                        borderRadius: "8px",
                        padding: "8px 12px",
                        minWidth: "160px",
                        maxWidth: "200px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: "500",
                          color: info.cor,
                          marginBottom: "2px",
                        }}
                      >
                        {h.num} — {h.nome}
                      </div>
                      <div style={{ fontSize: "11px", color: "#6b7280" }}>
                        {h.desc}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {info.heuristicas.length === 0 && (
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px 16px",
                    fontSize: "12px",
                    color: "#9ca3af",
                    maxWidth: "280px",
                  }}
                >
                  Interface sem heurísticas aplicadas — serve de linha de base
                  para comparação com as evoluções seguintes.
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                marginTop: "12px",
              }}
            >
              {versao > 1 && (
                <button
                  onClick={() => setVersao((v) => v - 1)}
                  style={{
                    background: "#fff",
                    border: "1px solid #d1d5db",
                    borderRadius: "5px",
                    padding: "5px 14px",
                    fontSize: "12px",
                    cursor: "pointer",
                    color: "#374151",
                  }}
                >
                  ← Versão anterior
                </button>
              )}
              {versao < 4 && (
                <button
                  onClick={() => setVersao((v) => v + 1)}
                  style={{
                    background: info.cor,
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 16px",
                    fontSize: "12px",
                    cursor: "pointer",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  Próxima evolução →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main content — padded to avoid overlap with the fixed topbar */}
      <div style={{ paddingTop: "52px", transition: "padding-top 0.2s" }}>
        <V />
      </div>
    </div>
  );
}
