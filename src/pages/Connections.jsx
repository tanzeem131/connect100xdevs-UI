import { Loader } from "../components/Loader";
import { Card } from "../components/Card";
import useFetchConnections from "../hooks/useFetchConnection";
import { TextInputError, TextInputHeading } from "../components/TextInput";

const Connections = () => {
  const { connections, loading } = useFetchConnections();

  if (loading) {
    return (
      <div className="flex justify-center align-middle items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!connections)
    return <TextInputError text={"Connection not proccessed."} />;

  if (connections.length === 0)
    return <TextInputError text={"No Connection Found!"} />;

  return (
    <div className="mt-5 min-h-screen">
      <TextInputHeading text={"Connections"} />

      {connections?.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          skills,
          about,
          githubUsername,
        } = connection;

        return (
          <div key={_id}>
            <Card
              _id={_id}
              firstName={firstName}
              lastName={lastName}
              photoUrl={photoUrl}
              age={age}
              gender={gender}
              skills={skills}
              about={about}
              githubUsername={githubUsername}
              actions={"connection"}
            />
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
