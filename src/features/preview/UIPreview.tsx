import { useLocation } from "react-router-dom";
import { Typography, Box } from "@mui/material";

export default function UIPreview() {
  const location = useLocation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h2" gutterBottom>
        {getPageName(location.pathname)}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Current Path: {location.pathname}
      </Typography>
    </Box>
  );
}

function getPageName(pathname: string) {
  switch (pathname) {
    case "/dashboard":
      return "📊 Dashboard";
    case "/summary":
      return "📈 Summary";
    case "/budget-overview":
      return "💼 Budget Overview";
    case "/goal-overview":
      return "🎯 Goal Overview";
    case "/savings-overview":
      return "💰 Savings Overview";
    case "/smart-insights":
      return "🧠 Smart Insights";
    case "/settings":
      return "⚙️ Settings";
    default:
      return "🔍 Unknown Page";
  }
}
