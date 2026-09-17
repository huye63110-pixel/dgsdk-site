// The social entries, shared by the footer and the Contact page's Direct
// Contact card. Inline SVG rather than icon-font glyphs on purpose: the row has
// to survive a Font Awesome failure, which is exactly what it did not do when
// the contact card carried <i class="fab ..."> instead.
//
// WHATSAPP is the chat link, and the number beside it on /contact is
// +61 403454968 - the one the footer and the Layout JSON-LD already publish.
export const WHATSAPP = 'https://api.whatsapp.com/message/5GGUQ62VROSIC1?autoload=1&app_absent=0';
export const EMAIL = 'dgsdk2013@gmail.com';

export const social = [
  ['Facebook', 'https://www.facebook.com/profile.php?id=61589304230341',
   'M14 21v-8h2.8l.5-3H14V8.1c0-.9.3-1.6 1.6-1.6h1.9V3.8c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.5V10h-3v3h3v8Z'],
  ['YouTube', 'https://youtube.com/@dgsdk-2013',
   'M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2a32 32 0 0 0-.5 3.8 32 32 0 0 0 .5 3.8 3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1 32 32 0 0 0 .5-3.8 32 32 0 0 0-.5-3.8ZM10 15.3V8.7l5.7 3.3Z'],
  ['TikTok', 'https://www.tiktok.com/@machineforge?_r=1&_t=ZS-95scfOHz6Ea',
   'M16 3c.4 2.3 1.7 3.7 4 4v3a9 9 0 0 1-4-1.1v7.2a5.5 5.5 0 1 1-5.5-5.5h.8v3.1a2.5 2.5 0 1 0 1.7 2.4V3Z'],
  ['LinkedIn', 'https://www.linkedin.com/in/james-hu-765b05406/',
   'M5.2 3.2a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.5 9h3.4v12H3.5Zm5.6 0h3.2v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.2 2.3 4.2 5.3v7h-3.4v-6.2c0-1.5 0-3.3-2-3.3s-2.2 1.6-2.2 3.2V21H9.1Z'],
  ['WhatsApp', WHATSAPP,
   'M20.4 3.6A11 11 0 0 0 3.1 16.8L1.5 22.5l5.9-1.6A11 11 0 0 0 20.4 3.6ZM12.6 20a9 9 0 0 1-4.6-1.3l-.3-.2-3.5.9.9-3.4-.2-.4A9 9 0 1 1 12.6 20Z'],
  ['Email', 'mailto:dgsdk2013@gmail.com',
   'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 8 8-5V7l-8 5-8-5v1Z'],
];
