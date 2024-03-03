import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

export type Journal = {
  id: number;
  action: String;
  made_by: String;
  impacted: String;
};

const journal: Journal[] = [
  {
    id: 1,
    action: "Manger",
    made_by: "Doudoune",
    impacted: "Doudoune",
  },
  {
    id: 2,
    action: "Attaque",
    made_by: "Doudoune",
    impacted: "Loica",
  },
  {
    id: 3,
    action: "Se développe",
    made_by: "Loica",
    impacted: "Loica",
  },
  {
    id: 4,
    action: "Manger",
    made_by: "Ronan",
    impacted: "Ronan",
  },
  {
    id: 5,
    action: "Manger",
    made_by: "Doudoune",
    impacted: "Doudoune",
  },
  {
    id: 6,
    action: "Séduire",
    made_by: "Hugo",
    impacted: "Ronan",
  },
  {
    id: 7,
    action: "Rejetter",
    made_by: "Ronan",
    impacted: "Hugo",
  },
  {
    id: 8,
    action: "Réflechir",
    made_by: "Hugo",
    impacted: "Hugo",
  },
  {
    id: 9,
    action: "Droguer",
    made_by: "Hugo",
    impacted: "Ronan",
  },
  {
    id: 10,
    action: "Séduire",
    made_by: "Hugo",
    impacted: "Ronan",
  },
  {
    id: 11,
    action: "Yeux doux",
    made_by: "Ronan",
    impacted: "Hugo",
  },
  {
    id: 12,
    action: "Embrasser",
    made_by: "Hugo",
    impacted: "Ronan",
  },
];

router.get("/test/journal", async (req: Request, res: Response) => {
  res.json(journal);
});

router.post("/test/journal", async (req: Request, res: Response) => {
  journal.push(req.body);
  res.status(201).json(req.body);
});

router.delete("/test/journal", async (req: Request, res: Response) => {
  journal.length = 0;
  res.status(201).json(req.body);
});

export default router;
