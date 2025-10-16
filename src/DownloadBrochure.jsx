import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import brochurePdf from "./Assets/Rraynex_Brochure.pdf";

const DownloadBrochure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("a");
    link.href = brochurePdf;
    link.download = "Rraynex_Brochure.pdf";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const canGoBack = typeof window !== "undefined" && window.history.state?.idx > 0;
    navigate(canGoBack ? -1 : "/", { replace: true });
  }, [navigate]);

  return null;
};

export default DownloadBrochure;
