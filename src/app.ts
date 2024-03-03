import express, { Request, Response } from "express";
import { pool } from "../db/dbConnection";
import { QueryResult } from "pg";
import userAccountCRUD from "./api/user/userAccountCRUD";
import playerCreatureCRUD from "./api/game/creatureRelated/playerCreature/playerCreatureCRUD";
import journalCRUD from "./api/game/journalRelated/journalCRUD";
import effectCRUD from "./api/game/effectRelated/effectCRUD";
import eventCRUD from "./api/game/eventRelated/eventCRUD";
import evolveCRUD from "./api/game/evolveRelated/evolveCRUD";
import facilityCRUD from "./api/game/facilityRelated/facilityCRUD";
import gameCRUD from "./api/game/gameCRUD";
import userInformationCRUD from "./api/user/userInformationCRUD";
import stateCRUD from "./api/game/stateRelated/stateCRUD";
import iaCreatureCRUD from "./api/game/creatureRelated/iaCreature/iaCreatureCRUD";
import environmentCRUD from "./api/game/environmentCRUD";

var cors = require("cors");

pool.query("SELECT NOW()", (err: Error, result: QueryResult) => {
  if (err) {
    console.error("Error connecting to PostgreSQL: ", err);
  } else {
    console.log("Connected to PostgreSQL: ", result.rows[0]);
  }
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript and SQL!");
});

app.use(express.json());
app.use(userAccountCRUD);
app.use(playerCreatureCRUD);
app.use(journalCRUD);
app.use(effectCRUD);
app.use(eventCRUD);
app.use(evolveCRUD);
app.use(facilityCRUD);
app.use(gameCRUD);
app.use(userInformationCRUD);
app.use(stateCRUD);
app.use(iaCreatureCRUD);
app.use(environmentCRUD);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
