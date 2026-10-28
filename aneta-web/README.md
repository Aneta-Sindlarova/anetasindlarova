# Aneta Šindlářová – výživové poradenství Metabolic Balance®

Statický web (HTML + CSS + trocha JavaScriptu) bez build kroku. Funguje na GitHub Pages, Netlify i běžném hostingu.

## Struktura

```
index.html              obsah celé stránky
favicon.svg             ikona webu
assets/css/styles.css   vzhled (barvy a písma v proměnných nahoře)
assets/js/main.js       menu na mobilu, animace grafu, reference, odeslání formuláře
assets/img/             fotografie ve formátech WebP a JPG
.nojekyll               vypne Jekyll na GitHub Pages
robots.txt
```

## Zveřejnění na GitHub Pages

1. Na GitHubu založte nový repozitář (např. `aneta-web`).
2. Nahrajte do něj **obsah** této složky (ne složku samotnou) – přes *Add file › Upload files* nebo:
   ```bash
   git init
   git add .
   git commit -m "První verze webu"
   git branch -M main
   git remote add origin https://github.com/UZIVATEL/aneta-web.git
   git push -u origin main
   ```
3. V repozitáři otevřete *Settings › Pages*, u *Source* zvolte *Deploy from a branch*, větev `main` a složku `/ (root)`.
4. Za chvíli bude web na adrese `https://UZIVATEL.github.io/aneta-web/`.

### Vlastní doména

V *Settings › Pages › Custom domain* zadejte doménu (např. `www.vase-domena.cz`). GitHub vytvoří soubor `CNAME`. U registrátora domény nastavte záznam `CNAME` na `UZIVATEL.github.io`. Pak zapněte *Enforce HTTPS*.

## Co je potřeba doplnit

V `index.html` vyhledejte hranaté závorky `[` – označují místa k doplnění.

| Co | Kde |
|---|---|
| Telefon, e-mail, místo konzultací | sekce `#kontakt` (`tel:` a `mailto:` odkazy upravte také) |
| Portrét Anety | sekce `#o-mne` – nahraďte blok `portrait-placeholder` za `<img src="assets/img/aneta.jpg" alt="Aneta Šindlářová" width="1000" height="1250">` |
| Reference klientů | sekce `#reference` – zkopírujte blok `<figure class="ref-card">` pro každou referenci |
| Kontaktní formulář | viz níže |
| Náhledový obrázek pro sdílení | `og:image` v hlavičce – po zveřejnění změňte na plnou adresu, např. `https://www.vase-domena.cz/assets/img/hero-1000.jpg` |

Reference uvádějte jen skutečné a se souhlasem klientů.

### Kontaktní formulář (Formspree)

GitHub Pages neumí zpracovat formulář sám, proto web počítá se službou [Formspree](https://formspree.io) (bezplatný tarif stačí).

1. Zaregistrujte se a vytvořte formulář s e-mailem, kam mají zprávy chodit.
2. Zkopírujte ID formuláře (např. `xyzabcd`).
3. V `index.html` nahraďte `VAS_FORM_ID` tímto ID.

Dokud ID nedoplníte, formulář zprávu neodešle a návštěvníkovi zobrazí výzvu, ať napíše e-mail.

## Úpravy vzhledu

Barvy a písma jsou na začátku `assets/css/styles.css` v bloku `:root`. Písma Newsreader a Figtree se načítají z Google Fonts.

## Fotografie

Všechny fotografie jsou z Unsplash s licencí CC0 (volné užití včetně komerčního, bez nutnosti uvádět autora), staženy z Wikimedia Commons:

- `hero-*` – [Brooke Lark 2017-03-27 (Unsplash)](https://commons.wikimedia.org/wiki/File:Brooke_Lark_2017-03-27_(Unsplash).jpg)
- `klid-*` – [Healthy Meal Prep (Unsplash)](https://commons.wikimedia.org/wiki/File:Healthy_Meal_Prep_(Unsplash).jpg)
- `talir-*` – [Healthy Trendy Brunch (Unsplash)](https://commons.wikimedia.org/wiki/File:Healthy_Trendy_Brunch_(Unsplash).jpg)
- `cas-*` – [Relaxing Breakfast (Unsplash)](https://commons.wikimedia.org/wiki/File:Relaxing_Breakfast_(Unsplash).jpg)

Metabolic Balance® je registrovaná ochranná známka jejího vlastníka.
