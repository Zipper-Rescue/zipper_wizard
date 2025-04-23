import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { z } from "zod";

import { ItemTypeId, itemTypeRecord } from "./sku-types";

// Types
interface GoogleSheetsResponse {
  table: {
    cols: Array<{ label: string }>;
    rows: Array<{
      c: Array<{ v: string | number | null } | null>;
    }>;
  };
}

const BaseSkuDataRowSchema = z.object({
  Title: z.string(),
  ID: z.number(),
  "Product Type": z.string(),
  Size: z.string().nullable(),
  "Tooth Count": z.number().nullable(),
  "Special Notes": z.string().nullable(),
  "Zipper Tooth Type": z.string().nullable(),
  "Slider Type": z.string().nullable(),
  "Item Type": z.string(),
  "Kits Including": z.string().nullable(),
  "Add Zipper Kit Type": z.string().nullable(),
  "Regular price": z.number(),
  SKU: z.string(),
  Categories: z.string(),
  Tags: z.string().nullable(),
  Gallery: z.string(),
  Slug: z.string(),
  "Catalog Visibility": z.string(),
  "Shipping class": z.string(),
});

const SkuDataRowSchema = BaseSkuDataRowSchema.superRefine((data, ctx) => {
  const productType = data["Product Type"].toLowerCase();

  // Common validations
  if (!data.Gallery.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["Gallery"],
      message: "Gallery field is required for all products",
    });
  }

  // Slider-specific validations
  if (productType.includes("zipper parts")) {
    if (!data.Size) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["Size"],
        message: "Size is required for sliders",
      });
    }

    if (!data["Zipper Tooth Type"]) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["Zipper Tooth Type"],
        message: "Zipper Tooth Type is required for sliders",
      });
    }

    if (!data["Slider Type"]) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["Slider Type"],
        message: "Slider Type is required for sliders",
      });
    }

    if (!data["Tooth Count"]) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["Tooth Count"],
        message: "Tooth Count is required for sliders",
      });
    }
  }
});

type SkuDataRow = z.infer<typeof SkuDataRowSchema>;

interface SkuItem {
  productId: number;
  productType: "slider" | "kit" | "stop";
  label: string;
  imagePath: string;
  toothType?: "coil" | "metal" | "plastic" | "coil-reverse";
  sliderSize?: number;
  pullStyle?: "single" | "double";
  lockingType?: "locking" | "non-locking";
  teethPerInch?: number;
  containedInProductIds?: number[];
  suggestedKitProductId?: number;
  applicableItemTypes?: ItemTypeId[];
}

interface ProductRelationships {
  [productId: number]: {
    containedInProductIds?: number[];
    suggestedKitProductId?: number;
  };
}

// Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PRODUCT_IMAGES_DIR = path.join(__dirname, "product-images");
const GOOGLE_SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/1Qgz4_OpzAwhGpBsJ635ZHsEmbZSqegtHEvKqLHB4Y1s/gviz/tq?tqx=out:json";
const OUTPUT_FILE = path.join(__dirname, "sku-data.generated.ts");

