import type { ReactNode } from 'react';
import { Header } from '../header';
import { Footer } from '../footer';
import './layout.css';

interface LayoutProps {
  children: ReactNode;
  headerTitle?: string;
  headerExternalLinkText?: string;
  headerExternalLinkUrl?: string;
  footerCopyrightText?: string;
  footerDisclaimerText?: string;
  footerLinks?: Array<{ text: string; url: string }>;
}

export function Layout({ 
  children,
  headerTitle,
  headerExternalLinkText,
  headerExternalLinkUrl,
  footerCopyrightText,
  footerDisclaimerText,
  footerLinks
}: LayoutProps) {
  return (
    <div className="layout">
      <Header 
        title={headerTitle} 
        externalLinkText={headerExternalLinkText}
        externalLinkUrl={headerExternalLinkUrl}
      />
      <main className="main-content">
        {children}
      </main>
      <Footer 
        copyrightText={footerCopyrightText}
        disclaimerText={footerDisclaimerText}
        links={footerLinks}
      />
    </div>
  );
} 