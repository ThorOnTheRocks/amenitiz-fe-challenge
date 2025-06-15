import './pagination.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const startPage = currentPage <= 2 
      ? 2 
      : currentPage >= totalPages - 1 
        ? totalPages - 2 
        : Math.max(2, currentPage - 1);
        
    const endPage = currentPage <= 2 
      ? 3 
      : currentPage >= totalPages - 1 
        ? totalPages - 1 
        : Math.min(totalPages - 1, currentPage + 1);
    
    const middlePages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
    
    return [
      1,
      ...(startPage > 2 ? ['...'] : []),
      ...middlePages,
      ...(endPage < totalPages - 1 ? ['...'] : []),
      totalPages
    ];
  };

  return (
    <div className="pagination-container">
      <button 
        className="pagination-button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        &laquo;
      </button>

      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="pagination-ellipsis">
            {page}
          </span>
        )
      ))}

      <button 
        className="pagination-button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        &raquo;
      </button>
    </div>
  );
} 