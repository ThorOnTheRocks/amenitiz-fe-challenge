import { Link } from 'react-router-dom';
import ThemeToggle from '../theme-toggle';
import './header.css';

interface HeaderProps {
  title?: string;
  externalLinkText?: string;
  externalLinkUrl?: string;
}

export function Header({
  title = "Chess Grandmasters",
  externalLinkText = "Chess.com",
  externalLinkUrl = "https://www.chess.com/players"
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <div className="logo-icon">♖</div>
          <h2>{title}</h2>
        </Link>
        
        <nav className="header-nav">
          <a 
            href={externalLinkUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
          >
            {externalLinkText}
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
} 