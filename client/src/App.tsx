import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

// New SEO pages
import ServiceAML from "@/pages/ServiceAML";
import ServiceWorkday from "@/pages/ServiceWorkday";
import ServicePayroll from "@/pages/ServicePayroll";
import ServiceBilingual from "@/pages/ServiceBilingual";
import AboutPage from "@/pages/AboutPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/services/aml-consultant-canada" component={ServiceAML} />
      <Route path="/services/workday-implementation-specialist" component={ServiceWorkday} />
      <Route path="/services/project-manager-payroll-systems" component={ServicePayroll} />
      <Route path="/services/bilingual-implementation-manager" component={ServiceBilingual} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;