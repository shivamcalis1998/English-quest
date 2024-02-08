import React, { useState } from "react";
import styles from "./CreateBooks.module.css"; // Import the CSS file
import { useDispatch } from "react-redux";
import { createBooksData } from "../../Redux/action";
import { useNavigate } from "react-router-dom";

const CreateBooks = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    language: "",
    rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createBooksData(formData, token));
    console.log(formData);
    setFormData({
      title: "",
      author: "",
      language: "",
      rating: "",
    });
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create Book</h2>

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
          {/* Select tag for language with options */}
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
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBooks;
