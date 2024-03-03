import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/evolves", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const newUser = await prisma.evolve.create({
      data: {
        name,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/evolves", async (req: Request, res: Response) => {
  try {
    const users = await prisma.evolve.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/evolves/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedUser = await prisma.evolve.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/evolves/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.evolve.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
