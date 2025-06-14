import type { ReactNode } from 'react';
import { Header } from '../header';
import { Footer } from '../footer';
import './layout.css';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
} 