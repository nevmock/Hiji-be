import "dotenv/config";

import { __dirname, __filename } from "./utils/path.js";

import apicache from "apicache";
import compression from "compression";
import cors from "cors";
import errorHandler from "./middlewares/error-handler-middleware.js";
import express from "express";
import helmet from "helmet";
import logger from "./utils/logger.js";
import morgan from "morgan";
import multer from "multer";
import path from "path";

import connectDB from "./config/db.js";

import AuthRoutes from "./domains/auth/auth-routes.js";
import BussinessRoutes from "./domains/web-builder/bussiness/bussiness-routes.js";
import PagesRoutes from "./domains/web-builder/pages/pages-routes.js";
import PlanRoutes from "./domains/plan/plan-routes.js";
import subscriptionRoutes from "./domains/transaction/subscription/subscription-routes.js";
import transactionRoutes from "./domains/transaction/transaction-routes.js";
import pixelRoutes from "./domains/web-builder/pixel/pixel-routes.js";

class ExpressApplication {
    app;
    fileStorage;
    fileFilter;
    constructor(port) {
        this.app = express();
        this.port = port;

        this.app.use(express.json({ type: "application/json" }));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        //  __init__
        this.configureAssets();
        this.setupRoute();
        this.setupMiddlewares([
            errorHandler,
            express.json(),
            express.urlencoded(),
            apicache.middleware("5 minutes"),
        ]);
        this.setupLibrary([
            process.env.NODE_ENV === "development" ? morgan("dev") : "",
            compression(),
            helmet(),
            // cors(),
        ]);

        this.fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "public/images");
            },
            filename: (req, file, cb) => {
                cb(null, new Date().getTime() + "-" + file.originalname);
            },
        });
        this.fileFilter = (req, file, cb) => {
            if (
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg"
            ) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        };
        this.app.use(
            multer({
                storage: this.fileStorage,
                fileFilter: this.fileFilter,
            }).fields([
                {
                name: "image",
                maxCount: 1,
                },
            ])
        );
    }

    setupMiddlewares(middlewaresArr) {
        middlewaresArr.forEach((middleware) => {
        this.app.use(middleware);
        });
    }
    setupRoute() {
        // Set Route here
        // this.app.use("/api/v1/menu", menuRoutes);

        this.app.use("/api/v1/web-builder/auth", AuthRoutes);
        this.app.use("/api/v1/web-builder/bussiness", BussinessRoutes);
        this.app.use("/api/v1/web-builder/pages", PagesRoutes);
        this.app.use("/api/v1/web-builder/pixel", pixelRoutes);

        this.app.use("/api/v1/plan", PlanRoutes);
        this.app.use("/api/v1/subscription", subscriptionRoutes);
        this.app.use("/api/v1/transaction", transactionRoutes);
    }

    configureAssets() {
        this.app.use(express.static(path.join(__filename, "public")));
    }

    setupLibrary(libraries) {
        libraries.forEach((library) => {
        if (library != "" && library != null) {
            this.app.use(library);
        }
        });
    }

    async start() {
        try {
            await connectDB();
            this.app.listen(this.port, () => {
                logger.info(`🚀 Server running on port ${this.port}`);
            });
        } catch (error) {
            logger.error("❌ Server failed to start:", error);
            process.exit(1);
        }
    }
}

export default ExpressApplication;
