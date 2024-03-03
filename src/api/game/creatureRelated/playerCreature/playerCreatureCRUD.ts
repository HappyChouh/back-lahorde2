import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/playercreatures", async (req: Request, res: Response) => {
  try {
    const {
      detection_level,
      threat_level,
      hide_level,
      current_action_point,
      total_action_point,
      evolution_point,
      total_evolution_point,
      survivability,
      water_level,
      nutrients_level,
      is_dead_,
      id_user_account,
      id_game,
      id_multiplicator,
      id_player_creature_type,
    } = req.body;

    const newUser = await prisma.playercreature.create({
      data: {
        detection_level,
        threat_level,
        hide_level,
        current_action_point,
        total_action_point,
        evolution_point,
        total_evolution_point,
        survivability,
        water_level,
        nutrients_level,
        is_dead_,
        id_user_account,
        id_game,
        id_multiplicator,
        id_player_creature_type,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/playercreatures", async (req: Request, res: Response) => {
  try {
    const users = await prisma.playercreature.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get(
  "/playercreatures/inventory",
  async (req: Request, res: Response) => {
    try {
      const users = await prisma.playercreature.findMany();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.put("/playercreatures/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    detection_level,
    threat_level,
    hide_level,
    current_action_point,
    total_action_point,
    evolution_point,
    total_evolution_point,
    survivability,
    water_level,
    nutrients_level,
    is_dead_,
    id_user_account,
    id_game,
    id_multiplicator,
    id_player_creature_type,
  } = req.body;

  try {
    const updatedUser = await prisma.playercreature.update({
      where: { id: parseInt(id, 10) },
      data: {
        detection_level,
        threat_level,
        hide_level,
        current_action_point,
        total_action_point,
        evolution_point,
        total_evolution_point,
        survivability,
        water_level,
        nutrients_level,
        is_dead_,
        id_user_account,
        id_game,
        id_multiplicator,
        id_player_creature_type,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/playercreatures/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.playercreature.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

export type Inventory = {
  id: number;
  name: String;
};

const inventory: Inventory[] = [
  {
    id: 1,
    name: "Water",
  },
  {
    id: 2,
    name: "Nutrients",
  },
  {
    id: 3,
    name: "Water",
  },
  {
    id: 4,
    name: "Gold",
  },
  {
    id: 5,
    name: "Nutrients",
  },
];

router.get(
  "/test/playercreatures/inventory",
  async (req: Request, res: Response) => {
    res.json(inventory);
  }
);

router.post(
  "/test/playercreatures/inventory",
  async (req: Request, res: Response) => {
    inventory.push(req.body);
    res.status(201).json(req.body);
  }
);

router.delete(
  "/test/playercreatures/inventory",
  async (req: Request, res: Response) => {
    inventory.length = 0;
    res.status(201).json(req.body);
  }
);
