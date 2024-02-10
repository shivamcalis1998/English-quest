import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, getBooksData } from "../../Redux/action";
import EditBooks from "../edit books/EditBooks";

const Dashboard = ({ token }) => {
  const { role, books, userId } = useSelector((state) => state);
  console.log(userId);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [booksd, setBooksD] = useState(null);

  const [query, setQuery] = useState({
    language: "",
    sort: "",
    category: "",
    userId: "",
    search: "",
  });

  const handleQuery = (e) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  };

  useEffect(() => {
    dispatch(getBooksData(query, token));
  }, [dispatch, token, query]);

  console.log(books);

  const HandleEditBooks = (book) => {
    setShow(true);
    setBooksD(book);
  };

  const handleDelete = (id) => {
    dispatch(deleteData(token, id));
  };

  return (
    <div>
      {show === true ? (
        <EditBooks token={token} setShow={setShow} booksd={booksd} />
      ) : (
        <div className="maindiv">
          <h2>Books</h2>
          <div className="selectContainer">
            <div>
              <select
                id="language"
                name="language"
                value={query.language}
                onChange={handleQuery}
                className="languageSelect"
              >
                <option value="">Select Language</option>
                <option value="hindi">Hindi</option>
                <option value="english">English</option>
                <option value="italian">Italian</option>
                <option value="russian">Russian</option>
                <option value="sanskrit">Sanskrit</option>
                <option value="urdu">Urdu</option>
                <option value="germen">Germen</option>
                <option value="marwadi">Marwadi</option>
              </select>
            </div>
            <div>
              <select
                id="sort"
                name="sort"
                value={query.sort}
                onChange={handleQuery}
                className="sortTimeSelect"
              >
                <option value="">Select Sort</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div>
              <select
                id="sorting"
                name="category"
                value={query.category}
                onChange={handleQuery}
                className="sortingSelect"
              >
                <option value="">Select Sort By time</option>
                <option value="old">Old</option>
                <option value="New">New</option>
              </select>
            </div>

            <div>
              <input
                type="text"
                placeholder="Search by title"
                name="search"
                value={query.search}
                onChange={handleQuery}
                className="searchInput"
              />
            </div>
            <div>
              <select
                id="sorting"
                name="sort"
                value={query.sort}
                onChange={handleQuery}
                className="sortingSelect"
              >
                <option value="">Sort by Rating</option>
                <option value="rating_asc">Ascending</option>
                <option value="rating_desc">Descending</option>
              </select>
            </div>

            {role === "CREATOR" ? (
              <div>
                <select
                  id="filter"
                  name="userId"
                  value={query.userId}
                  onChange={handleQuery}
                  className="sortingSelect"
                >
                  <option value="">filter Data by creator</option>

                  <option value={userId}>My Data</option>
                </select>
              </div>
            ) : (
              ""
            )}
          </div>

          {books && books.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>image</th>
                  <th>Language</th>
                  <th>Author</th>
                  <th>Rating</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books?.map((book) => (
                  <tr key={book?._id}>
                    <td>{book?.title}</td>
                    <td>
                      <img
                        src={`https://english-quest-back.onrender.com/uploads/${book?.image}`}
                        alt={book?.title}
                        style={{ maxWidth: "100px" }}
                      />
                    </td>
                    <td>{book?.language}</td>
                    <td>{book?.author}</td>
                    <td>{book?.rating}</td>
                    {book?.createdAt && (
                      <td>
                        {`${new Date(
                          book?.createdAt * 1
                        ).toLocaleTimeString()} ${new Date(
                          book?.createdAt * 1
                        ).toLocaleDateString()}`}
                      </td>
                    )}

                    <td>
                      {role === "CREATOR" && book.userId === userId ? (
                        <>
                          <button onClick={() => HandleEditBooks(book)}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(book._id)}>
                            Delete
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2 style={{ textAlign: "center" }}>books not avilable</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
