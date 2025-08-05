import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid().primaryKey().defaultRandom(), // id aleatório e único
  name: text().notNull(), // nome do tipo texto OBRIGATÓRIO (notNull)
});

export const categoryTable = pgTable("category", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(), // data de acordo com a criação dessa categoria
});

export const categoryRelations = relations(categoryTable, ({ many }) => ({
  // uma categoria tem VÁRIOS produtos
  products: many(productTable),
}));

export const productTable = pgTable("product", {
  id: uuid().primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categoryTable.id), // categoryId será o ID "estrangeiro" do categoryTable.id
  name: text().notNull(),
  slug: text().notNull().unique(), // slug é isso: "/tenis-preto-top-das-galaxias" (SEO) - único
  description: text().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(), // data de acordo com a criação desse produto
});

export const productRelations = relations(productTable, ({ one, many }) => ({
  // um produto só tem UMA categoria
  category: one(categoryTable, {
    fields: [productTable.categoryId],
    references: [categoryTable.id], // referenciando o productTable.categoryId ao categoryTable.id
  }),
  // um produto pode ter VÁRIAS variações
  variants: many(productVariantTable),
}));

export const productVariantTable = pgTable("product_variant", {
  id: uuid().primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => productTable.id), // productId será o ID "estrangeiro" do productTable.id
  name: text().notNull(),
  slug: text().notNull().unique(),
  color: text().notNull(),
  priceInCents: integer("price_in_cents").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productVariantRelations = relations(
  productVariantTable,
  ({ one }) => ({
    product: one(productTable, {
      fields: [productVariantTable.productId], //
      references: [productTable.id], // referenciando o productVariantTable.productId ao productTable.id
    }),
  }),
);
