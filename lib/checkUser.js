import { currentUser } from "@clerk/nextjs/server";
import db from "./prisma";
export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  try {
    const userInDb = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (userInDb) {
      return userInDb;
    }
    const newUser = await db.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName + " " + user.lastName,
        imageUrl: user.imageUrl,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user", error.message);
    return null;
  }
};
