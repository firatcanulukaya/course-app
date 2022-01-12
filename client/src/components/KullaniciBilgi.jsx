import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function KullaniciListe() {
  const [veri, setVeri] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:3001/kgetir/" + id)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setVeri(json)
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      İsim: {veri?.studentName}
        <br/>
        Sınıf: {veri?.studentClassName}
        <br/>
        Bilgi: {veri?.studentInfo} <br/>
      <Link to="/students">Geri dön</Link>
    </div>
  );
}

export default KullaniciListe;
