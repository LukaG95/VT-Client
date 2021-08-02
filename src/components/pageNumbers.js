export default function pageNumbers(currentPage, pageAmount, setCurrentPage) {
  const pageButtons = [];

  const starting_number = () => {
    if (currentPage <= 5 || pageAmount <= 10) return 1;
    else if (currentPage + 5 >= pageAmount) return pageAmount - 9;
    else return currentPage - 5;
  };

  const ending_number = () => {
    if (pageAmount < 10) return pageAmount + 1;
    else return starting_number() + 10;
  };

  for (let i = starting_number(); i < ending_number(); i++)
    pageButtons.push(
      i === currentPage ? (
        <button className="pageButton highlighted-page">{i}</button>
      ) : (
        <button className="pageButton" onClick={() => setCurrentPage(i)}>
          {i}
        </button>
      )
    );

  return (
    <section className="page-numbers-field">
      <div
        onClick={() =>
          currentPage > 1 && setCurrentPage((prev) => prev - 1)
        }
        className="page-left noUserInteraction"
      ></div>
      {pageButtons}
      <div
        onClick={() =>
          currentPage < pageAmount && setCurrentPage((prev) => prev + 1)
        }
        className="page-right noUserInteraction"
      ></div>
    </section>
  );
}