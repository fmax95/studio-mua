# Google Fonts Integration - Studio Mua

## Implementazione Completata ✅

### Font Integrati

Sono stati integrati tre font Google Fonts nel progetto:

1. **Fraunces** - Per titoli e heading (h1, h2, h3, .title, .heading)
   - Variabile optical size (9-144)
   - Peso: 400-700
   
2. **Inter** - Per testo body e UI
   - Pesi: 300 (light), 400 (regular), 600 (semi-bold)
   
3. **Allura** - Per elementi decorativi script
   - Font corsivo decorativo

---

## Modifiche Effettuate

### 1. Layout Principale ([src/layouts/Layout.astro](src/layouts/Layout.astro))

Il layout è stato completamente ristrutturato per includere:
- `<head>` completo con meta tags
- **Preconnect** ai server Google Fonts per ottimizzazione caricamento:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  ```
- **Link stylesheet** Google Fonts:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Inter:wght@300;400;600&family=Allura&display=swap" rel="stylesheet" />
  ```
- Supporto per prop `title` dinamico

### 2. CSS Globale ([src/styles/global.css](src/styles/global.css))

Creato nuovo file con:

#### Variabili CSS Font:
```css
--font-title: "Fraunces", serif;
--font-body: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
--font-script: "Allura", cursive;
```

#### Scale Tipografica Fluida:
```css
--fs-body: clamp(16px, 0.35vw + 15px, 18px);
--fs-h3: clamp(20px, 1.0vw + 16px, 34px);
--fs-h2: clamp(26px, 1.8vw + 18px, 46px);
--fs-h1: clamp(36px, 3.2vw + 18px, 66px);
```

#### Regole Tipografiche:
- `body`: Inter (300), line-height 1.65
- `h1, h2, h3, .title, .heading`: Fraunces (600), letter-spacing -0.02em
- `.script, .accent-script`: Allura (400)

### 3. Pagine Aggiornate

Tutte le pagine sono state semplificate per usare il nuovo Layout:
- ✅ [index.astro](src/pages/index.astro)
- ✅ [content-creator.astro](src/pages/content-creator.astro)
- ✅ [graphic-designer.astro](src/pages/graphic-designer.astro)
- ✅ [social-media-manager.astro](src/pages/social-media-manager.astro)

### 4. Font Hardcoded Sostituiti

- ✅ [Welcome.astro](src/components/Welcome.astro): `Inter, Roboto, 'Helvetica Neue'...` → `var(--font-body)`
- ✅ [SvgSmartphone.astro](src/components/SvgSmartphone.astro): `Arial, sans-serif` → `Inter, system-ui, sans-serif`

---

## Come Usare i Font

### Titoli (Fraunces)

I titoli usano automaticamente Fraunces:

```html
<h1>Il Mio Titolo</h1>
<h2>Sottotitolo</h2>
<div class="title">Titolo Custom</div>
```

### Testo Body (Inter)

Il testo normale usa automaticamente Inter:

```html
<p>Testo del paragrafo</p>
<span>Testo UI</span>
```

Per enfasi:
```html
<strong>Testo in grassetto</strong> <!-- peso 600 -->
<b>Altro grassetto</b> <!-- peso 600 -->
```

### Testo Decorativo Script (Allura)

Per elementi decorativi con font corsivo:

```html
<!-- Inline -->
<p>Benvenuti <span class="script">a Studio Mua</span></p>

<!-- Block element -->
<div class="accent-script">Your Creative Partner</div>
```

**Esempio Completo:**
```html
<h2>
  Crea contenuti <span class="script">incredibili</span> con noi
</h2>
```

---

## Verifica

### Build Success ✅
```bash
npm run build
# ✓ 4 page(s) built in 1.30s
```

### Font Caricati ✅
- I font vengono caricati da Google Fonts CDN
- Display swap per evitare FOIT (Flash of Invisible Text)
- Preconnect per ottimizzazione performance

### CSS Applicato ✅
Le variabili CSS sono correttamente applicate in tutto il progetto.

---

## Prossimi Step Suggeriti

1. **Testare elementi `.script`**: Aggiungere elementi decorativi con classe `.script` nelle pagine
2. **Ottimizzare font loading**: Considerare font subsetting per ridurre dimensioni
3. **A/B testing**: Valutare impatto visivo dei nuovi font con utenti

---

## Note Tecniche

- **Display: swap** previene il flash di testo invisibile durante il caricamento
- **Preconnect** riduce latenza connessione ai server Google
- **Fallback fonts** garantiscono leggibilità anche se i font non caricano
- **Fluid typography** (clamp) assicura dimensioni responsive senza media queries

---

**Data implementazione**: 1 Gennaio 2026  
**Status**: ✅ Completato e testato
