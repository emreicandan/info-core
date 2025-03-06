import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import { UserService } from "../../user/user.service";
import { IdentityRepository } from "../../identity/IdentityRepository";
import { JwtService } from "@nestjs/jwt";
import { AuthValidation } from "../auth.validation";
import * as bcrypt from 'bcryptjs';
import { IUser } from "src/models/user";
import { IIdentity } from "src/models/identity";


describe('AuthService', () => {
    let authService: AuthService;
    let userService: UserService;
    let identityRepository: IdentityRepository;
    let jwtService: JwtService;
    let authValidation: AuthValidation;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {
                        insert: jest.fn().mockResolvedValue({
                            _id: '123',
                            name: 'Ahmet',
                            surname: 'Mehmet',
                            email: 'test@example.com',
                            phone_number: '1234567890',
                            birth_date: new Date('1990-01-01'),
                        } as IUser),
                    }
                },
                {
                    provide: IdentityRepository,
                    useValue: {
                        insert: jest.fn().mockResolvedValue({
                            user: '123',
                            identifier: 'test@example.com',
                            password: 'hashedPassword',
                            role: 'user',
                        } as IIdentity),
                        getAll: jest.fn(),
                    }
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('mocked-jwt-token')
                    }
                },
                {
                    provide: AuthValidation,
                    useValue: {
                        isExistsIdentity: jest.fn().mockResolvedValue(null),
                    }
                }
            ]
        }).compile();

        authService = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
        identityRepository = module.get<IdentityRepository>(IdentityRepository);
        jwtService = module.get<JwtService>(JwtService);
        authValidation = module.get<AuthValidation>(AuthValidation);
    });

    it('should register a new user and return identity', async () => {
        const mockUser = {
            name: 'Ahmet',
            surname: 'Mehmet',
            email: 'test@example.com',
            phone_number: '1234567890',
            birth_date: new Date('1990-01-01'),
            password: 'hashedPassword',
            role: 'user',
        };

        const mockIdentity = {
            user: '123',
            identifier: 'test@example.com',
            password: 'hashedPassword',
            role: 'user',
        };

        jest.spyOn(bcrypt, 'hash' as any).mockResolvedValue('hashedPassword');
        jest.spyOn(authValidation, 'isExistsIdentity').mockResolvedValue(null);
        jest.spyOn(userService, 'insert').mockResolvedValue({
            _id: '123',
            name: 'Ahmet',
            surname: 'Mehmet',
            email: 'test@example.com',
            phone_number: '1234567890',
            birth_date: new Date('1990-01-01'),
        } as IUser);
        jest.spyOn(identityRepository, 'insert').mockResolvedValue(mockIdentity as IIdentity);

        const result = await authService.register(mockUser);

        expect(result).toEqual(mockIdentity);
        expect(authValidation.isExistsIdentity).toHaveBeenCalledWith('test@example.com');
        expect(userService.insert).toHaveBeenCalledWith({
            name: 'Ahmet',
            surname: 'Mehmet',
            email: 'test@example.com',
            phone_number: '1234567890',
            birth_date: new Date('1990-01-01'),
        });
        expect(identityRepository.insert).toHaveBeenCalledWith({
            user: '123',
            identifier: 'test@example.com',
            password: 'hashedPassword',
            role: 'user',
        });
    });

    it('should login a user and return token', async () => {
        const mockUserCredentials = {
            email: 'test@example.com',
            password: 'testtest'
        };

        const mockIdentity = {
            identifier: 'test@example.com',
            password: 'hashedPassword',
            user: { id: '123' },
            role: 'user',
        };

        jest.spyOn(identityRepository, 'getAll').mockResolvedValue([mockIdentity as IIdentity]);
        jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(true);

        const result = await authService.login(mockUserCredentials);

        expect(result).toEqual({ token: 'mocked-jwt-token' });
        expect(jwtService.sign).toHaveBeenCalledWith({
            sub: mockIdentity.user,
            email: mockIdentity.identifier,
            role: mockIdentity.role,
            audit: 'info-core',
        });
    });
});
