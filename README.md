# FinDash - Dashboard Financeiro PRO 📊

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)

Aplicação web para gestão e controle financeiro pessoal, desenvolvida com foco em arquitetura limpa, design moderno e regras de negócio sólidas. 

## 🎯 Visão do Projeto

O FinDash foi criado para ser mais do que um simples "to-do list" de despesas. Unindo princípios sólidos de Engenharia de Software com conceitos práticos de Administração de Empresas, o objetivo foi construir uma ferramenta que entregue valor real na análise de dados financeiros. 

A interface moderna estilo *SaaS* (Software as a Service) facilita a entrada de dados, enquanto as funcionalidades de categorização e exportação de relatórios atendem às necessidades de controle contábil e planejamento estratégico.

## ✨ Funcionalidades

- **CRUD de Transações:** Adição e remoção de receitas e despesas com atualização de saldo em tempo real.
- **Categorização:** Classificação de gastos (Moradia, Alimentação, Lazer, etc.) para melhor visualização do fluxo de caixa.
- **Gráficos Dinâmicos:** Integração com `Chart.js` para renderizar a distribuição percentual das despesas automaticamente.
- **Exportação de Relatórios:** Geração de planilhas CSV com um clique, facilitando auditorias e backups externos.
- **Persistência de Dados:** Armazenamento local utilizando a API nativa `localStorage` do navegador.
- **Internacionalização (i18n):** Formatação nativa de moeda para o padrão brasileiro (BRL) utilizando `Intl.NumberFormat`.

## 🏗️ Arquitetura e Engenharia

O projeto foi refatorado utilizando **Programação Orientada a Objetos (POO)** em JavaScript puro (Vanilla JS), garantindo encapsulamento, separação de responsabilidades e facilitando a futura escalabilidade (como a substituição do `localStorage` por uma API RESTful).

A base de código está dividida logicamente nas seguintes entidades:

* `Storage` (Classe Estática): Responsável por toda a camada de persistência. Isola as chamadas de banco de dados (neste caso, `localStorage`), permitindo que a lógica de salvamento mude no futuro sem afetar a interface.
* `FinanceApp` (Classe Principal): Atua como o *Controller* da aplicação. Gerencia o estado em memória (array de transações), captura eventos da interface (DOM) e orquestra as atualizações visuais, incluindo a re-renderização do canvas do `Chart.js` e o motor de exportação CSV.
* **Design System:** Utilização de CSS Custom Properties (Variáveis) e CSS Grid Layout para criar uma interface responsiva, manutenível e padronizada.

## 🚀 Como executar o projeto

1. Clone este repositório:
   ```bash
   git clone [https://github.com/vantevb/dashboard-financeiro.git](https://github.com/vantevb/dashboard-financeiro.git)