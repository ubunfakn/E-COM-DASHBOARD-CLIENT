import React, { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [productCount, setProductCount] = useState();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let data = localStorage.getItem("user");
    let result = await window
      .fetch("http://localhost:8080/getuser", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("key")),
        },
        method: "POST",
        body: data,
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(result);
    if (result !== undefined) {
      if (!result.err && result.status !== 404) {
        result = await result.json();
        setProfile(result);
      } else {
        alert("Invalid username and password");
      }

      data = JSON.parse(data);
    }

    let res = await window
      .fetch(`http://localhost:8080/getproduct/user_id/${data._id}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("key")),
        },
      })
      .catch((error) => {
        console.log(error);
      });
    if (res !== undefined) {
      res = await res.json();
      setProductCount(res);
    }
  };

  return (
    <div className="mt-5 mb-2 container">
      <div className="row mt-4">
        <div className="col-md-8 offset-md-2">
          <div className="mt-5 mb-5 card bg-dark text-white">
            <div className="mt-3 card-title">
              <h1>My Profile</h1>
            </div>
            <div className="card-body">
              <br />
              <div className="container offset-md-1 table-responsive">
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <h3>Name:</h3>
                      </th>
                      <td>
                        <td></td>
                        <h3>{profile.name}</h3>
                      </td>
                    </tr>
                    <hr />
                    <tr>
                      <th>
                        <h3>Email:</h3>
                      </th>
                      <td>
                        <h3>{profile.email}</h3>
                      </td>
                    </tr>
                    <hr />
                    <tr>
                      <th>
                        <h3>Mobile:</h3>
                      </th>
                      <td>
                        <h3>{profile.mobile}</h3>
                      </td>
                    </tr>
                    <hr />
                    <tr>
                      <th>
                        <h3>Products:</h3>
                      </th>
                      <td>
                        <h3>{productCount}</h3>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
