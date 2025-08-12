import { Switch, Route, useLocation } from "wouter";
import { lazy } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DemoModeProvider } from "@/contexts/DemoModeContext";

import { DemoBadge } from "@/components/ui/demo-badge";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Views from "@/pages/Views";
import Pricing from "@/pages/Pricing";
import Subscribe from "@/pages/Subscribe";
import Success from "@/pages/Success";
import Account from "@/pages/Account";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";

import Learn from "@/pages/Learn";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Sports from "@/pages/Sports";
import Calculator from "@/pages/Calculator";
import TradingTerminal from "@/pages/TradingTerminal";
import ViewBuilder from "@/pages/ViewBuilder";
import Dashboard from "@/pages/Dashboard";


import FAQ from "@/pages/FAQ";
import Tutorials from "@/pages/Tutorials";
import Resources from "@/pages/Resources";
import Glossary from "@/pages/Glossary";

function Router() {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/product" component={Product} />
          <Route path="/views" component={Views} />
          <Route path="/presets" component={Views} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/subscribe" component={Subscribe} />
          <Route path="/success" component={Success} />
          <Route path="/account" component={Account} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />

          <Route path="/learn" component={Learn} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/sports" component={Sports} />
          <Route path="/calculator" component={Calculator} />
          <Route path="/trading-terminal" component={TradingTerminal} />
          <Route path="/preset-terminal" component={lazy(() => import("./pages/PresetTerminal"))} />
          <Route path="/view-builder" component={ViewBuilder} />
          <Route path="/dashboard" component={Dashboard} />


          <Route path="/faq" component={FAQ} />
          <Route path="/tutorials" component={Tutorials} />
          <Route path="/resources" component={Resources} />
          <Route path="/glossary" component={Glossary} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />

      <DemoBadge />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DemoModeProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </DemoModeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
