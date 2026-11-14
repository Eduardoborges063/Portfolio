/* Para adicionar um projeto: acrescente um objeto aqui e os textos em data/i18n.js
   (chaves proj.<id>.kind, proj.<id>.desc e, se houver "goal", proj.<id>.goal).
   Links são opcionais: preencha github/demo e o botão aparece sozinho. */
window.PROJECTS = [
  { id: "neurovest", name: "NeuroVest", featured: true, goal: true,
    image: "assets/img/neurovest.webp", h: 706,
    tech: ["Java 21", "Spring Boot", "Spring Data JPA", "Oracle", "Next.js", "React", "TypeScript", "Tailwind CSS"],
    links: { github: "", demo: "" } },
  { id: "orbital-link", name: "Orbital Link", image: "assets/img/orbital-link.webp", h: 555, tech: [], links: {} },
  { id: "game", name: "Game", image: "assets/img/game.webp", h: 605, tech: [], links: {} },
  { id: "sest-senat", name: "SEST SENAT", image: "assets/img/sest-senat.webp", h: 562, tech: [], links: {} }
];
