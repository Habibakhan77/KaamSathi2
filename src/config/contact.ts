/**
 * KaamSaathi Central Contact Configuration
 * All contact details, social profiles, and phone numbers are managed here.
 */

export interface ContactConfig {
  phoneRaw: string;
  phoneDisplay: string;
  email: string;
  linkedIn: string;
  facebookUrl: string;
  facebookHandle: string;
  tiktokUrl: string; // If empty, TikTok icon is not rendered
  pilotNotice: string;
}

export const contactConfig: ContactConfig = {
  // NOTE & TODO: The provided number '034444442012' has 12 digits, while standard Pakistani
  // mobile numbers are 11 digits (03XX XXXXXXX). Kept exactly as provided.
  phoneRaw: "034444442012",
  phoneDisplay: "0344-44442012",
  email: "habibytes@gmail.com",
  linkedIn: "https://www.linkedin.com/in/habiba-khan-011830375/",
  facebookUrl: "https://www.facebook.com/Habibytes",
  facebookHandle: "Habibytes",
  tiktokUrl: "", // Kept empty until TikTok handle is provided; icon will hide automatically
  pilotNotice: "Pilot launching in Swat",
};

/**
 * Converts a Pakistani local phone number into an international wa.me WhatsApp URL.
 * Automatically strips non-digits, drops a leading 0, and prefixes country code 92.
 * Emits a dev-console warning if length is not standard 11 digits.
 */
export function getWhatsAppUrl(
  rawPhone: string = contactConfig.phoneRaw,
  prefillText: string = "Salam KaamSaathi! I need assistance with a service booking."
): string {
  const digitsOnly = rawPhone.replace(/\D/g, "");

  // Development check for standard 11 digits (03XXXXXXXXX)
  if (process.env.NODE_ENV !== "production") {
    if (digitsOnly.length !== 11) {
      console.warn(
        `[KaamSaathi Warning] WhatsApp phone number '${rawPhone}' has ${digitsOnly.length} digits. Standard Pakistani mobile numbers have 11 digits (e.g. 03451234567). Please verify.`
      );
    }
  }

  // Format for WhatsApp: if starts with 0, drop it and prefix 92
  let internationalNumber = digitsOnly;
  if (digitsOnly.startsWith("0")) {
    internationalNumber = "92" + digitsOnly.slice(1);
  } else if (!digitsOnly.startsWith("92")) {
    internationalNumber = "92" + digitsOnly;
  }

  const encodedText = encodeURIComponent(prefillText);
  return `https://wa.me/${internationalNumber}${encodedText ? `?text=${encodedText}` : ""}`;
}
