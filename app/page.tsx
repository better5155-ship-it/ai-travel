'use client'
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    marginBottom: "10px",
    letterSpacing: "-1px"
  },

  subtitle: {
    fontSize: "20px",
    marginBottom: "30px",
    opacity: 0.85
  },

  button: {
    padding: "14px 28px",
    backgroundColor: "#ffffff",
    color: "#000",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "600"
  },

  langSwitch: {
    position: "absolute",
    top: "20px",
    right: "20px",
    zIndex: 2,
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