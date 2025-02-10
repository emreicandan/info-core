import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";

describe("AuthController", () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      register: jest.fn().mockResolvedValue({
        id: "1",
        name: "Ali",
        surname: "Veli",
        email: "test@example.com",
        phone_number: "1234567890",
        birth_date: new Date(),
        role: "user",
      }),
      login: jest.fn().mockResolvedValue({
        token: "mocked-jwt-token",
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(authController).toBeDefined();
  });

  describe("register", () => {
    it("should call AuthService.register and return the registered user", async () => {
      const userDto = {
        name: "Ali",
        surname: "Veli",
        email: "test@example.com",
        phone_number: "1234567890",
        birth_date: new Date(),
        password: "securepassword",
        role: "user",
      };

      const result = await authController.register(userDto);
      expect(authService.register).toHaveBeenCalledWith(userDto);
      expect(result).toEqual({
        id: "1",
        name: "Ali",
        surname: "Veli",
        email: "test@example.com",
        phone_number: "1234567890",
        birth_date: expect.any(Date),
        role: "user",
      });
    });
  });

  describe("login", () => {
    it("should call AuthService.login and return a token", async () => {
      const loginDto = {
        email: "test@example.com",
        password: "securepassword",
      };

      const result = await authController.login(loginDto);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual({ token: "mocked-jwt-token" });
    });
  });
});
