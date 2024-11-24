import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

const StartupsPage = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5000/api/startups", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStartups(response.data);
      } catch (err) {
        console.error("Ошибка при получении стартапов", err);
        setError("Не удалось загрузить стартапы. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  if (loading) {
    return <div className="text-center">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  if (startups.length === 0) {
    return <div className="text-center">Стартапы отсутствуют</div>;
  }

  return (
    <section className="StartupsPage">
      <div className="container">
        <h1 className="text-center mb-5">Стартапы</h1>
        <div className="row">
          {startups.map((startup) => (
            <div className="col-md-4 mb-3" key={startup._id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/${startup.image}`}
                  alt={startup.name}
                />
                <Card.Body>
                  <Card.Title>{startup.name}</Card.Title>
                  <Card.Text>{startup.description}</Card.Text>
                  <Button variant="primary">Контакт с владельцем</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StartupsPage;
