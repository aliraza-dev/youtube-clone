// TODO: Create a scripted seed categories;

import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
  "Gaming",
  "Cars",
  "Music",
  "Comedy",
  "Education",
  "News and Politics",
  "Books",
];

async function main() {
  console.log("Seeding categories");

  try {
    const values = categoryNames.map((name) => ({
      name,
      description: "Videos related to " + name.toLowerCase(),
    }));

    await db.insert(categories).values(values);

    console.log("Categories seeded successfully");
  } catch (error) {
    console.error("Error: Category Seeder => ", error);
    process.exit(1);
  }
}

main();
