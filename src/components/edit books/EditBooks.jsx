import React, { useState } from "react";
import styles from "../create books/CreateBooks.module.css";
import { useDispatch } from "react-redux";
import { editbooks } from "../../Redux/action";

const EditBooks = ({ token, setShow, booksd }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: booksd.title,
    author: booksd.author,
    language: booksd.language,
    rating: booksd.rating,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editbooks(token, booksd._id, formData));
    console.log(formData);
    setFormData({
      title: "",
      author: "",
      language: "",
      rating: "",
    });
    setShow(false);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className={styles.heading}>Edit Book Data</h2>
        <button onClick={() => handleClose()} className={styles.closeBtn}>
          X
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="author" className={styles.label}>
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="language" className={styles.label}>
            Language:
          </label>

          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className={styles.select}
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

        <div className={styles.formGroup}>
          <label htmlFor="rating" className={styles.label}>
            Rating:
          </label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBooks;
