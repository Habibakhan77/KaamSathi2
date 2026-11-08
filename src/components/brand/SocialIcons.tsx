import React from "react";
import type { SocialPlatform } from "@/config/contact";

/**
 * Brand-coloured circular social icons (inline SVG — no extra dependency).
 * lucide-react has no WhatsApp/TikTok marks, so all four are drawn here for a consistent look.
 */

const FACEBOOK_F =
  "M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.03.28-1.73 1.76-1.73z";

const LINKEDIN_IN =
  "M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z";

const WHATSAPP =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z";

const TIKTOK =
  "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";

const BG: Record<SocialPlatform, string> = {
  facebook: "#1877F2",
  linkedin: "#0A66C2",
  whatsapp: "#25D366",
  tiktok: "#000000",
};

export function SocialIcon({
  platform,
  className = "w-6 h-6",
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-full flex-shrink-0 ring-1 ring-white/20 ${className}`}
      style={{ backgroundColor: BG[platform] }}
    >
      <svg viewBox="0 0 24 24" className="w-[58%] h-[58%]" fill="#FFFFFF">
        {platform === "facebook" && <path d={FACEBOOK_F} />}
        {platform === "linkedin" && <path d={LINKEDIN_IN} />}
        {platform === "whatsapp" && <path d={WHATSAPP} />}
        {platform === "tiktok" && (
          <>
            <path d={TIKTOK} fill="#25F4EE" transform="translate(-0.9 -0.9)" />
            <path d={TIKTOK} fill="#FE2C55" transform="translate(0.9 0.9)" />
            <path d={TIKTOK} fill="#FFFFFF" />
          </>
        )}
      </svg>
    </span>
  );
}

const GLYPH: Record<SocialPlatform, string> = {
  facebook: FACEBOOK_F,
  linkedin: LINKEDIN_IN,
  whatsapp: WHATSAPP,
  tiktok: TIKTOK,
};

/** Single-colour mark that inherits `currentColor` (for themed buttons like the footer). */
export function SocialGlyph({
  platform,
  className = "w-4 h-4",
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={`flex-shrink-0 ${className}`}>
      <path d={GLYPH[platform]} />
    </svg>
  );
}

export default SocialIcon;
