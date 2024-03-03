import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/effects", async (req: Request, res: Response) => {
  try {
    const { name, effect_value } = req.body;

    const newUser = await prisma.effect.create({
      data: {
        name,
        effect_value,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/effects", async (req: Request, res: Response) => {
  try {
    const users = await prisma.effect.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/effects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, effect_value } = req.body;

  try {
    const updatedUser = await prisma.effect.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        effect_value,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/effects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.effect.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
