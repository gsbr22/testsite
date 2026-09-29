'use strict';
// Configuration Firebase d'origine conservée. Les règles de la base protègent les données.
const firebaseConfig = {
    apiKey: "AIzaSyBzMi3F5vLM0bYxTY1KuBJf7eD6Nx96wsQ",
    authDomain: "login-ec53a.firebaseapp.com",
    projectId: "login-ec53a",
    storageBucket: "login-ec53a.appspot.com",
    messagingSenderId: "123644267529",
    appId: "1:123644267529:web:5409efdf896971c655bcd8",
    storageBucket: "login-ec53a.appspot.com"
};
(() => {
  const $ = id => document.getElementById(id);
  const page = location.pathname.split('/').pop();
  let auth = null, database = null, authPromise = null, notificationTimer;
  const scripts = new Map();
  function loadScript(src) {
    if (!scripts.has(src)) scripts.set(src, new Promise((resolve, reject) => {
      const script = document.createElement('script'); script.src = src; script.async = true;
      const timeout = setTimeout(() => { script.remove(); reject(new Error('service-unavailable')); }, 12000);
      script.onload = () => { clearTimeout(timeout); resolve(); };
      script.onerror = () => { clearTimeout(timeout); script.remove(); reject(new Error('service-unavailable')); };
      document.head.append(script);
    }).catch(error => { scripts.delete(src); throw error; }));
    return scripts.get(src);
  }
  function message(element, text, error = false) {
    if (!element) return;
    element.textContent = text; element.classList.toggle('error', error); element.classList.toggle('success', !!text && !error);
  }
  function showNotification(text, success = true) {
    message($('notificationRegion'), text, !success);
    clearTimeout(notificationTimer);
    notificationTimer = setTimeout(() => message($('notificationRegion'), ''), 6000);
  }
  window.showNotification = showNotification;
  const friendlyError = error => ({
    'auth/invalid-email': 'Vérifie le format de ton adresse email.',
    'auth/user-not-found': 'Email ou mot de passe incorrect. Vérifie tes informations.',
    'auth/wrong-password': 'Email ou mot de passe incorrect. Vérifie tes informations.',
    'auth/invalid-login-credentials': 'Email ou mot de passe incorrect. Vérifie tes informations.',
    'auth/email-already-in-use': 'Cette adresse possède déjà un compte. Connecte-toi avec ton mot de passe.',
    'auth/weak-password': 'Choisis un mot de passe d’au moins 6 caractères.',
    'auth/too-many-requests': 'Trop de tentatives. Patiente quelques minutes avant de réessayer.',
    'auth/requires-recent-login': 'Reconnecte-toi, puis réessaie de supprimer ton compte.',
    'auth/network-request-failed': 'Connexion interrompue. Vérifie ton accès à Internet et réessaie.',
    'auth/user-disabled': 'Ce compte est désactivé. Contacte SparrOne pour obtenir de l’aide.'
  }[error?.code] || 'Le service ne répond pas pour le moment. Réessaie ou contacte sparr.onecrp@gmail.com.');
  async function getAuth() {
    if (!authPromise) authPromise = (async () => {
      await loadScript('assets/vendor/firebase-app.js');
      await loadScript('assets/vendor/firebase-auth.js');
      await loadScript('assets/vendor/firebase-database.js');
      if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
      auth = firebase.auth();
      try { database = firebase.database(); } catch { database = null; }
      window.firebaseAuth = auth; window.firebaseDB = database;
      auth.onAuthStateChanged(user => {
        if ($('loginLink')) $('loginLink').querySelector('span').textContent = user ? 'Mon compte' : 'Connexion';
        if (user && database) database.ref('users/' + user.uid).update({lastLogin: firebase.database.ServerValue.TIMESTAMP}).catch(() => {});
        if ($('userEmail')) renderAccount(user);
      }, () => { if ($('accountStatus')) message($('accountStatus'), 'Impossible de charger ton compte. Réessaie en actualisant la page.', true); });
      return { auth, database };
    })().catch(error => { authPromise = null; throw error; });
    return authPromise;
  }
  window.checkAuth = async () => { const {auth} = await getAuth(); return new Promise(resolve => { const unsub = auth.onAuthStateChanged(u => {resolve(!!u);setTimeout(() => unsub(), 0);}); }); };
  let previousFocus = null;
  function openModal(id) {
    const modal = $(id); if (!modal) return;
    if (!$('loginModal')?.open && !$('registerModal')?.open && !$('deleteModal')?.open) previousFocus = document.activeElement;
    document.querySelectorAll('dialog[open]').forEach(d => d.close());
    modal.showModal(); document.body.style.overflow = 'hidden';
    (modal.querySelector('[autofocus]') || modal.querySelector('input') || modal.querySelector('button'))?.focus();
  }
  function closeModal(modal, restore = true) {
    modal.close(); document.body.style.overflow = '';
    if (restore && previousFocus?.isConnected) previousFocus.focus();
  }
  document.querySelectorAll('dialog').forEach(modal => {
    modal.addEventListener('cancel', event => {event.preventDefault(); closeModal(modal);});
    modal.addEventListener('close', () => { if (!document.querySelector('dialog[open]')) document.body.style.overflow = ''; });
    modal.addEventListener('keydown', event => {
      if (event.key !== 'Tab' || document.querySelector('dialog[open]') !== modal) return;
      const items = [...modal.querySelectorAll('a[href],button:not(:disabled),input:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])')]
        .filter(item => item.getClientRects().length && item.getAttribute('aria-hidden') !== 'true');
      if (!items.length) { event.preventDefault(); modal.focus(); return; }
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
      }
    });
    modal.querySelector('.close')?.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', e => { if (e.target === modal && !modal.querySelector('[aria-busy=true]')) {const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal(modal);} });
  });
  const menu = document.querySelector('.menu-toggle');
  function closeMenu() { $('mainNav')?.classList.remove('is-open'); menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Ouvrir le menu'); }
  menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu'); $('mainNav').classList.toggle('is-open',open); });
  $('mainNav')?.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown', e => {if(e.key==='Escape' && menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
  $('loginLink')?.addEventListener('click', e => {
    if (!$('loginModal')) return;
    e.preventDefault(); if (auth?.currentUser) {location.href='moncompte.html';return;}
    openModal('loginModal');
  });
  $('showRegister')?.addEventListener('click',e=>{e.preventDefault();openModal('registerModal');});
  $('showLogin')?.addEventListener('click',e=>{e.preventDefault();openModal('loginModal');});
  document.querySelectorAll('[data-password]').forEach(button => button.addEventListener('click', () => {
    const input = $(button.dataset.password), show = input.type === 'password';input.type=show?'text':'password';button.textContent=show?'Masquer':'Afficher';button.setAttribute('aria-label',(show?'Masquer':'Afficher')+' le mot de passe');
  }));
  document.querySelectorAll('textarea').forEach(input=>input.addEventListener('input',()=>{input.style.height='auto';input.style.height=input.scrollHeight+'px';}));
  function setFieldError(input, text) {
    const error = $(input.id+'Error'); if (error) error.textContent=text;
    input.setAttribute('aria-invalid',text?'true':'false');
    if(text && error)input.setAttribute('aria-describedby',error.id);else input.removeAttribute('aria-describedby');
  }
  function validate(form) {
    let first;
    form.querySelectorAll('input[required],textarea[required]').forEach(input => {
      let text='';
      if(input.type==='checkbox'&&!input.checked)text='Coche cette case pour créer ton compte.';
      else if(input.type!=='checkbox'&&!input.value.trim())text='Renseigne ce champ.';
      else if(input.type==='email' && !input.validity.valid)text='Saisis une adresse email valide, par exemple nom@exemple.fr.';
      else if(input.type==='password'&&input.value.length<6)text='Utilise au moins 6 caractères.';
      if(input.id==='registerConfirmPassword' && input.value!==$('registerPassword').value)text='Les mots de passe doivent être identiques.';
      setFieldError(input,text); if(text&&!first)first=input;
    });
    if(first)first.focus(); return !first;
  }
  function busy(form, active) { const b=form.querySelector('[type=submit]'); b.disabled=active;b.setAttribute('aria-busy',String(active));form.dataset.busy=String(active); }
  $('loginForm')?.addEventListener('submit',async e=>{
    e.preventDefault();const form=e.currentTarget,status=form.querySelector('.form-status');if(form.dataset.busy==='true'||!validate(form))return;
    busy(form,true);message(status,'Connexion en cours…');
    try {const {auth}=await getAuth();await auth.signInWithEmailAndPassword($('loginEmail').value.trim(),$('loginPassword').value);form.reset();message(status,'');closeModal($('loginModal'));showNotification('Tu es connecté à ton compte.');}
    catch(error){message(status,friendlyError(error),true);}finally{busy(form,false);}
  });
  $('registerForm')?.addEventListener('submit',async e=>{
    e.preventDefault();const form=e.currentTarget,status=form.querySelector('.form-status');if(form.dataset.busy==='true'||!validate(form))return;
    busy(form,true);message(status,'Création du compte…');
    try {
      const {auth,database}=await getAuth();
      if(!database)throw new Error('database-unavailable');
      const credential=await auth.createUserWithEmailAndPassword($('registerEmail').value.trim(),$('registerPassword').value);
      try {await database.ref('users/'+credential.user.uid).set({name:$('registerName').value.trim(),email:$('registerEmail').value.trim(),createdAt:firebase.database.ServerValue.TIMESTAMP,lastLogin:firebase.database.ServerValue.TIMESTAMP});}
      catch {message(status,'Ton compte a été créé, mais tes informations n’ont pas pu être enregistrées. Ne recommence pas l’inscription : contacte sparr.onecrp@gmail.com.',true);return;}
      form.reset();message(status,'');closeModal($('registerModal'));showNotification('Ton compte est créé. Bienvenue sur SparrOne.');
    } catch(error){message(status,friendlyError(error),true);}finally{busy(form,false);}
  });
  $('contactForm')?.addEventListener('submit',async e=>{
    e.preventDefault();const form=e.currentTarget,status=form.querySelector('.form-status');if(form.dataset.busy==='true'||!validate(form))return;
    busy(form,true);message(status,'Envoi en cours…');
    try {
      const key=window.SPARRONE_CONFIG?.emailjsPublicKey;
      if(!key){message(status,'L’envoi par formulaire n’est pas disponible pour le moment. Écris directement à sparr.onecrp@gmail.com ; ton message est conservé ci-dessus.',true);return;}
      await loadScript('assets/vendor/email.min.js');emailjs.init(key);
      await emailjs.sendForm('default_service','template_nu2qbqm',form);
      form.reset();message(status,'Ton message a bien été envoyé. Merci !');
    }catch{message(status,'Le message n’a pas pu être envoyé. Réessaie ou écris à sparr.onecrp@gmail.com. Ton texte est conservé.',true);}finally{busy(form,false);}
  });
  // Consentement : aucune URL Stripe n’est remplacée ou construite.
  const consent=$('cgvOk'), buy=$('buyBtn');
  if(consent&&buy){
    function sync(){buy.setAttribute('aria-disabled',String(!consent.checked));message($('consentHint'),consent.checked?'Tu peux maintenant accéder au paiement Stripe.':'Coche la case ci-dessus pour accéder au paiement.');}
    consent.addEventListener('change',sync);
    function guard(e){if(!consent.checked){e.preventDefault();consent.focus();message($('consentHint'),'Accepte les CGV et la demande d’accès immédiat avant de payer.',true);}}
    buy.addEventListener('click',guard);buy.addEventListener('auxclick',guard);buy.addEventListener('contextmenu',guard);sync();
  }
  let accountVersion=0;
  async function renderAccount(user){
    const version=++accountVersion; $('logoutBtn').disabled=!user;$('deleteAccountBtn').disabled=!user;$('accountLogin').hidden=!!user;
    $('accountName').textContent='';$('accountDate').textContent='';
    if(!user){$('userEmail').textContent='Connecte-toi pour retrouver tes informations.';message($('accountStatus'),'');return;}
    $('userEmail').textContent=user.email;message($('accountStatus'),'');
    if(!database){message($('accountStatus'),'Tes informations complémentaires sont indisponibles. Tu peux te déconnecter ou réessayer plus tard.',true);return;}
    try{const snapshot=await database.ref('users/'+user.uid).once('value');if(version!==accountVersion)return;const data=snapshot.val();if(data){$('accountName').textContent='Nom : '+(data.name||'Non renseigné');const date=new Date(data.createdAt);if(data.createdAt&&!Number.isNaN(date.valueOf()))$('accountDate').textContent='Membre depuis le '+date.toLocaleDateString('fr-FR');}}
    catch{message($('accountStatus'),'Impossible de charger les informations complémentaires. Réessaie plus tard.',true);}
  }
  $('logoutBtn')?.addEventListener('click',async()=>{const b=$('logoutBtn');b.disabled=true;try{await auth.signOut();location.href='index.html';}catch(error){message($('accountStatus'),friendlyError(error),true);b.disabled=false;}});
  $('deleteAccountBtn')?.addEventListener('click',()=>{message($('deleteStatus'),'');openModal('deleteModal');});
  $('cancelDelete')?.addEventListener('click',()=>closeModal($('deleteModal')));
  $('confirmDelete')?.addEventListener('click',async()=>{
    const user=auth?.currentUser,b=$('confirmDelete'),status=$('deleteStatus');if(!user||b.disabled)return;
    if(!database){message(status,'La base de données est indisponible. La suppression n’a pas été effectuée. Réessaie plus tard.',true);return;}
    b.disabled=true;b.setAttribute('aria-busy','true');$('cancelDelete').disabled=true;message(status,'Suppression en cours…');
    let backup,removed=false;
    try{
      // Vérifier la session récente avant toute suppression de données.
      const token=await user.getIdTokenResult();if(Date.now()-new Date(token.authTime).getTime()>5*60*1000){const e=new Error();e.code='auth/requires-recent-login';throw e;}
      const ref=database.ref('users/'+user.uid);backup=(await ref.once('value')).val();await ref.remove();removed=true;
      try{await user.delete();}catch(error){if(removed&&backup!==null){try{await ref.set(backup);}catch{message(status,'Le compte existe encore, mais la restauration de ses informations a échoué. Contacte sparr.onecrp@gmail.com.',true);return;}}throw error;}
      location.href='index.html';
    }catch(error){message(status,friendlyError(error),true);}finally{b.disabled=false;b.setAttribute('aria-busy','false');$('cancelDelete').disabled=false;}
  });
  if($('loginModal')||$('userEmail'))getAuth().catch(()=>{
    if($('accountStatus')){message($('accountStatus'),'Le service de compte est indisponible. Actualise la page pour réessayer.',true);$('userEmail').textContent='Impossible de charger le compte.';$('accountLogin').hidden=false;}
  });
  if($('loginModal')&&new URLSearchParams(location.search).get('connexion')==='1')openModal('loginModal');
})();
