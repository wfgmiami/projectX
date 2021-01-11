const { spawn } = require("child_process");
const pythonProcess = spawn("python", ["./marketData.py", "DIS"]);

pythonProcess.stdout.on("data", (data) => {
  console.log("data: ", data.toString("utf-8"));
});
