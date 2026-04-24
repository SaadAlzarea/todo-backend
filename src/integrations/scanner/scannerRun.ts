import { initScanner } from "./scanner.init";

export async function bootstrap() {
    await initScanner();

    console.log("App started with scanner ready");
}
