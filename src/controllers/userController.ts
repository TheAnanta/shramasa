import { Request, Response } from "express";
import prisma from "../prismaClient";

export const signup = async (req: Request, res: Response) => {
  const { userId, name, email, phone } = req.body;
  if (!userId || !name || !email || !phone) {
    return res.status(400).json({ error: "Enter all fields required." });
  }
  try {
    const userExists = await prisma.user.findUnique({
      where: { userId, email, phone },
    });
    if (!userExists) {
      const user = await prisma.user.create({
        data: { userId, name, email, phone, role: "USER" },
      });
      res.status(200).json(user);
    } else {
      res.status(400).json({ error: "User already exists" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID not provided." });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { userId: userId.toString() },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId, name, email, phone } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID not provided." });
  }
  if (!name && !email && !phone) {
    return res.status(400).json({ error: "No fields to update." });
  }
  try {
    const user = await prisma.user.findMany({
      where: { userId: userId.toString() },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
  try {
    const user = await prisma.user.update({
      where: { userId: userId.toString() },
      data: { name, email, phone },
    });
    res.json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID not provided." });
  }
  try {
    const user = await prisma.user.findMany({
      where: { userId: userId.toString() },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
  try {
    const user = await prisma.user.delete({
      where: { userId: userId.toString() },
    });
    res.json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
