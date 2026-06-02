import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import CardBackView from "./pages/CardBackView";
import SettingsView from "./pages/SettingsView";
import ExportView from "./pages/ExportView";
import Home from "./pages/Home";

function Router() {
  // O Trello Power-Up passa a view desejada via Query Params (ex: ?view=card-back)
  // para podermos usar o mesmo bundle React para todas as interfaces (iframes)
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view');

  switch (view) {
    case 'card-back':
      return <CardBackView />;
    case 'settings':
      return <SettingsView />;
    case 'export':
      return <ExportView />;
    default:
      // Fallback para home caso seja acessado diretamente fora do Trello
      return <Home />;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-right" closeButton />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
