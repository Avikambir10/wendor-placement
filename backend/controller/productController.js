import fs from "fs";
import path from "path";

export const getProducts = (req, res) => {
  const filePath = path.join(process.cwd(), "../data.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const products = JSON.parse(data);

  res.json({
    success: true,
    data: products
  });
};
