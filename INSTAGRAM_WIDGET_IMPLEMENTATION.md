# Instagram Social Wall - Piano di Implementazione (TODO)

> Stato: **da fare**. Questo file traccia il contesto e i passi rimasti per integrare il social wall Instagram. Rimuovere il file una volta completata l'integrazione.

## Contesto

Si vuole mostrare sul sito un feed live dei post Instagram di Studio Mua (social wall).

Nota importante: l'**Instagram Basic Display API è stata dismessa a dicembre 2024**. Qualsiasi soluzione oggi richiede che l'account Instagram sia **Business o Creator** (non più personale) per potersi collegare tramite Graph API/Instagram Login.

## Soluzione scelta: SnapWidget

Scelto perché il sito è statico (Astro, output `static`, deploy su GitHub Pages) senza backend: SnapWidget genera un semplice `<iframe>` da incollare in un componente `.astro`, senza bisogno di gestire token API o rinnovi.

Alternative valutate e scartate (per branding più invasivo sul piano free o limiti di visualizzazioni/mese): LightWidget, Elfsight Instagram Feed, Common Ninja, Taggbox, EmbedSocial.

## Passi da fare (a cura dell'utente, richiedono login con le credenziali Instagram di Studio Mua)

1. Verificare che l'account Instagram di Studio Mua sia **Business o Creator** (Impostazioni Instagram → Account → passa ad account professionale, se non lo è già).
2. Andare su [snapwidget.com](https://snapwidget.com/), creare un account/widget.
3. Collegare l'account Instagram di Studio Mua al widget.
4. Personalizzare il widget (layout a griglia, numero colonne, spaziatura, dimensioni).
5. Copiare il codice embed generato (un tag `<iframe src="https://snapwidget.com/embed/XXXXXX" ...>`).
6. Incollare il codice embed in questo file, o comunicarlo a Claude Code per completare l'integrazione.

## Da fare lato codice (Claude Code, dopo aver ricevuto il codice embed)

- [ ] Creare un componente `src/components/new-ui/InstagramFeed.astro` che renderizza l'iframe SnapWidget, con lazy-loading (`loading="lazy"`) per non impattare le performance.
- [ ] Gestire titolo/testo della sezione in entrambe le lingue (IT/EN), seguendo il pattern di traduzione già in uso nella pagina in cui verrà inserito il componente (vedi sezione "Translation strategy" in `CLAUDE.md`).
- [ ] Decidere e inserire la posizione nel sito (non ancora decisa: homepage, pagina dedicata, o altro).
- [ ] Aggiornare `src/pages/*.astro` e relativo `en/*.astro` per includere il componente.
- [ ] Verificare se serve un aggiornamento alla **privacy policy** e al **cookie banner** esistenti (l'iframe di terze parti da snapwidget.com può impostare cookie/tracciamento — controllare se va gestito come consenso opzionale, dato che il sito ha già banner privacy implementato).
- [ ] Aggiornare `public/sitemap.xml` (lastmod) se si crea una nuova pagina dedicata.
- [ ] Verificare visivamente in dev (`npm run dev`) sia in IT che EN prima di considerare il lavoro concluso.
