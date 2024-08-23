import fs from "fs"

const addWorkout = (data)=>{
    fs.writeFileSync("./src/db/db.json", JSON.stringify(data, null, 2), {
        encoding: "utf-8",
      });
}

export {addWorkout}