/*
 * @Author: Yu Chen 
 * @Date: 2018-11-02 13:45:46 
 * @Last Modified by: Yu Chen
 * @Last Modified time: 2018-11-02 17:21:25
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { <%=modelUppercase%>Controller } from './<%=model%>.controller';
import { <%=modelUppercase%>Entity } from './<%=model%>.entity';

@Module({
  controllers: [<%=modelUppercase%>Controller],
  providers: [],
  imports: [TypeOrmModule.forFeature([<%=modelUppercase%>Entity])],
})
export class <%=modelUppercase%>Module {}
