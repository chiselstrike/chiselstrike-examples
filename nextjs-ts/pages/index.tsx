import * as React from "react";
import type { InferGetServerSidePropsType, NextPage } from "next";
import styles from "../styles/Home.module.css";
import { chiselFetch, getChiselStrikeClient } from "@chiselstrike/frontend";
import { withSessionSsr } from "../lib/withSession";
import { Person } from "../models/person.model";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps(context) {
    const chisel = await getChiselStrikeClient(
      context.req.session,
      context.query
    );
    return { props: { chisel } };
  }
);

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ chisel }) => {
  const [peopleData, setPeopleData] = React.useState<Person[]>([]);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  async function fetchPeople() {
    const res = await chiselFetch(chisel, "dev/get-all-people", {
      method: "GET",
    });
    const jsonData = await res.json();
    setPeopleData(jsonData);
  }

  React.useEffect(() => {
    fetchPeople();
  }, []);

  const submitPerson = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await chiselFetch(chisel, "dev/create-people", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName }),
    });

    setFirstName("");
    setLastName("");

    await fetchPeople();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitPerson}>
        <label>
          First name:
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
        </label>
        <label>
          Last name:
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
        </label>
        <button type="submit">Create Person</button>
      </form>

      <table>
        <tbody>
          <tr>
            <td>firstName</td>
            <td>lastName</td>
          </tr>
          {peopleData.length > 0
            ? peopleData.map((person) => (
                <tr key={person.id}>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
