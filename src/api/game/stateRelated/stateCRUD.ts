import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/states", async (req: Request, res: Response) => {
  try {
    const { name, turn_duration } = req.body;

    const newUser = await prisma.state.create({
      data: {
        name,
        turn_duration,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/states", async (req: Request, res: Response) => {
  try {
    const users = await prisma.state.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/states/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, turn_duration } = req.body;

  try {
    const updatedUser = await prisma.state.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        turn_duration,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/states/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.state.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
