import React, { useEffect } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { getBooksData } from "../../Redux/action";

const Dashboard = ({ token }) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBooksData(token));
  }, [dispatch, token]);

  console.log(books);
  return (
    <div className="maindiv">
      <h2>Books</h2>
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
            <tr key={book?.id}>
              <td>{book?.title}</td>
              <td>{book?.language}</td>
              <td>{book?.author}</td>
              <td>{book?.rating}</td>
              <td>
                {book.createdAt
                  ? `${new Date(
                      book.createdAt * 1
                    ).toLocaleTimeString()} ${new Date(
                      book.createdAt * 1
                    ).toLocaleDateString()}`
                  : "N/A"}
              </td>

              <td>
                {/* Actions column, you can add buttons for edit, delete, etc. */}
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
