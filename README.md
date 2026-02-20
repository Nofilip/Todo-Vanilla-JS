# Todo App (Vanilla JS + Vite)

En enkel Todo-app byggd i Vanilla JavaScript med Vite. Fokus: tydlig state-hantering, event delegation, localStorage och ett rent render-flöde.

## Funktioner
- Skapa todo
- Markera som klar/oklar (checkbox)
- Redigera todo (Save/Cancel + Enter-stöd)
- Ta bort todo (med confirm)
- Rensa alla klara
- Filter: Alla / Aktiva / Klara
- Statistik: items left + klar/total
- Tomt-läge (“Inga todos här”)
- Sparar i `localStorage`

## Teknik
- Vanilla JavaScript
- Vite
- localStorage
- Event delegation (`closest`, `dataset`)
- Render-loop: `state → render() → DOM`

## Säkerhet (kort)
Appen renderar listan via `innerHTML`. För att undvika XSS escapas användartext innan rendering (t.ex. `<img ...>` renderas som text och kör inte JS).

## Kom igång
```bash
npm install
npm run dev
