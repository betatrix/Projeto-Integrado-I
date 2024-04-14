\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{regras-pds}[2022/05/30 v1.0 Regras PDS]
%
% Repassa todos os parâmetros a classe ifsp-spo-inf-cemi, 
\DeclareOption*{%
  \PassOptionsToClass{\CurrentOption}{ifsp-spo-inf-cemi}%
}
\ProcessOptions\relax
\LoadClass{ifsp-spo-inf-cemi}

\titulo{Prática de Desenvolvimento de Sistemas - PDS}
\newcommand{\codigoDisciplina}{PDS}

\input{geral-definicoes-classe-regras}
