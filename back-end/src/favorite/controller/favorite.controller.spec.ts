import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteService } from '../service/favorite.service';
import { FavoriteController } from './favorite.controller';

describe('FavoriteController', () => {
  let controller: FavoriteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteController],
      providers: [FavoriteService],
    }).compile();

    controller = module.get<FavoriteController>(FavoriteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
