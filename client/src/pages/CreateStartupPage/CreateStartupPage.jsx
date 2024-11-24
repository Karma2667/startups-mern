import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateStartupPage = () => {
  const [startupName, setStartupName] = useState("");
  const [startupDescription, setStartupDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/startups",
        { name: startupName, description: startupDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate("/startups"); // Переход после создания стартапа
    } catch (err) {
      console.error("Ошибка при создании стартапа", err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card" style={{ width: "500px" }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Создать стартап</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Название стартапа</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите название"
                value={startupName}
                onChange={(e) => setStartupName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Введите описание"
                value={startupDescription}
                onChange={(e) => setStartupDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Создать
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateStartupPage;
