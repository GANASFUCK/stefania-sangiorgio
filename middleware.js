/* ------------------------------------------------------------------
   Accesso al portfolio pubblicato su Vercel (bozza per Stefania).
   Gira prima di ogni richiesta, file statici compresi: senza accesso
   non esce niente, nemmeno un video o un'immagine.
   Chi non è entrato vede una pagina con nome e password; se sono
   giusti riceve un biscotto di sessione (30 giorni) e torna al sito.
   Nome e password li ha scelti Gianluca: sono qui, in un repository
   privato. Per cambiarli basta cambiare queste tre righe e ripubblicare.
------------------------------------------------------------------- */
import { next } from '@vercel/functions';

const NOMI = ['admin', 'stefania'];          /* il nome non distingue maiuscole e minuscole */
const PASSWORD = 'stefania';
const GETTONE = '0c4a75996e036a8b08f79e3088cd322998431bbce60fc616';   /* valore del biscotto: cambiarlo butta fuori tutti */

const BISCOTTO = '__Host-portfolio';
const GIORNI = 30;

const pagina = errore => `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Stefania Sangiorgio — Portfolio</title>
<style>
  *{box-sizing:border-box}
  html,body{height:100%}
  body{margin:0;display:grid;place-items:center;background:#fff;color:#0c0c0c;
    font:15px/1.5 "Helvetica Neue",Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;padding:24px}
  form{width:min(320px,100%)}
  h1{margin:0 0 6px;font-size:15px;font-weight:400}
  p{margin:0 0 28px;color:#6e6e6a;font-size:13px}
  label{display:block;font-size:12px;color:#6e6e6a;margin:0 0 6px}
  input{display:block;width:100%;margin:0 0 18px;padding:11px 0;border:0;border-bottom:1px solid #0c0c0c;border-radius:0;
    background:none;color:inherit;font:inherit;font-size:16px;outline:none;-webkit-appearance:none;appearance:none}
  input:focus{border-bottom-width:2px;padding-bottom:10px}
  button{margin-top:10px;width:100%;padding:13px 16px;border:0;border-radius:0;background:#0c0c0c;color:#fff;font:inherit;font-size:13px;letter-spacing:.04em;cursor:pointer}
  .no{color:#b3261e;margin:-12px 0 20px;font-size:13px}
</style>
</head>
<body>
<form method="post" action="/__accesso" autocomplete="on">
  <h1>Stefania Sangiorgio</h1>
  <p>Portfolio, bozza riservata.</p>
  ${errore ? '<p class="no" role="alert">Nome o password non corretti.</p>' : ''}
  <label for="n">Nome</label>
  <input id="n" name="nome" type="text" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" required autofocus>
  <label for="p">Password</label>
  <input id="p" name="password" type="password" autocomplete="current-password" required>
  <button type="submit">Entra</button>
</form>
</body>
</html>`;

const chiusa = (errore, stato = 401) => new Response(pagina(errore), {
  status: stato,
  headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' },
});

const haBiscotto = request => (request.headers.get('cookie') || '')
  .split(';').map(c => c.trim()).some(c => c === `${BISCOTTO}=${GETTONE}`);

export default async function middleware(request) {
  const url = new URL(request.url);

  /* il modulo di accesso */
  if (url.pathname === '/__accesso') {
    if (request.method !== 'POST') return Response.redirect(new URL('/', url), 303);
    let nome = '', password = '';
    try {
      const dati = await request.formData();
      nome = String(dati.get('nome') || '').trim().toLowerCase();
      password = String(dati.get('password') || '');
    } catch (e) { /* modulo illeggibile: vale come sbagliato */ }
    if (!NOMI.includes(nome) || password !== PASSWORD) return chiusa(true);
    return new Response(null, {
      status: 303,
      headers: {
        Location: '/',
        'Set-Cookie': `${BISCOTTO}=${GETTONE}; Path=/; Max-Age=${GIORNI * 86400}; HttpOnly; Secure; SameSite=Lax`,
        'Cache-Control': 'no-store',
      },
    });
  }

  if (haBiscotto(request)) return next({ headers: { 'X-Robots-Tag': 'noindex, nofollow' } });
  return chiusa(false);
}
