/* Para adicionar um projeto: acrescente um objeto aqui e os textos em data/i18n.js
   (chaves proj.<id>.kind, proj.<id>.desc e, se houver "goal", proj.<id>.goal).
   "image" é opcional: sem imagem, o projeto aparece como um card de texto.
   Links são opcionais: preencha github/demo e o botão aparece sozinho.
   Orbital Link, Game e SEST SENAT foram retirados até ter descrição, tecnologias e link;
   as imagens continuam em assets/img/ para quando voltarem. */
window.PROJECTS = [
  { id: "neurovest", name: "NeuroVest", featured: true, goal: true,
    image: "assets/img/neurovest.webp", h: 706,
    tech: ["Java 21", "Spring Boot", "Spring Data JPA", "Oracle", "Next.js", "React", "TypeScript", "Tailwind CSS"],
    links: { github: "", demo: "" } },
  { id: "gestao", name: "Gestão de Equipamentos", kindKey: "proj.cs.kind",
    tech: ["C#", ".NET", "Console"],
    links: { github: "https://github.com/Eduardoborges063/GestaoDeEquipamentos-2.0" } },
  { id: "clube", name: "Clube da Leitura", kindKey: "proj.cs.kind",
    tech: ["C#", ".NET"],
    links: { github: "https://github.com/Eduardoborges063/ClubeDaleitura" } },
  { id: "bar", name: "Controle de Bar", kindKey: "proj.cs.kind",
    tech: ["C#", ".NET"],
    links: { github: "https://github.com/Eduardoborges063/ControleDeBar" } }
];
