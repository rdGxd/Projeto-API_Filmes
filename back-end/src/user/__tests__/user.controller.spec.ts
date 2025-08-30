import { UserController } from '../controllers/user.controller';

describe('UserController', () => {
  let controller: UserController;
  const userServiceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    controller = new UserController(userServiceMock as any);
  });

  it('create - should call userService with arguments correctly', async () => {
    const argument = { key: 'value' };
    const expected = { anyKey: 'anyValue' };

    jest.spyOn(userServiceMock, 'create').mockReturnValue(expected);

    const result = await controller.create(argument as any);
    expect(result).toEqual(expected);
    expect(userServiceMock.create).toHaveBeenCalledWith(argument);
  });

  it('findAll - should call userService', async () => {
    const expected = [{ anyKey: 'anyValue' }];

    jest.spyOn(userServiceMock, 'findAll').mockReturnValue(expected);

    const result = await controller.findAll();
    expect(result).toEqual(expected);
    expect(userServiceMock.findAll).toHaveBeenCalled();
  });

  it('findOne', async () => {
    const expected = { anyKey: 'anyValue' };
    const mockTokenPayloadDto = { sub: 'user-id', routePolicies: [] } as any;

    jest.spyOn(userServiceMock, 'findOne').mockReturnValue(expected);

    const result = await controller.findOne('user-id', mockTokenPayloadDto);
    expect(result).toEqual(expected);
    expect(userServiceMock.findOne).toHaveBeenCalledWith(
      'user-id',
      mockTokenPayloadDto,
    );
  });

  it('Update', async () => {
    const argument = { key: 'value' };
    const expected = { anyKey: 'anyValue' };
    const mockTokenPayloadDto = { sub: 'user-id', routePolicies: [] } as any;

    jest.spyOn(userServiceMock, 'update').mockReturnValue(expected);

    const result = await controller.update(
      'user-id',
      argument as any,
      mockTokenPayloadDto,
    );
    expect(result).toEqual(expected);
    expect(userServiceMock.update).toHaveBeenCalledWith(
      'user-id',
      argument,
      mockTokenPayloadDto,
    );
  });

  it('Remove', async () => {
    const expected = { anyKey: 'anyValue' };
    const mockTokenPayloadDto = { sub: 'user-id', routePolicies: [] } as any;

    jest.spyOn(userServiceMock, 'remove').mockReturnValue(expected);

    const result = await controller.remove('user-id', mockTokenPayloadDto);
    expect(result).toEqual(expected);
    expect(userServiceMock.remove).toHaveBeenCalledWith(
      'user-id',
      mockTokenPayloadDto,
    );
  });
});
