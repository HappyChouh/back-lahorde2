import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/environments", async (req: Request, res: Response) => {
  try {
    const { id_game } = req.body;

    const newUser = await prisma.environment.create({
      data: { id_game },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/environments", async (req: Request, res: Response) => {
  try {
    const users = await prisma.environment.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/environments/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id_game } = req.body;

  try {
    const updatedUser = await prisma.environment.update({
      where: { id: parseInt(id, 10) },
      data: {
        id_game,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/environments/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.environment.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
