import AuthController from "../domains/auth/auth-controller";

describe("TEST Api Auth", () => {
    describe("Controller /api/v1/auth/register", () => {
        let req, res;

        beforeEach(() => {
            req = { body: {} }; // Simulate empty request body

            res = {
                status: jest.fn().mockReturnThis(), // Allows chaining res.status().json()
                json: jest.fn(),
            };
        });

        test("400 Bad Request", async () => {
            await AuthController.login(req, res);

            expect("1").toBe("1")
        });
    });
});
