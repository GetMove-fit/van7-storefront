"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsappBubble() {
  return (
    <FloatingWhatsApp
      phoneNumber="+436763372556"
      accountName="Stefan Ressler"
      avatar="/Stefan.webp"
      chatMessage="Hallo! Wie darf ich Dir helfen? Liebe Grüße - Stefan von Van7"
      placeholder="Nachricht eingeben..."
    />
  );
}
