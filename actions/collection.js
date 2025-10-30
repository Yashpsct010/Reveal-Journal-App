"use server";
import { auth } from "@clerk/nextjs/server";
import aj from "@/lib/arcjet";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { request } from "@arcjet/next";

export const createCollection = async (data) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const req = await request();
    const decision = await aj.protect(req, {
      userId,
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const { remaining, reset } = decision.reason;
        console.error({
          code: "RATE_LIMIT_EXCEEDED",
          details: {
            remaining,
            resetInSeconds: reset,
          },
        });
        throw new Error("Too many requests, please try again later.");
      }
      throw new Error("Request blocked by policy.");
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) throw new Error("User not found");
    const collection = await db.collection.create({
      data: {
        name: data.name,
        description: data.description,
        userId: user.id,
      },
    });
    revalidatePath("/dashboard");
    return collection;
  } catch (error) {
    console.error("Error creating collection", error.message);
    throw new Error("Error creating collection");
  }
};

export const getCollections = async () => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) throw new Error("User not found");

    const collections = await db.collection.findMany({
      where: { userId: user.id },
      orderBy: {
        createdAt: "desc",
      },
    });
    return collections;
  } catch (error) {
    console.error("Error getting collections", error.message);
    throw new Error("Error getting collections");
  }
};

export const getCollection = async ({collectionId}) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) throw new Error("User not found");

    const collection = await db.collection.findUnique({
      where: { userId: user.id, id: collectionId },
    });
    return collection;
  } catch (error) {
    console.error("Error getting collections", error.message);
    throw new Error("Error getting collections");
  }
};

export const deleteCollection = async ({collectionId}) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) throw new Error("User not found");

    const collection = await db.collection.findFirst({
      where: { id: collectionId, userId: user.id },
    });
    if(!collection) throw new Error("Collection not Found")
    
    await db.collection.delete({
      where: { id: collectionId },
    })
    return true;
  } catch (error) {
    console.error("Error getting collections", error.message);
    throw new Error("Error getting collections");
  }
};
