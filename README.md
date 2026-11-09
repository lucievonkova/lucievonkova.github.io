# lucie.vonkova — návod

Web o čtyřech stránkách: **úvod, fotografie, básně a kontakt**.
Obsah upravujete v jednoduché správě **Pages CMS**: přihlásíte se, kliknete na „Básně“ nebo „Fotografie“ a přidáváte, upravujete a mažete jako v běžném formuláři. Po uložení se web sám za 1–2 minuty aktualizuje.

Vše je zdarma. Platí se jen za vlastní doménu (např. `lucievonkova.cz`), pokud ji chcete.

---

## 1. Jednorázové spuštění webu (asi 15 minut)

### a) Účet na GitHubu
1. Na **github.com** si založte účet (Sign up). Zapamatujte si uživatelské jméno, dál ho píšu jako `JMENO`.

### b) Nahrání webu
1. Vpravo nahoře klikněte na **+** → **New repository**.
2. Do „Repository name“ napište přesně: `JMENO.github.io` (vaše jméno + `.github.io`).
3. Nechte **Public** a klikněte na **Create repository**.
4. Na další stránce klikněte na odkaz **uploading an existing file**.
5. Rozbalte stažený ZIP a do okna přetáhněte **všechno, co je uvnitř složky** `lucie-vonkova-web` (ne složku samotnou). Pak klikněte na **Commit changes**.

> **Pozor na skrytý soubor `.pages.yml`.** Na Macu a ve Windows bývá skrytý a nemusí se nahrát.
> Pokud ho po nahrání v seznamu souborů nevidíte: klikněte na **Add file → Create new file**, pojmenujte ho `.pages.yml`, vložte do něj obsah souboru `pages.yml.txt` z této složky a uložte (**Commit changes**).

### c) Zapnutí webu
1. V repozitáři otevřete **Settings → Pages**.
2. V části „Build and deployment“ zvolte **Source: Deploy from a branch**, **Branch: main**, složka **/(root)** → **Save**.
3. Za pár minut web poběží na adrese `https://JMENO.github.io`.

### d) Správa obsahu
1. Otevřete **pagescms.org** a klikněte na **Sign in with GitHub**.
2. Povolte přístup k repozitáři `JMENO.github.io` (Pages CMS vás o to samo požádá).
3. Vlevo uvidíte **Fotografie**, **Básně** a **Úvod a kontakt**. Tady budete web upravovat.

---

## 2. Běžné úpravy

**Přidat báseň:** Básně → **Add an entry** → vyplňte název, pořadí, rok vzniku a text → **Save**.
Enter udělá nový verš, prázdný řádek novou sloku. Básně jsou seřazené podle čísla v poli Pořadí (1 = první).

**Přidat fotku:** Fotografie → **Add an entry** → nahrajte obrázek, vyplňte název a rok → **Save**.
- **Série:** fotky se stejným názvem série se dají na stránce vyfiltrovat (např. „Krajiny“).
- **Pořadí:** menší číslo = výš na stránce.
- **Zobrazit na úvodní stránce:** zaškrtněte u jedné fotky, která má být velká na úvodu.
- **Dvojice:** když dvěma fotkám napíšete do tohoto pole stejné slovo (např. „vetve“), ukážou se vedle sebe pod galerií jako dvojice.
- Fotky před nahráním zmenšete na delší stranu asi 2000 px, web pak bude rychlý.

**Upravit nebo smazat:** klikněte na položku, změňte ji a uložte, nebo ji smažte (ikona koše / Delete).

**Úvod a kontakt:** krátká báseň na úvodní stránce, e-mail, Instagram, telefon, město a krátké představení. Prázdná pole se na webu nezobrazí.

Vaše fotky už jsou ve webu (očíslované 01–47). Názvy a roky jim doplníte ve správě obsahu.

---

## 3. Vlastní doména (volitelné)

1. Kupte doménu u českého registrátora (např. `lucievonkova.cz`).
2. V nastavení DNS u registrátora přidejte:
   - čtyři záznamy **A** pro hlavní doménu (`@`): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - záznam **CNAME** pro `www`: `JMENO.github.io`
3. Na GitHubu v **Settings → Pages → Custom domain** napište svou doménu, uložte a po ověření zaškrtněte **Enforce HTTPS**.

Změna DNS se může projevit až za několik hodin.

---

## Pro pokročilé

- Barvy a písma: `assets/style.css`, úplně nahoře. Písma (Inter a Lora, licence SIL OFL) jsou ve složce `assets/fonts`.
- Šablony: `index.html` (celá hlavní stránka), `_layouts/` (rámec a stránka básně), `_includes/`.
- Obsah: `_poems/` (básně), `_photos/` (fotky), `media/` (obrázky), `_data/web.yml` (úvod a kontakt).
- Web staví GitHub Pages pomocí Jekyllu, nic se neinstaluje.
