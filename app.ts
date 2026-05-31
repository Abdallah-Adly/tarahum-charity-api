import express from "express";
import { adminRouter } from "./src/handlers/admin/admin.router";
import { authRouter } from "./src/handlers/auth/auth.router";
import cookieParser from "cookie-parser";
import { donorRouter } from "./src/handlers/donor/donor.router";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { beneficiaryRouter } from "./src/handlers/beneficiary/beneficiary.router";
import { volunteerRouter } from "./src/handlers/volunteer/volunteer.router";
import { NodeEnv } from "./src/interfaces/node.env.enm";
import { errorHandler } from "./src/middlewares/error.handler";
import { environments } from "./config/environment";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();

export const app = express();

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tarahum Charity API",
            version: "1.0.0",
            description: "API documentation for charity/donation platform"
        },
        servers: [
            {
                url: `http://localhost:${environments.PORT}`,
                description: "Development server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "JWT Bearer token"
                }
            }
        },
        tags: [
            { name: "Auth", description: "Authentication endpoints" },
            { name: "Admin", description: "Admin endpoints" },
            { name: "Donor", description: "Donor endpoints" },
            { name: "Volunteer", description: "Volunteer endpoints" },
            { name: "Beneficiary", description: "Beneficiary endpoints" }
        ]
    },
    apis: ["./src/handlers/**/*.router.ts"] 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(
    cors({
        origin: ["http://127.0.0.1:1111", "http://127.0.0.1:5555"],
    })
);

if (environments.NODE_ENV === NodeEnv.DEVELOPMENT) {
    app.use(morgan("dev"));
}

app.use(express.static("public"));

app.use(helmet());

app.use(compression())

app.use(rateLimit({
    windowMs: 60 * 60 * 1000 * 2,
    max: 10,
    message: "Too many requests from this IP, please try again after an hour"
}))

app.use(express.json());


app.use(cookieParser());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRouter);

app.use('/api/admin', adminRouter);

app.use('/api/donor', donorRouter)

app.use('/api/volunteer', volunteerRouter)


app.use('/api/beneficiary', beneficiaryRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
})

app.use(errorHandler);



