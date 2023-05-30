import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";

const Recipe = () => {
  const { id } = useParams();
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);


  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      });
  }, []);

  if (isLoading) {
    return <p>Идет загрузка...</p>;
  }

  return (
    <div>Recipe</div>
  )
}

export default Recipe