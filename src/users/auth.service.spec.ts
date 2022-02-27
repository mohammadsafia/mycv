import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  const users: User[] = [];
  beforeEach(async () => {
    // Create a fake copy of the users service
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = { id: Math.floor(Math.random() * 99999), email, password } as User;
        users.push(user);
        return Promise.resolve(user);
      }
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService }
      ]
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('as@gmail.com', 'pass');
    expect(user.password).not.toEqual('1234');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      'email in use'
    );
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(service.signin('test@gmail.com', 'password')).rejects.toThrow('user not found');
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup('asdfa@gmail.com', '123');
    await expect(service.signin('asdfa@gmail.com', 'password')).rejects.toThrow('bad password');
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('as@gmail.com', 'pass');
    const user = await service.signin('as@gmail.com', 'pass');
    expect(user).toBeDefined();
  });
});