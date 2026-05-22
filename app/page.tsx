'use client'

import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [lang, setLang] = useState<'en' | 'kr'>('en')

  const content = {
    en: {
      title: "Travel AI",
      subtitle: "Plan your perfect trip with AI",
      button: "Go Planner →"
    },
    kr: {
      title: "트래블 AI",
      subtitle: "AI로 만드는 완벽한 여행 일정",
      button: "여행 플래너 시작 →"
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.overlay} />

      {/* language switch */}
      <div style={styles.langSwitch}>
        <button onClick={() => setLang('en')} style={styles.langBtn}>EN</button>
        <button onClick={() => setLang('kr')} style={styles.langBtn}>KR</button>
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>{content[lang].title}</h1>
        <p style={styles.subtitle}>{content[lang].subtitle}</p>

        <Link href="/plan" style={styles.button}>
          {content[lang].button}
        </Link>
      </div>
    </div>
  )
}

const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "system-ui, sans-serif"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.55)"
  },

  content: {
    position: "relative",
    textAlign: "center",
    color: "white",
    zIndex: 1
  },

  title: {
    fontSize: "64px",
    fontWeight: "800",
    marginBottom: "10px"
  },

  subtitle: {
    fontSize: "20px",
    marginBottom: "30px",
    opacity: 0.85
  },

  button: {
    padding: "14px 28px",
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "600",
    display: "inline-block"
  },

  langSwitch: {
    position: "absolute",
    top: "20px",
    right: "20px",
    display: "flex",
    gap: "8px"
  },

  langBtn: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer"
  }
}