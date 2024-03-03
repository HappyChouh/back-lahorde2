import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/userinformations", async (req: Request, res: Response) => {
  try {
    const { nbgameplayed, maxdaysurvived, id_user_account } = req.body;

    const newUser = await prisma.userinformation.create({
      data: { nbgameplayed, maxdaysurvived, id_user_account },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/userinformations", async (req: Request, res: Response) => {
  try {
    const users = await prisma.userinformation.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/userinformations/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nbgameplayed, maxdaysurvived, id_user_account } = req.body;

  try {
    const updatedUser = await prisma.userinformation.update({
      where: { id: parseInt(id, 10) },
      data: {
        nbgameplayed,
        maxdaysurvived,
        id_user_account,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/userinformations/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.userinformation.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const gameSurvived = [
  {
    name: "turnSurvived",
    data: [5, 27, 34, 10, 4, 17],
  },
  {
    name: "creatureKilledInGame",
    data: [2, 4, 6, 1, 3, 4],
  },
  {
    name: "maxEvolutionPoint",
    data: [150, 2050, 3500, 890, 100, 1720],
  },
  {
    name: "numberOfPlayerInGame",
    data: [1, 3, 2, 1, 2, 1],
  },
];

router.get("/stats", async (req: Request, res: Response) => {
  res.json(gameSurvived);
});

export default router;
