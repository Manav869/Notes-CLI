import { readFileSync } from "node:fs";
function loadNotes() {
  try {
    const data = readFileSync("./notes.json", "utf8");
    const notes = JSON.parse(data);
    return notes;
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    } else {
      throw error;
    }
  }
}

const action = process.argv[2];
if (action === "add") {
  process.argv.length > 3
    ? console.log("Adding: " + process.argv[3])
    : console.log("Please Provide Note");
} else if (action === "list") {
  console.log("listing");
} else if (action === "delete") {
  process.argv.length > 3
    ? console.log("deleting" + process.argv[3])
    : console.log("Please Provide id");
} else {
  console.log("unknown command");
}
