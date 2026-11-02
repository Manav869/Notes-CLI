import { readFileSync, writeFileSync } from "node:fs";
function saveNotes(notes) {
  const text = JSON.stringify(notes, null, 4);
  writeFileSync("./notes.json", text);
}
function loadNotes() {
  try {
    const data = readFileSync("./notes.json", "utf8");
    if (data.trim() === "") {
      return [];
    }
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
switch (action) {
  case "add": {
    if (process.argv.length > 3 && process.argv[3].trim() !== "") {
      addNotes(process.argv[3].trim());
    } else {
      console.log("Please Provide Note");
    }
    break;
  }
  case "list": {
    listNotes();
    break;
  }
  case "delete": {
    if (process.argv.length > 3 && process.argv[3].trim() !== "") {
      deleteNotes(Number(process.argv[3]));
    } else {
      console.log("Please Provide id");
    }
    break;
  }
  default: {
    console.log(`   Usage:
     node app.js add "note text"
     node app.js list
     node app.js delete <id>`);
  }
}
function addNotes(title) {
  const notes = loadNotes();
  let id = 0;
  if (notes.length === 0) {
    id = 1;
  } else {
    id = notes[notes.length - 1].id + 1;
  }
  notes.push({ id: id, title: title });
  saveNotes(notes);
  console.log("Added: " + id + ". " + title);
}
function listNotes() {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log("No Notes Yet");
  } else {
    notes.forEach((note) => console.log(`${note.id} ${note.title}`));
  }
}
function deleteNotes(id) {
  if (!Number.isInteger(id)) {
    console.log("Please provide a valid id.");
  } else {
    const notes = loadNotes();
    let index = -1;
    const remaining = notes.filter((note, i) => {
      if (note.id === id) {
        index = i;
        return false;
      }
      return true;
    });
    if (index === -1) {
      console.log(`Note ${id} not found.`);
    } else {
      saveNotes(remaining);
      console.log(`Deleted ${notes[index].id}. ${notes[index].title}`);
    }
  }
}
