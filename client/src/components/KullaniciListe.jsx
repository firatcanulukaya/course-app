import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function KullaniciListe() {
  const [veri, setVeri] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((response) => response.json())
      .then((json) => setVeri(json))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {veri.map((item) => (
        <div key={item.id}>
          <Link to={`/kullanici/${item.id}`}>
            {item.firstName} - {item.lastName}
          </Link>
        </div>
      ))}
      <Link to="/">Kullanıcı ekle</Link>
    </div>
  );
}

export default KullaniciListe;
