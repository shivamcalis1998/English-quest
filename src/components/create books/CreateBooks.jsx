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
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Save the selected image file
    });
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("language", formData.language);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("image", formData.image);

    await dispatch(createBooksData(formDataToSend, token));

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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className={styles.heading}>Create Book</h2>
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
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBooks;
