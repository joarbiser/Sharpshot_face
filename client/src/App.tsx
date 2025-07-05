import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import Affiliate from "@/pages/Affiliate";
import Learn from "@/pages/Learn";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Sports from "@/pages/Sports";

function Router() {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/product" component={Product} />
          <Route path="/views" component={Views} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/subscribe" component={Subscribe} />
          <Route path="/success" component={Success} />
          <Route path="/account" component={Account} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/affiliate" component={Affiliate} />
          <Route path="/learn" component={Learn} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/sports" component={Sports} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
