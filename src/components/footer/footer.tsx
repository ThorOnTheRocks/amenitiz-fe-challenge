import './footer.css';

interface FooterProps {
  copyrightText?: string;
  disclaimerText?: string;
  links?: Array<{
    text: string;
    url: string;
  }>;
}

export function Footer({
  copyrightText = "Chess Grandmasters Explorer",
  disclaimerText = "This application uses data from the Chess.com API. Chess.com is a registered trademark.",
  links = [
    { text: "Terms", url: "https://www.chess.com/terms" },
    { text: "About Chess.com", url: "https://www.chess.com/about" },
    { text: "Privacy", url: "https://www.chess.com/legal/privacy" }
  ]
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">
          &copy; {currentYear} {copyrightText}
        </p>
        
        <div className="footer-links">
          {links.map((link, index) => (
            <a 
              key={index}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
      
      <div className="footer-disclaimer">
        <p className="disclaimer-text">
          {disclaimerText}
        </p>
      </div>
    </footer>
  );
} 