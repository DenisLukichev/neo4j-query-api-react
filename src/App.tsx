import neo4j from "@neo4j-labs/experimental-query-api-wrapper";
import { useState } from "react";

const defaultUrl = "https://733314e8-devupx.databases.neo4j-dev.io:443";

function App() {
  const [url, setUrl] = useState(defaultUrl);
  const [username, setUsername] = useState("neo4j");
  const [password, setPassword] = useState("");

  const runQuery = async () => {
    const wrapper = neo4j.wrapper(url, neo4j.auth.basic(username, password));
    const session = wrapper.session({ database: "system" });
    const result = session.executeRead(async (tx) => {
      return await tx.run("CALL dbms.components() YIELD versions, edition;");
    });
    console.log(result);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <p>Query API</p>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={runQuery}>Run Query</button>
    </div>
  );
}

export default App;
