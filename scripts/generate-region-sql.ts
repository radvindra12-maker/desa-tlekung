import fs from "node:fs";
import path from "node:path";

const inputPath = path.join(process.cwd(), "datasets", "wilayah.sql");
const outputPath = path.join(
  process.cwd(),
  "database",
  "seed",
  "regions.sql"
);

const sql = fs.readFileSync(inputPath, "utf8");

const regex = /\('([^']+)','((?:''|[^'])*)'\)/g;

type Region = {
  code: string;
  parentCode: string | null;
  level: number;
  name: string;
};

const regions: Region[] = [];

let match: RegExpExecArray | null;

while ((match = regex.exec(sql)) !== null) {
  const code = match[1];
  const name = match[2].replace(/''/g, "'");

  const parts = code.split(".");

  const parentCode =
    parts.length === 1
      ? null
      : parts.slice(0, parts.length - 1).join(".");

  const level = parts.length - 1;

  regions.push({
    code,
    parentCode,
    level,
    name,
  });
}

const escapeSql = (value: string) => value.replace(/'/g, "''");

const values = regions
  .map((region) => {
    const parent =
      region.parentCode === null
        ? "NULL"
        : `'${escapeSql(region.parentCode)}'`;

    return `('${escapeSql(region.code)}', ${parent}, ${region.level}, '${escapeSql(region.name)}')`;
  })
  .join(",\n");

const output = `insert into regions (
    code,
    parent_code,
    level,
    name
)
values
${values};
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, output);

console.log(`Generated ${regions.length} regions`);
console.log(outputPath);