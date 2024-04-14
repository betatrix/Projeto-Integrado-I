\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{regras-pi1a5}[2022/05/30 v1.0 Regras PI1A5]
%
% Repassa todos os parâmetros a classe ifsp-spo-inf-ctds, 
\DeclareOption*{%
  \PassOptionsToClass{\CurrentOption}{ifsp-spo-inf-ctds}%
}
\ProcessOptions\relax
\LoadClass{ifsp-spo-inf-ctds}

\titulo{Projeto Integrado I - PI1A5}
\newcommand{\codigoDisciplina}{PI1A5}

\input{geral-definicoes-classe-regras}
