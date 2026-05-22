'use client'

import { useState } from "react"
import PlanForm from "../../components/planner/PlanForm"
import PlanResult from "../../components/planner/PlanResult"

export default function PlanPage() {
  const [plan, setPlan] = useState(null)

  return (
    <div style={styles.container}>
      <div style={styles.overlay} />

      <div style={styles.content}>
        <h1 style={styles.title}>AI Travel Planner</h1>

        <PlanForm onResult={setPlan} />
        <PlanResult plan={plan} />
      </div>
    </div>
  )
}

const styles: any = {
  container: {
    minHeight: "100vh",
    padding: "40px 20px",
    position: "relative",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "system-ui, sans-serif"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.6)"
  },

  content: {
    position: "relative",
    zIndex: 1,
    color: "white",
    maxWidth: "900px",
    margin: "0 auto"
  },

  title: {
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "20px"
  }
}