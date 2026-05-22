import Link from "next/link"

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.overlay} />

      <div style={styles.content}>
        <h1 style={styles.title}>Travel AI</h1>
        <p style={styles.subtitle}>Plan your perfect trip with AI</p>

        <Link href="/plan" style={styles.button}>
          Go Planner →
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
    fontFamily: "Arial, sans-serif",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
  },

  content: {
    position: "relative",
    textAlign: "center",
    color: "white",
    zIndex: 1,
  },

  title: {
    fontSize: "60px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "20px",
    marginBottom: "30px",
    opacity: 0.8,
  },

  button: {
    padding: "12px 24px",
    backgroundColor: "#ffffff",
    color: "#000",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold",
  },
}