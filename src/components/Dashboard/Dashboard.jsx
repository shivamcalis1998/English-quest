import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, getBooksData } from "../../Redux/action";
import EditBooks from "../edit books/EditBooks";

const Dashboard = ({ token }) => {
  const role = useSelector((state) => state.role);
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const [show, setShow] = useState(false);
  const [booksd, setBooksD] = useState(null);

  useEffect(() => {
    dispatch(getBooksData(token));
  }, [dispatch, token]);

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
          {books && books.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
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
                      {role === "CREATOR" ? (
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