class ValidationError extends Error {
  constructor(
    message: string,
    public readonly row: number,
    public readonly data: unknown,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * Checks if a file or directory exists
 * @param path The path to check
 * @returns Promise that resolves to true if the file/directory exists, false otherwise
 */
async function fileExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Fetches data from Google Sheets
 */
async function fetchGoogleSheetsData(): Promise<SkuDataRow[]> {
  const response = await fetch(GOOGLE_SHEETS_URL);
  const text = await response.text();

  // Remove the JSONP wrapper
  const jsonStr = text
    .replace(/^\/\*O_o\*\/\ngoogle.visualization.Query.setResponse\(/, "")
    .replace(/\);$/, "");
  const data = JSON.parse(jsonStr) as GoogleSheetsResponse;

  const headers = data.table.cols.map((col) => col.label);
  const rows = data.table.rows.map((row) => {
    const obj: Record<string, string | number | null> = {};
    row.c.forEach((cell, index) => {
      obj[headers[index]] = cell?.v ?? null;
    });
    return obj;
  });

  return rows.map((row, index) => {
    try {
      return SkuDataRowSchema.parse(row);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(
          `Row ${String(index + 2)} validation failed: ${error.message}`,
          index + 2,
          { row, errors: error.errors },
        );
      }
      throw error;
    }
  });
}

/**
 * Ensures the product-images directory exists
 */
async function ensureProductImagesDir(): Promise<void> {
  if (!(await fileExists(PRODUCT_IMAGES_DIR))) {
    await fs.mkdir(PRODUCT_IMAGES_DIR, { recursive: true });
  }
}

/**
 * Downloads an image from a URL and saves it to the product-images directory
 * @param imageUrl The URL of the image to download
 * @param productId The ID of the product
 * @returns The filename of the downloaded image
 */
async function downloadImage(
  imageUrl: string,
  productId: number,
): Promise<string> {
  const imageName = `${productId.toString()}_${path.basename(imageUrl).toLowerCase()}`;
  const imagePath = path.join(PRODUCT_IMAGES_DIR, imageName);

  // Skip if image already exists
  if (await fileExists(imagePath)) {
    return imageName;
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    await fs.writeFile(imagePath, Buffer.from(buffer));
    return imageName;
  } catch (error) {
    console.error(`Error downloading image ${imageUrl}:`, error);
    throw error;
  }
}

/**
 * Determines the product type from the Product Type field
 * @param productType The Product Type string from the TSV
 * @returns The normalized product type
 */
function determineProductType(productType: string): "slider" | "kit" | "stop" {
  if (productType.includes("Zipper Rescue Kits")) {
    return "kit";
  }
  if (productType.includes("Zipper Parts")) {
    return "slider";
  }
  return "stop";
}

/**
 * Determines the tooth type from the Zipper Tooth Type field
 * @param toothType The Zipper Tooth Type string from the TSV
 * @returns The normalized tooth type
 */
function determineToothType(
  toothType: string,
): "coil" | "metal" | "plastic" | "coil-reverse" {
  const lowerToothType = toothType.toLowerCase();
  if (lowerToothType.includes("coil")) {
    return lowerToothType.includes("reverse") ? "coil-reverse" : "coil";
  }
  return lowerToothType.includes("metal") ? "metal" : "plastic";
}

/**
 * Converts a TSV row into a SkuItem
 * @param row The TSV row to convert
 * @param relationships The product relationships
 * @returns The converted SkuItem
 * @throws Error if the image path cannot be generated or if required fields are missing
 */
function convertRowToSkuItem(
  row: SkuDataRow,
  relationships: ProductRelationships,
): SkuItem {
  const productId = row.ID;
  const firstImageUrl = row.Gallery.split(",")[0].trim();

  if (!firstImageUrl) {
    throw new Error(
      `No image URL found in Gallery field for product ${String(productId)}`,
    );
  }

  const imageName = `${String(productId)}_${path.basename(firstImageUrl).toLowerCase()}`;
  if (imageName.includes("NaN")) {
    throw new Error(
      `Invalid product ID ${String(productId)} for image ${firstImageUrl}`,
    );
  }

  const productType = determineProductType(row["Product Type"]);

  // Create base item
  const item: SkuItem = {
    productId,
    productType,
    label: row.Title,
    imagePath: `@/product-data/product-images/${imageName}`,
  };

  // Add slider-specific properties
  if (productType === "slider") {
    // These validations are redundant but provide extra safety
    if (
      !row["Zipper Tooth Type"] ||
      !row.Size ||
      !row["Slider Type"] ||
      !row["Tooth Count"]
    ) {
      throw new Error(
        `Missing required fields for slider product ${productId}`,
      );
    }

    // Parse and validate item types
    const itemTypeIds: ItemTypeId[] = row["Item Type"]
      .split(",")
      .map((name) => {
        const trimmedName = name.trim();
        const found = Object.entries(itemTypeRecord).find(
          ([_, itemType]) => itemType.label === trimmedName,
        );
        if (!found) {
          throw new Error(
            `Invalid item type: "${trimmedName}" for product ${productId}`,
          );
        }
        return found[0] as ItemTypeId;
      });

    item.toothType = determineToothType(row["Zipper Tooth Type"]);
    item.sliderSize = parseFloat(row.Size.replace("Size #", ""));
    item.pullStyle = row["Slider Type"].toLowerCase().includes("double")
      ? "double"
      : "single";
    item.lockingType = row["Slider Type"].toLowerCase().includes("locking")
      ? "locking"
      : "non-locking";
    item.teethPerInch = row["Tooth Count"];
    item.applicableItemTypes = itemTypeIds;

    // Add relationship data if available
    item.containedInProductIds = relationships[productId].containedInProductIds;
    item.suggestedKitProductId = relationships[productId].suggestedKitProductId;
  }

  return item;
}

/**
 * Builds relationships between products
 * @param rows The array of SkuDataRow objects
 * @returns The ProductRelationships object
 */
function buildRelationships(rows: SkuDataRow[]): ProductRelationships {
  const relationships: ProductRelationships = {};
  const productNameToId = new Map<string, number>();

  // First, build a map of product names to IDs
  for (const row of rows) {
    productNameToId.set(row.Title.trim(), row.ID);
  }

  // Then process relationships
  for (const row of rows) {
    const productId = row.ID;

    // Handle "Kits Including" - these are products that contain this product
    if (row["Kits Including"]) {
      const kitNames = row["Kits Including"]
        .split(",")
        .map((name) => name.trim());
      const containedInProductIds: number[] = [];

      for (const kitName of kitNames) {
        const kitId = productNameToId.get(kitName);
        if (!kitId) {
          throw new Error(
            `Could not find product with name "${kitName}" referenced in "Kits Including" for product ${row.Title}`,
          );
        }
        containedInProductIds.push(kitId);
      }

      if (containedInProductIds.length > 0) {
        relationships[productId] = {
          containedInProductIds,
        };
      }
    }

    // Handle "Add Zipper Kit Type" - this is the suggested kit for this product
    if (row["Add Zipper Kit Type"]) {
      const kitName = row["Add Zipper Kit Type"].trim();
      const kitId = productNameToId.get(kitName);

      if (!kitId) {
        throw new Error(
          `Could not find product with name "${kitName}" referenced in "Add Zipper Kit Type" for product ${row.Title}`,
        );
      }

      relationships[productId] = {
        ...relationships[productId],
        suggestedKitProductId: kitId,
      };
    }
  }

  return relationships;
}

/**
 * Generates the TypeScript file content
 * @param items Array of SkuItems to include in the file
 * @returns The TypeScript file content as a string
 */
function generateTypeScriptContent(items: SkuItem[]): string {
  const imports = `import { SkuItem } from "@/product-data/sku-types.ts";\n\n`;

  const itemsString = items
    .map((item) => {
      const properties = Object.entries(item)
        .map(([key, value]) => {
          if (key === "imagePath") {
            return `  imageFn: () => import("${value}"),`;
          }
          return `  ${key}: ${JSON.stringify(value)},`;
        })
        .join("\n");

      return `{\n${properties}\n},`;
    })
    .join("\n\n");

  return `${imports}export const skuData: SkuItem[] = [\n${itemsString}\n];`;
}

/**
 * Main function that orchestrates the entire process
 */
async function main() {
  try {
    // Ensure directory exists
    await ensureProductImagesDir();

    // Fetch and validate data from Google Sheets
    const rows = await fetchGoogleSheetsData();

    // Build relationships between products
    const relationships = buildRelationships(rows);

    // Process each row and download images
    const items = await Promise.all(
      rows.map(async (row) => {
        const item = convertRowToSkuItem(row, relationships);
        const firstImageUrl = row.Gallery.split(",")[0].trim();
        await downloadImage(firstImageUrl, item.productId);
        return item;
      }),
    );

    // Generate and write TypeScript file
    const tsContent = generateTypeScriptContent(items);
    await fs.writeFile(OUTPUT_FILE, tsContent);

    console.log("Successfully generated sku-data.generated.ts");
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(`Validation error at row ${error.row}:`, error.message);
      console.error("Data:", error.data);
    } else {
      console.error("Error processing data:", error);
    }
    process.exit(1);
  }
}

// Run the script
await main();
