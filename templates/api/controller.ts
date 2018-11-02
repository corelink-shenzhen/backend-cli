/*
 * @Author: Yu Chen
 * @Date: 2018-11-02 10:33:01
 * @Last Modified by: Yu Chen
 * @Last Modified time: 2018-11-02 13:31:13
 */

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import {
  list,
  parseFunctions,
  FUNCTION_NAME,
  generateListOptions,
  generatePaginate,
  responseList,
  CORELINK_KEY_LIST_OPTIONS,
  CORELINK_KEY_PAGINATE,
} from '@corelink/db';
import {
  ApiUseTags,
  ApiCreatedResponse,
  ApiImplicitHeaders,
  ApiOkResponse,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { <%=modelUppercase%>Entity } from './<%=model%>.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { <%=modelUppercase%> } from './<%=model%>';
import { <%=modelUppercase%>Params } from './<%=model%>.params';

@ApiUseTags('<%=modelUppercase%>')
@Controller('<%=endpoint%>')
export class <%=modelUppercase%>Controller {
  constructor(
    @InjectRepository(<%=modelUppercase%>Entity)
    private readonly <%=model%>Repository: Repository<<%=modelUppercase%>Entity>,
  ) {}

  @Get()
  @ApiImplicitHeaders([
    {
      name: CORELINK_KEY_LIST_OPTIONS,
      required: false,
    },
    {
      name: CORELINK_KEY_PAGINATE,
      required: false,
    },
  ])
  @ApiOkResponse({ description: 'OK' })
  async index(@Res() res: Response, @Req() req: Request) {
    const listOptions = generateListOptions(req);
    const paginate = generatePaginate(req);
    const result = await list(
      this.<%=model%>Repository,
      parseFunctions(listOptions, FUNCTION_NAME.IsNull),
      paginate,
    );
    responseList(HttpStatus.OK, res, result);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Created' })
  async create(@Body() body: <%=modelUppercase%>) {
    const <%=model%> = await this.<%=model%>Repository.create(body);
    const errors = await validate(<%=model%>);
    if (errors.length) throw new UnprocessableEntityException(errors);
    await this.<%=model%>Repository.save(<%=model%>);
    return <%=model%>;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'OK' })
  async show(@Param() params: <%=modelUppercase%>Params) {
    return this.<%=model%>Repository.findOne({ id: params.id });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Updated' })
  async update(@Param() params: <%=modelUppercase%>Params, @Body() body: <%=modelUppercase%>) {
    const old<%=modelUppercase%> = await this.<%=model%>Repository.findOne({ id: params.id });
    if (!old<%=modelUppercase%>) throw new NotFoundException();
    const <%=model%> = this.<%=model%>Repository.create(body);
    <%=model%>.id = params.id;
    const errors = await validate(<%=model%>);
    if (errors.length) throw new UnprocessableEntityException(errors);
    return this.<%=model%>Repository.save(<%=model%>);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Updated' })
  async updatePartially(@Param() params: <%=modelUppercase%>Params, @Body() body: <%=modelUppercase%>) {
    const old<%=modelUppercase%> = await this.<%=model%>Repository.findOne({ id: params.id });
    if (!old<%=modelUppercase%>) throw new NotFoundException();
    const <%=model%> = this.<%=model%>Repository.merge(old<%=modelUppercase%>, body);
    const errors = await validate(<%=model%>);
    if (errors.length) throw new UnprocessableEntityException(errors);
    return this.<%=model%>Repository.save(<%=model%>);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({ description: 'Updated' })
  async remove(@Param() params: <%=modelUppercase%>Params) {
    await this.<%=model%>Repository.delete({ id: params.id });
  }
}
