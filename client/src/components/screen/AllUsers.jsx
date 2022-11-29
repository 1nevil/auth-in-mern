import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const fetchData = async (usertoken) => {
    try {
      const res = await axios.get("http://localhost:5000/users/allusers", {
        headers: { "x-auth-token": usertoken },
      });
      // console.log(res.data);
      setUsers(res.data);
    } catch (err) {
      console.log("Error in fetching data" + err);
    }
  };
  useEffect(() => {
    const usertoken = localStorage.getItem("token");
    // console.log(usertoken);

    if (!usertoken) {
      navigate("/login");
    } else {
      fetchData(usertoken);
    }
  }, []);

  return (
    <>
      <Container>
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, key) => {
                return (
                  <>
                    <tr>
                      <td>{user._id}</td>
                      <td>{user.user}</td>
                      <td>{user.email}</td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default AllUsers;
