import React, { useState } from "react";
import { Link } from "react-router-dom";

function KullaniciEkle() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  function sendData(firstName, lastName, email) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      studentName: firstName,
      lastName: lastName,
      email: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/c", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  function deleteAll() {
    fetch("http://localhost:3001/d");
  }

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => sendData(firstName, lastName, email)}>
        Submit
      </button>
      <button onClick={() => deleteAll()}>Delete All</button>
      <Link to="/kullanicilar">Kullanıcılar</Link>
    </div>
  );
}

export default KullaniciEkle;
