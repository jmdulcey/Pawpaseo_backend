import app from "./src/app.js";
import { conexionDB } from "./src/db.js";
import firebaseApp, { analytics } from "./src/firebaseConfig.js";


app.get("/", (req, res) => {
  const htmlResponse = `
    <html>
        <head>
            <title>backend</title>
        </head>
        <body>
            <h1> Ejecutando </h1>
        </body>
    </html>
    `;
  res.send(htmlResponse);
});
analytics(firebaseApp);
console.log(firebaseApp) 



conexionDB();
app.listen(4000);
console.log("Escuchando al puerto", 4000);
