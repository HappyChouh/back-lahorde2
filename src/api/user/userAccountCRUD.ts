import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/users", async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;

    const newUser = await prisma.useraccount.create({
      data: { username, email },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.useraccount.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const updatedUser = await prisma.useraccount.update({
      where: { id: parseInt(id, 10) },
      data: {
        username,
        email,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.useraccount.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
