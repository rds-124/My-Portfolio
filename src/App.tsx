import '@lottiefiles/lottie-player';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Layout from "@/components/Layout";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/hooks/useTheme";
import { CursorProvider } from "@/hooks/useCursor";
import CustomCursor from "@/CustomCursor";

// --- 1. IMPORT THE HOOK ---
import { useIsDesktop } from "@/hooks/useIsDesktop";

const queryClient = new QueryClient();

const App = () => {
  // --- 2. USE THE HOOK TO CHECK SCREEN SIZE ---
  const isDesktop = useIsDesktop();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CursorProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            
            {/* --- 3. ONLY RENDER THE CURSOR ON DESKTOP --- */}
            {isDesktop && <CustomCursor />}

            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </TooltipProvider>
        </CursorProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;