import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/events", async (req: Request, res: Response) => {
  try {
    const { name, description, probability } = req.body;

    const newUser = await prisma.event.create({
      data: {
        name,
        description,
        probability,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/events", async (req: Request, res: Response) => {
  try {
    const users = await prisma.event.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/events/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, probability } = req.body;

  try {
    const updatedUser = await prisma.event.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        description,
        probability,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/events/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.event.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
