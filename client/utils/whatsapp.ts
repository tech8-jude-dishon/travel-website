// WhatsApp business contact number (E.164 format, leading space matches original build)
const WHATSAPP_NUMBER = ' +971589520398';

/**
 * Build a WhatsApp chat link for the given message.
 * Uses the mobile API endpoint on phones and the web endpoint on desktop.
 */
export const getWhatsAppLink = (text: string): string => {
  const base = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    ? 'https://api.whatsapp.com/send'
    : 'https://web.whatsapp.com/send';
  return `${base}?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;
};
