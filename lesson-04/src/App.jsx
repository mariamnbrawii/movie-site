

import { useState } from "react";
import Header from "./components/Header.jsx";
import MovieList from "./components/MovieList.jsx";
import Footer from "./components/Footer.jsx";
import { movies } from "./data/movies.js";

function App() {
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [visibleCount, setVisibleCount] = useState(4);

  const topRated = movies.filter(movie => movie.rating >= 8.7);

  const genres = movies
    .map(movie => movie.genre)
    .filter((genre, index, all) => all.indexOf(genre) === index);

  const shownMovies = movies.filter(movie => {
    const matchesGenre =
      selectedGenre === "All" || movie.genre === selectedGenre;

    const matchesAvailable =
      !onlyAvailable || movie.available;

    return matchesGenre && matchesAvailable;
  });

  const visibleMovies = shownMovies.slice(0, visibleCount);

  function toggleAvailable() {
    setOnlyAvailable(!onlyAvailable);
    setVisibleCount(4);
  }

  function changeGenre(genre) {
    setSelectedGenre(genre);
    setVisibleCount(4);
  }

  function showMore() {
    setVisibleCount(visibleCount + 4);
  }

  return (
    <>
      <Header />

      <main className="page container">
        <section className="page__intro">
          <h1>הקטלוג</h1>
          <p>סרטים שכדאי לראות — הישנים הטובים והחדשים.</p>
        </section>

        <MovieList title="הכי מדורגים" movies={topRated} />

        <div className="toolbar">
          <button
            className={onlyAvailable ? "btn btn--active" : "btn"}
            onClick={toggleAvailable}
          >
            רק זמינים לצפייה
          </button>

          <button
            className={selectedGenre === "All" ? "btn btn--active" : "btn"}
            onClick={() => changeGenre("All")}
          >
            הכל
          </button>

          {genres.map(genre => (
            <button
              key={genre}
              className={selectedGenre === genre ? "btn btn--active" : "btn"}
              onClick={() => changeGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        <p>נמצאו {shownMovies.length} סרטים</p>

        {shownMovies.length === 0 ? (
          <p>לא נמצאו סרטים מתאימים</p>
        ) : (
          <>
            <MovieList title="כל הסרטים" movies={visibleMovies} />

            {visibleCount < shownMovies.length && (
              <button className="btn" onClick={showMore}>
                הצג עוד
              </button>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
