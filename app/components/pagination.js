const Pagination = ({ page, limit, count, setPage }) => {
  return (
    <div className="flex justify-between items-center pt-4">
      {/* Showing results */}
      <div className="flex space-x-2 text-muted">
        Showing {(page - 1) * limit + 1} to {Math.min(page * limit, count)} of{" "}
        {count} results
      </div>

      {/* Pagination controls */}
      <div className="flex space-x-2">
        {/* Previous button, disabled if on the first page */}
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`border-2 border-border text-dark py-2 hover:bg-gray-50 px-6 rounded-lg ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>

        {/* Next button, disabled if on the last page */}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page * limit >= count}
          className={`border-2 border-border text-dark hover:bg-gray-50 py-2 px-6 rounded-lg ${
            page * limit >= count ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
