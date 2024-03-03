import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/iacreatures", async (req: Request, res: Response) => {
  try {
    const {
      name,
      detection_level,
      threat_level,
      hide_level,
      loot,
      is_dead_,
      id_environment,
    } = req.body;

    const newUser = await prisma.iacreature.create({
      data: {
        name,
        detection_level,
        threat_level,
        hide_level,
        loot,
        is_dead_,
        id_environment,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/iacreatures", async (req: Request, res: Response) => {
  try {
    const users = await prisma.iacreature.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/iacreatures/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    detection_level,
    threat_level,
    hide_level,
    loot,
    is_dead_,
    id_environment,
  } = req.body;

  try {
    const updatedUser = await prisma.iacreature.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        detection_level,
        threat_level,
        hide_level,
        loot,
        is_dead_,
        id_environment,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/iacreatures/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.iacreature.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
