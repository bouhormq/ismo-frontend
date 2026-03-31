type Props = {
  isVisible: boolean;
  message?: string;
};

const PdfLoadingOverlay = ({ isVisible, message = "Génération du PDF en cours..." }: Props) => {
  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.55)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "32px 48px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "4px solid #E5E7EB",
            borderTopColor: "#3B82F6",
            animation: "pdfSpin 0.75s linear infinite",
          }}
        />
        <p style={{ fontSize: "14px", fontWeight: 500, color: "#374151", margin: 0 }}>
          {message}
        </p>
      </div>
      <style>{`
        @keyframes pdfSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PdfLoadingOverlay;
