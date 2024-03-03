import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/actionlogs/iacreatures", async (req: Request, res: Response) => {
  try {
    const { id_ia_creature, id_action_log } = req.body;

    const newUser = await prisma.iacreatureimpacted.create({
      data: {
        id_ia_creature,
        id_action_log,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/actionlogs/iacreatures", async (req: Request, res: Response) => {
  try {
    const users = await prisma.iacreatureimpacted.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete(
  "/actionlogs/:idActionLog/iacreatures/:idCreature",
  async (req: Request, res: Response) => {
    const { id_ia_creature, id_action_log } = req.params;

    try {
      await prisma.iacreatureimpacted.delete({
        where: {
          id_ia_creature_id_action_log: {
            id_ia_creature: parseInt(id_ia_creature, 10),
            id_action_log: parseInt(id_action_log, 10),
          },
        },
      });

      res.status(204).end();
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
