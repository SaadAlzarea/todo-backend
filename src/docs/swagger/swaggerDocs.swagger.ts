import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

export default (app: any) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

//! this is for yaml file
// const yaml = require("yaml-js");
// const swaggerDocumentYaml = yaml.load(`${__dirname}/swagger.yml`);
// export default (app: any) => {
//     app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentYaml));
// };
