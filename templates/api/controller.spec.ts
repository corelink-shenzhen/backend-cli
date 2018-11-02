import { Test, TestingModule } from '@nestjs/testing';
import { <%=modelUppercase%>Controller } from './<%=model%>.controller';

describe('<%=modelUppercase%> Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [<%=modelUppercase%>Controller],
    }).compile();
  });
  it('should be defined', () => {
    const controller: <%=modelUppercase%>Controller = module.get<<%=modelUppercase%>Controller>(<%=modelUppercase%>Controller);
    expect(controller).toBeDefined();
  });
});
