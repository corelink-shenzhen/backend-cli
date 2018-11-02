/*
 * @Author: Yu Chen
 * @Date: 2018-11-01 22:17:49
 * @Last Modified by: Yu Chen
 * @Last Modified time: 2018-11-02 11:31:36
 */

import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { <%=modelUppercase%> } from './<%=model%>';

@Entity()
export class <%=modelUppercase%>Entity extends <%=modelUppercase%> {
  @PrimaryGeneratedColumn()
  id: number;
}
