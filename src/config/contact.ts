/**
 * KaamSaathi Central Contact Configuration
 * All contact details, social profiles, and phone numbers are managed here.
 */

export interface ContactConfig {
  phoneRaw: string;
  phoneDisplay: string;
  whatsappUrl: string;
  email: string;
  linkedIn: string;
  facebookUrl: string;
  tiktokUrl: string;
  pilotNotice: string;
}

export const contactConfig: ContactConfig = {
  // Official helpline / WhatsApp line: +92 344 1850034
  phoneRaw: "03441850034",
  phoneDisplay: "+92 344 1850034",
  whatsappUrl: "https://wa.me/923441850034",
  email: "habibytes@gmail.com",
  linkedIn:
    "https://www.linkedin.com/in/laiba-khaist-215311308?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  facebookUrl: "https://www.facebook.com/share/1YV9AkdSa2/?mibextid=wwXIfr",
  tiktokUrl: "https://www.tiktok.com/@laibakhgn?is_from_webapp=1&sender_device=pc",
  pilotNotice: "Pilot launching in Swat",
};

/**
 * Official social links (header top bar, footer, contact page), in display order.
 * URLs come from `contactConfig` above — edit them there only.
 */
export type SocialPlatform = "facebook" | "linkedin" | "whatsapp" | "tiktok";

export interface SocialLink {
  id: SocialPlatform;
  label: string;
  href: string;
  ariaLabel: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: contactConfig.facebookUrl,
    ariaLabel: "KaamSaathi on Facebook (opens in a new tab)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: contactConfig.linkedIn,
    ariaLabel: "KaamSaathi on LinkedIn (opens in a new tab)",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: contactConfig.whatsappUrl,
    ariaLabel: `WhatsApp chat, ${contactConfig.phoneDisplay} (opens in a new tab)`,
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: contactConfig.tiktokUrl,
    ariaLabel: "KaamSaathi on TikTok (opens in a new tab)",
  },
];

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
