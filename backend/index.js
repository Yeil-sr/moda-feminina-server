require("dotenv").config();
require("./src/database/connection");

const app = require("./src/app");
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
