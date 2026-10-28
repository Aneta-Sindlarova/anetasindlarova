# Aneta Šindlářová – výživové poradenství Metabolic Balance®

Statický web bez build kroku (HTML, CSS, trocha JavaScriptu). Nasazený na Vercelu
(Root Directory = `aneta-web`).

## Jak nahrát novou verzi na GitHub

1. Rozbalte zip – vznikne složka `aneta-web`.
2. Na GitHubu otevřete repozitář (kořen, ne složku) → *Add file → Upload files*.
3. Přetáhněte do okna **celou složku `aneta-web`**. Soubory se stejným názvem se přepíšou.
4. Dole klikněte na *Commit changes*. Vercel web do minuty nasadí sám.

Staré obrázky z předchozí verze (`hero-*`, `klid-*`, `talir-*`, `cas-*`) web už nepoužívá,
můžete je ve složce `aneta-web/assets/img` smazat – není to ale nutné.

## Co je potřeba doplnit

V `index.html` hledejte hranaté závorky `[` .

| Co | Kde |
|---|---|
| Reference | sekce `#reference` je zatím **skrytá**. Až budou skutečné ohlasy: ve značce `<section hidden class="section refs"` smažte slovo `hidden`, přepište bloky `<figure class="ref">` a vraťte odkaz „Reference“ do menu (`<nav class="nav">`) i do patičky |

Reference uvádějte jen skutečné a se souhlasem klientů.

Kontaktní formulář web nemá – návštěvníci se ozývají telefonem, přes WhatsApp nebo e-mailem (sekce `#kontakt`).

## SEO – co web obsahuje

- titulek, popis, kanonická adresa, Open Graph a Twitter karty s náhledovým obrázkem 1200 × 630 (`assets/img/og-image.jpg`),
- strukturovaná data JSON-LD: WebSite, Person, ProfessionalService s nabídkou a cenou, FAQPage,
- `sitemap.xml`, `robots.txt`, `site.webmanifest`, ikony pro prohlížeče a iPhone, vlastní `404.html`,
- jedna hlavní nadpis `h1`, logická struktura nadpisů, popisky všech obrázků,
- rychlost: písmo i obrázky přímo na webu, moderní formáty AVIF a WebP ve více velikostech, líné načítání obrázků mimo první obrazovku, dlouhé cachování (`vercel.json`).

### Až budete mít vlastní doménu

Nahraďte adresu `https://anetasindlarova.vercel.app` novou doménou v souborech
`index.html` (kanonická adresa, Open Graph, JSON-LD), `sitemap.xml` a `robots.txt`.

### Po spuštění

1. Přidejte web do [Google Search Console](https://search.google.com/search-console) a odešlete `sitemap.xml`.
2. Založte si [Firemní profil Google](https://business.google.com) se stejnou adresou a telefonem jako na webu (Těškovice 127, +420 739 998 919) – pro hledání „výživová poradkyně + město“ je to nejdůležitější krok.

## Písmo

Plus Jakarta Sans (licence SIL Open Font License, viz `assets/fonts/OFL.txt`) je uložené přímo na webu,
takže se při návštěvě nic neposílá na servery Googlu (GDPR) a stránka se načítá rychleji.

## Fotografie

Vlastní fotografie Anety: portrét (`aneta-*`, `aneta-avatar-*`) a fotky proměny (`promena-*`).
Fotky proměny jsou jen oříznuté na jednotný formát a barevně sjednocené, postava upravená není.

Ostatní fotografie: Unsplash, licence CC0 (volné užití včetně komerčního), staženo z Wikimedia Commons:

- `uvod-*` – Brooke Lark 2017-03-27 (Unsplash)
- `plan-*` – Chopping Ingredients (Unsplash)
- `energie-*` – Woman yoga pose sunrise (Unsplash)
- `snidane-*` – Healthy Trendy Brunch (Unsplash)
- `kontakt-*` – Relaxing Breakfast (Unsplash)

Metabolic Balance® je registrovaná ochranná známka jejího vlastníka.
